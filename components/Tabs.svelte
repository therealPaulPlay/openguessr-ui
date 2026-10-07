<script>
	let {
		tabs = [],
		selectedIndex = $bindable(0),
		selected = $bindable(tabs[selectedIndex || 0]), // Bindable selected tab as a prop
		onchange,
		disabled = false,
		children,
		class: className = "", // Alias for HTML class attribute
	} = $props();

	// Handle tab selection
	function selectTab(tab) {
		selected = tab;
		selectedIndex = tabs.findIndex((e) => e == tab);
		onchange?.(selected, selectedIndex);
	}
</script>

<div class="tabs-group standard-button {className}" class:disabled>
	{#each tabs as Tab}
		<button
			class="tab-button standard-button {selected === Tab ? 'active' : ''}"
			onclick={() => selectTab(Tab)}
			{disabled}
		>
			{#if typeof Tab === "function"}
				<Tab size={20} strokeWidth={2.25} style="margin-bottom: -2px;" />
			{:else}
				{Tab}
			{/if}
			{@render children?.(Tab)}
		</button>
	{/each}
</div>

<style>
	.tabs-group {
		border-radius: var(--content-margin);
		width: fit-content;
		display: flex;
		max-width: 100%;
		height: 40px;
		background-color: transparent;
		border: 3px solid rgba(255, 255, 255, 0.3);
		box-shadow: var(--button-shadow);
		pointer-events: none;
		padding: 0;
		overflow: hidden;
		flex-shrink: 0;
	}

	.disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.tabs-group:has(button:active) {
		transform: scale(0.98);
	}

	.tab-button {
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(255, 255, 255, 0.075);
		color: rgba(255, 255, 255, 0.5);
		border: none;
		border-radius: 0;
		padding-top: 0;
		padding-bottom: 0;
		height: 100%;
		outline: none;
		overflow: hidden;
		flex-grow: 1;
		box-shadow: none !important;
		pointer-events: auto;
	}

	.tab-button:active {
		transform: none;
	}

	.tab-button.active {
		color: white;
		background-color: rgba(255, 255, 255, 0.2);
	}
</style>
