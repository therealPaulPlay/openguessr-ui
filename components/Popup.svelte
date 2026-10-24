<script module>
	const openZIndexes = [];
</script>

<script>
	import { X } from "@lucide/svelte";
	import { untrack } from "svelte";
	import { on } from "svelte/events";
	import { cubicBezier } from "../utils/cubic-bezier.js";
	import { clamp } from "../utils/clamp.js";
	import { isScrolledDown, canScrollDown } from "../utils/scroll-check.js";
	import { scale, fade } from "svelte/transition";
	import { backOut } from "svelte/easing";
	import { MediaQuery } from "svelte/reactivity";
	let { children, frameless, slim, verySlim, ultraSlim, open = $bindable(false), onuserclose } = $props();

	let zIndex = $state(0);

	// Transitions ------------------------------------------------------------------------------
	const DRAWER_EASE = [0.32, 0.72, 0, 1];
	const DRAWER_HIDDEN_OVERSHOOT = 50; // Added negative closed y-pos offset to move the panel shadow off-screen (100px blur - 50px --layout-spacer)
	const popupToDrawer = new MediaQuery("(orientation: portrait) and (max-width: 500px)");

	const popupHolderTransition = (node) => (popupToDrawer.current ? { duration: 0 } : fade(node, { duration: 100 }));

	function drawerOverlayTransitionTapClose(_node, _params, { duration }) {
		return {
			duration,
			easing: cubicBezier(...DRAWER_EASE),
			// Animates color and blur strength
			css: (progress) =>
				`background-color: color-mix(in srgb, var(--overlay-color) ${progress * 100}%, transparent); backdrop-filter: blur(calc(var(--weak-blur) * ${progress}));`,
		};
	}

	function windowTransitionDrawer(node) {
		const closedOffset = node.offsetHeight + DRAWER_HIDDEN_OVERSHOOT;
		return {
			duration: 500,
			easing: cubicBezier(...DRAWER_EASE),
			css: (t) => `transform: translate3d(0, ${(1 - t) * closedOffset}px, 0)`,
		};
	}

	// Whether the drawer was dragged closed or closed via X / ESC / Empty click
	let draggedClosed = $state(false);

	function windowTransition(node, _params, { direction }) {
		if (!popupToDrawer.current) return scale(node, { easing: backOut, duration: 250, start: 0.9 });
		else {
			// Reset draggedClose on fresh open
			if (direction == "in") draggedClosed = false;
			else if (draggedClosed) return { duration: 0 }; // Already closed, unmount immediately without transition
			return windowTransitionDrawer(node); // Regular drawer transition
		}
	}

	function drawerOverlayTransition(node, params, { direction }) {
		// If the drawer is closed by the X button or ESC (not by dragging, which hides the overlay earlier), apply transition
		const duration = !popupToDrawer.current || (direction == "out" && draggedClosed) ? 0 : 500;
		return drawerOverlayTransitionTapClose(node, params, { duration });
	}

	// Drawer logic ------------------------------------------------------------------------------------

	// Bindings
	let contentEl = $state();
	let uiWindowHeight = $state();

	// Drawer state
	let dragStartY = $state();
	let isDragging = $state(false);
	let overlayHidden = $state(false);
	let drawerVerticalOffset = $state(0);
	let drawerVerticalTransition = $state(false);
	let velocitySamples = $state([]); // Y positions with timestamps
	let closeDuration = $state(0);

	// Continues the swipe from where the drawer was released
	const animateDrawerClose = (velocity) => {
		overlayHidden = true;
		draggedClosed = true;

		// Px current Y position and target closed Y position
		const start = drawerVerticalOffset;
		const target = uiWindowHeight + DRAWER_HIDDEN_OVERSHOOT;
		closeDuration = clamp((target - start) / Math.max(velocity, 1.5), 180, 420); // Faster flicks close faster

		const startTime = performance.now();
		const step = (now) => {
			const progress = Math.min(1, (now - startTime) / closeDuration); // Progress between 0 - 1
			drawerVerticalTransition = false;
			drawerVerticalOffset = start + (target - start) * cubicBezier(0.45, 0.55, 0.4, 0.92)(progress);

			// If animation still in progress, repeat, otherwhise finish
			if (progress < 1) return requestAnimationFrame(step);
			else {
				close();

				// Resets after close / unmount
				drawerVerticalOffset = 0;
				overlayHidden = false;
			}
		};
		requestAnimationFrame(step);
	};

	const dragStart = (event) => {
		// Abort if not a drawer, already auto-closing, or scrolling content
		if (!popupToDrawer.current || overlayHidden || isScrolledDown(event.target, contentEl)) return;
		dragStartY = event.touches[0].clientY;
		velocitySamples = [{ y: dragStartY, time: performance.now() }];
	};

	const drag = (event) => {
		if (dragStartY == null) return;

		const eventY = event.touches[0].clientY;

		// Cancel if dragging upwards while the touched element or an ancestor up to the content can still scroll down
		if (!isDragging && eventY <= dragStartY && canScrollDown(event.target, contentEl)) return (dragStartY = null);

		event.preventDefault(); // Prevent page scroll
		isDragging = true;

		// Collect samples for velocity calc
		const now = performance.now();
		velocitySamples.push({ y: eventY, time: now });
		while (velocitySamples.length > 2 && now - velocitySamples[0].time > 80) velocitySamples.shift(); // Keep the last 80ms

		// Apply offset
		drawerVerticalTransition = false;
		const delta = eventY - dragStartY;
		drawerVerticalOffset = delta > 0 ? delta : delta * 0.05; // Allow dragging the drawer upwards, but make it less effective (that's what the x0.05 is for)
	};

	const dragEnd = () => {
		if (dragStartY == null) return;
		dragStartY = null;

		if (!isDragging) return; // If not dragging, just reset dragStartY and exit (e.g. single tap)
		isDragging = false;

		// Calculate velocity
		const first = velocitySamples[0];
		const last = velocitySamples.at(-1);
		const velocity = last.time > first.time ? (last.y - first.y) / (last.time - first.time) : 0; // Pixels per ms (time is ms)

		// If swiped with enough velocity or past 1/4, animate it shut, otherwise open fully again
		if (velocity > 0.4 || drawerVerticalOffset > uiWindowHeight * 0.25) animateDrawerClose(velocity);
		else {
			// Too little drag, snap back to fully open state
			drawerVerticalTransition = true;
			drawerVerticalOffset = 0;
		}
	};

	// Automatic z-indexing ---------------------------------------------------------------------

	// Helper to remove the current popup's z-index
	const removeZIndex = () => {
		const index = openZIndexes.indexOf(zIndex);
		if (index !== -1) openZIndexes.splice(index, 1);
	};

	$effect(() => {
		if (open) {
			// Don't track zIndex
			untrack(() => {
				// On open, set zIndex to current maximum and push to array
				const currentMax = Math.max(Math.max(...openZIndexes), 100); // Start with 100
				zIndex = currentMax + 1;
				openZIndexes.push(zIndex);
			});
			// Remove z index on close or unmount
			// $effect stores this cleanup function, so that when it fires with open false it calls it once, then resets it to undefined
			return removeZIndex;
		}
	});

	// Close function ----------------------------------------------------------------------------
	function close() {
		onuserclose?.();
		open = false;
	}
</script>

<svelte:window
	onkeydown={(e) => {
		// Only the topmost popup closes (defaultPrevented breaks ties between equal z values)
		if (e.key == "Escape" && open && zIndex >= Math.max(...openZIndexes) && !e.defaultPrevented) {
			e.preventDefault();
			close();
		}
	}}
/>

{#if open}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="popup-holder"
		class:drawer-holder={popupToDrawer.current}
		style:z-index={zIndex}
		in:popupHolderTransition
		out:popupHolderTransition
		onclick={(e) => {
			if (e.target == e.currentTarget) close();
		}}
		role="dialog"
		tabindex={0}
	>
		<!-- Separate from the holder, a backdrop filter on an ancestor wouldn't work -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="drawer-overlay"
			in:drawerOverlayTransition
			out:drawerOverlayTransition
			onclick={close}
			style:transition="background-color {closeDuration}ms ease-out, backdrop-filter {closeDuration}ms ease-out"
			style:background-color={overlayHidden ? "transparent" : ""}
			style:backdrop-filter={overlayHidden ? "blur(0)" : ""}
		></div>
		<div
			class="ui-window"
			role="menu"
			tabindex="0"
			class:drawer={popupToDrawer.current}
			in:windowTransition
			out:windowTransition
			class:frame-less={frameless}
			style:max-width={popupToDrawer.current
				? "none"
				: ultraSlim
					? "450px"
					: verySlim
						? "600px"
						: slim
							? "750px"
							: "850px"}
			style:transform={drawerVerticalOffset ? `translate3d(0, ${drawerVerticalOffset}px, 0)` : ""}
			style:transition={drawerVerticalTransition ? `transform 500ms cubic-bezier(${DRAWER_EASE})` : ""}
			bind:offsetHeight={uiWindowHeight}
			{@attach (node) => {
				// Needed since regular Svelte's touchmove is passive
				const cleanup = on(node, "touchmove", drag, { passive: false });
				return cleanup;
			}}
			ontouchstart={dragStart}
			ontouchend={dragEnd}
			ontouchcancel={dragEnd}
		>
			{#if popupToDrawer.current}
				<div class="drawer-handle"></div>
			{/if}
			<button class="close-popup-button standard-button" aria-label="close" onclick={close}
				><X strokeWidth={2.25} /></button
			>
			<div class="content of-top of-bottom" class:content-frameless={frameless} bind:this={contentEl}>
				{@render children?.()}
			</div>
		</div>
	</div>
{/if}

<style>
	.popup-holder {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: var(--overlay-color);
		pointer-events: auto;
		backdrop-filter: blur(var(--weak-blur));
		--window-padding: calc(var(--layout-margin) + var(--content-margin));
	}

	.close-popup-button {
		border-radius: var(--box-margin);
		background-color: var(--panel-color-soft);
		position: absolute;
		top: var(--layout-margin);
		right: var(--layout-margin);
		padding: var(--content-margin);
		z-index: 10;
	}

	.frame-less {
		padding: var(--content-margin) !important;
	}

	.content {
		position: relative;
		overflow-y: auto;
		overflow-x: hidden;
		max-height: min(
			900px,
			calc(
				100dvh - var(--layout-margin) * 2 - var(--layout-spacer) - env(safe-area-inset-top) -
					env(safe-area-inset-bottom)
			)
		);
		width: 100%;
		scrollbar-width: none;
		overscroll-behavior: contain;
		border-radius: var(--box-margin);
	}

	.content-frameless {
		max-height: calc(100dvh - var(--layout-spacer) - env(safe-area-inset-top) - env(safe-area-inset-bottom));
		border-radius: 0;
	}

	.ui-window {
		width: calc(100% - var(--layout-margin) * 2);
		padding: var(--window-padding);
		border-radius: calc(var(--layout-margin) + var(--box-margin));
		text-align: left;
		position: relative;
		background-color: var(--panel-color);
		backdrop-filter: blur(var(--normal-blur));
		box-shadow:
			0 2px 100px rgba(5, 6, 10, 0.5),
			inset 0 0.05rem 1px hsla(0, 0%, 100%, 0.2),
			inset 0 -0.2rem 1px rgba(0, 0, 2, 0.2) !important;
		color: white;
		pointer-events: auto;
	}

	.drawer-overlay {
		display: none;
	}

	.drawer-holder {
		align-items: flex-end;
		background-color: transparent;
		backdrop-filter: none;
	}

	.drawer-holder .drawer-overlay {
		display: block;
		position: absolute;
		inset: 0;
		background-color: var(--overlay-color);
		backdrop-filter: blur(var(--weak-blur));
	}

	.drawer {
		display: flex;
		flex-direction: column;
		width: 100%;
		/* Max height is also shorter by the negative --layout-spacer margin bottom */
		max-height: calc(100dvh - env(safe-area-inset-top));
		padding-bottom: calc(var(--window-padding) + env(safe-area-inset-bottom) + var(--layout-spacer));
		margin-bottom: calc(-1 * var(--layout-spacer));
		border-bottom-left-radius: 0;
		border-bottom-right-radius: 0;
	}

	.drawer.frame-less {
		padding-top: calc(var(--layout-margin) * 2) !important;
		/* Add --layout-spacer since we have the negative --layout-spacer margin bottom */
		padding-bottom: calc(max(var(--content-margin), env(safe-area-inset-bottom)) + var(--layout-spacer)) !important;
	}

	.drawer .content {
		flex: 1;
		min-height: 0;
		max-height: none;
	}

	.drawer-handle {
		position: absolute;
		top: var(--box-margin);
		border-radius: 4px;
		left: 50%;
		translate: -50% 0;
		width: 40px;
		height: 4px;
		background-color: var(--line-color);
	}
</style>
