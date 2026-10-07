<script>
	import { ChevronDown } from "@lucide/svelte";
	import { slide, fade } from "svelte/transition";

	let { title, isOpen = $bindable(false), children, class: className = "", inPage = true, ontoggle } = $props();
</script>

<div
	class="collapsible-container {className}"
	style:border-radius={inPage ? "var(--layout-margin)" : "var(--box-margin)"}
	style:box-shadow={inPage ? "var(--panel-shadow)" : "var(--box-shadow)"}
>
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<div
		class="collapsible-toggle"
		role="button"
		tabindex={0}
		onclick={() => {
			isOpen = !isOpen;
			ontoggle?.(isOpen);
		}}
	>
		<p class="collapsible-title">{title}</p>
		<div class="collapsible-icon">
			<ChevronDown
				style="margin-bottom: -4px; transition: transform 250ms ease; {isOpen ? 'transform: rotate(180deg)' : ''}"
			/>
		</div>
	</div>
	{#if isOpen}
		<div transition:slide={{ duration: 250 }} style:width="100%" style:margin-top="var(--box-margin)">
			<div transition:fade={{ duration: 250 }} class="collapsible-content">
				{@render children?.()}
			</div>
		</div>
	{/if}
</div>

<style>
	.collapsible-container {
		width: 100%;
		background-color: var(--box-color);
		padding: var(--box-margin);
	}

	.collapsible-toggle {
		display: flex;
		width: 100%;
		gap: var(--box-margin);
		transition: opacity 250ms ease;
		justify-content: space-between;
		align-items: center;
		cursor: pointer;
	}

	.collapsible-title {
		margin-left: var(--content-margin);
		user-select: none;
	}

	.collapsible-icon {
		color: white;
		padding: var(--content-margin);
	}

	.collapsible-toggle:hover {
		opacity: 0.5;
	}

	.collapsible-content {
		display: flex;
		flex-direction: column;
		gap: var(--box-margin);
		width: 100%;
	}
</style>
