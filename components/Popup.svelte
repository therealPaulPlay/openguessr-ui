<script module>
	const openZIndexes = [];
</script>

<script>
	import { X } from "@lucide/svelte";
	import { untrack } from "svelte";
	import { backOut } from "svelte/easing";
	import { fade, scale } from "svelte/transition";

	let { children, frameless, slim, verySlim, open = $bindable(false), onuserclose } = $props();

	let zIndex = $state(0);

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
		style:z-index={zIndex}
		transition:fade={{ duration: 100 }}
		onclick={(e) => {
			if (e.target == e.currentTarget) close();
		}}
		role="dialog"
		tabindex={0}
	>
		<div
			class="ui-window"
			transition:scale={{ easing: backOut, duration: 250, start: 0.9 }}
			class:frame-less={frameless}
			style:max-width={verySlim ? "600px" : slim ? "750px" : "850px"}
		>
			<button class="close-popup-button standard-button bright" aria-label="close" onclick={close}
				><X strokeWidth={2.25} /></button
			>
			<div class="content of-top of-bottom" class:content-frameless={frameless}>
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
		max-height: min(900px, calc(100dvh - var(--layout-margin) * 2 - 50px));
		width: 100%;
		scrollbar-width: none;
	}

	.content-frameless {
		max-height: calc(100dvh - var(--layout-margin) * 2 - var(--box-margin) - 10px);
		margin-bottom: -4px;
	}

	.ui-window {
		width: calc(100% - var(--layout-margin) * 2);
		padding: calc(var(--layout-margin) + 5px);
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
		transition:
			opacity 250ms ease,
			transform 250ms ease;
	}
</style>
