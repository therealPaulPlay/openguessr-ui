<script>
	import { Info } from "@lucide/svelte";
	import { slide } from "svelte/transition";

	let {
		text,
		children,
		inPage = false,
		class: classes = "",
		style = "",
		nowrap = false,
		center = false,
		transition = false,
	} = $props();
</script>

<div
	transition:slide={{ duration: transition ? 400 : 0 }}
	class="info-container {classes}"
	class:info-container-in-page={inPage}
	class:info-container-center={center}
	{style}
>
	<Info strokeWidth={2.25} size={22} color="white" style="opacity: 50%; flex-shrink: 0;" />
	<div class="text-container of-left of-right">
		{#if text}
			<p class:p-nowrap={nowrap}>{text}</p>
		{:else if children}
			<p class:p-nowrap={nowrap}>{@render children()}</p>
		{:else}
			<p>Default info.</p>
		{/if}
	</div>
</div>

<style>
	.info-container {
		display: flex;
		padding: var(--box-margin);
		padding-inline: var(--layout-margin);
		border-radius: var(--box-margin);
		align-items: center;
		background-color: var(--box-color);
		box-shadow: var(--box-shadow);
		gap: var(--box-margin);
		width: 100%;
	}

	.info-container p {
		opacity: 0.5;
	}

	.info-container-center {
		justify-content: center;
	}

	.text-container {
		overflow-x: auto;
		scrollbar-width: none;
	}

	.p-nowrap {
		white-space: nowrap;
	}

	.info-container-in-page {
		box-shadow: var(--panel-shadow);
		border-radius: var(--layout-margin);
	}
</style>
