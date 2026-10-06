<script>
	let {
		red = false,
		text = "Default",
		italic = false,
		mutedOpacity = true,
		children,
		class: classes,
		style,
		onclick,
	} = $props();
</script>

<span
	class="chip {classes}"
	class:clickable={onclick}
	{onclick}
	role={onclick ? "button" : ""}
	class:chip-red={red}
	class:chip-italic={italic}
	class:muted-opacity={mutedOpacity}
	{style}
>
	<span>
		{#if !children || typeof children !== "function"}
			{text}
		{:else}
			{@render children()}
		{/if}
	</span>
</span>

<style>
	.chip {
		border-radius: var(--content-margin);
		background: var(--box-color);
		padding: 2px;
		padding-inline: var(--content-margin);
		box-shadow: var(--bulb-shadow);
		flex-shrink: 0;
		max-width: fit-content;
		display: inline-flex;
		align-items: center;
		user-select: none;
	}

	.chip,
	:global(.chip *) {
		font-size: 18px;
	}

	.chip.muted-opacity > span {
		opacity: 0.75;
	}

	.chip > span {
		white-space: nowrap;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		width: fit-content;
		line-height: normal;
		transition: opacity 250ms ease;
	}

	:global(.chip.chip-red span, .chip.chip-red p) {
		opacity: 1;
	}

	.chip-red {
		background-color: var(--brand-color);
		color: white;
	}

	.chip-italic {
		font-style: italic;
		padding-inline: var(--panel-margin);
		padding-left: calc(var(--panel-margin) - 2px);
	}

	.clickable {
		transition: opacity 250ms ease;
		cursor: pointer;
	}

	.clickable:hover {
		opacity: 0.5;
	}
</style>
