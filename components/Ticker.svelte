<script>
	let {
		note,
		step = 1,
		minimum = 1,
		maximum = 5,
		initialValue = 1,
		value = $bindable(),
		minimumText,
		maximumText,
		minimumValue,
		maximumValue,
		minValueWidth = "30px",
		onchange,
	} = $props();
	import { Minus, Plus } from "@lucide/svelte";

	// svelte-ignore state_referenced_locally
	let internalValue = $state(initialValue);

	$effect(() => {
		if (internalValue === minimum && minimumValue != null) return (value = minimumValue);
		if (internalValue === maximum && maximumValue != null) return (value = maximumValue);
		value = internalValue;
	});

	let displayText = $derived.by(() => {
		if (internalValue === minimum && minimumText != null) return minimumText;
		if (internalValue === maximum && maximumText != null) return maximumText;
		return internalValue;
	});
</script>

<div class="ticker bright-soft">
	<button
		id="round-minus"
		class="standard-button bright"
		disabled={internalValue === minimum}
		onclick={() => {
			internalValue = internalValue - step;
			if (internalValue < minimum) internalValue = minimum;
			onchange?.(internalValue);
		}}><Minus size={18} strokeWidth={2.5} /></button
	>
	<p class="ticker-text bright-soft" style:min-width={minValueWidth}>{displayText ?? "..."}</p>
	{#if note}
		<p class="ticker-note">{note}</p>
	{/if}
	<button
		id="round-plus"
		class="standard-button bright"
		disabled={internalValue === maximum}
		onclick={() => {
			internalValue = internalValue + step;
			if (internalValue > maximum) internalValue = maximum;
			onchange?.(internalValue);
		}}><Plus size={18} strokeWidth={2.5} /></button
	>
</div>

<style>
	.ticker-text {
		box-shadow: var(--bulb-shadow);
		padding: var(--content-margin);
		padding-left: var(--box-margin);
		padding-right: var(--box-margin);
		text-align: center;
		border-radius: var(--content-margin);
		font-size: 20px;
	}

	.ticker-note {
		font-size: 20px;
	}

	.ticker {
		display: flex;
		gap: var(--box-margin);
		box-shadow: var(--box-shadow);
		border-radius: var(--box-margin);
		justify-content: left;
		padding: var(--panel-margin);
		width: fit-content;
		align-items: center;
	}
</style>
