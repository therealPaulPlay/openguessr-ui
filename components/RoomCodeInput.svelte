<script>
	import { ArrowRight } from "@lucide/svelte";
	import { tooltip } from "../tooltip.svelte.js";

	let { segments = $bindable(["", "", "", "", "", ""]), inPage = true, onsubmit } = $props(); // 6 segments for XXX-XXX

	let inputRefs = $state([]); // Store references to input elements
	let roomCode = $derived(segments.join(""));

	function handleInput(index, event) {
		const value = event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "");
		segments[index] = value.slice(-1); // Only keep last character
		if (value && index < 5) inputRefs[index + 1]?.focus(); // Move to next input
	}

	function handleKeydown(index, event) {
		if (event.key === "Backspace" && !segments[index] && index > 0) inputRefs[index - 1]?.focus(); // Move to previous input on backspace
		if (event.key === "Enter" && roomCode.length === 6) onsubmit?.(roomCode);
	}

	function handlePaste(event) {
		event.preventDefault();
		const paste = event.clipboardData
			.getData("text")
			.toUpperCase()
			.replace(/[^A-Z0-9]/g, "");
		if (paste.length <= 6) {
			for (let i = 0; i < 6; i++) segments[i] = paste[i] || "";
		}
	}
</script>

<div class="segmented-input-box" class:segmented-input-box-compact={!inPage} onpaste={handlePaste}>
	{#each segments, i}
		{const placeholder = ["A", "B", "C", "1", "2", "3"]}
		<input
			type="text"
			class="segment-input"
			placeholder={placeholder[i]}
			bind:this={inputRefs[i]}
			bind:value={segments[i]}
			oninput={(e) => handleInput(i, e)}
			onkeydown={(e) => handleKeydown(i, e)}
			maxlength={1}
		/>
		{#if i === 2 && inPage}
			<span class="dash">-</span>
		{/if}
	{/each}
	{#if !inPage}
		<button
			class="standard-button bright join-submit-button"
			aria-label="Join room"
			disabled={roomCode.length !== 6}
			{@attach tooltip({ text: "Join" })}
			onclick={() => onsubmit?.(roomCode)}
		>
			<ArrowRight size={18} strokeWidth={2.25} />
		</button>
	{/if}
</div>

<style>
	.segmented-input-box {
		display: flex;
		align-items: center;
		gap: var(--box-margin);
		justify-content: center;
	}

	.segment-input {
		width: 38px;
		height: 50px;
		border-radius: var(--box-margin);
		text-align: center;
		text-transform: uppercase;
		box-shadow: var(--panel-shadow);
	}

	.segment-input::placeholder {
		opacity: 0.25 !important;
	}

	.dash {
		opacity: 0.25;
		color: white;
		font-size: 22px;
	}

	.segmented-input-box-compact {
		gap: var(--content-margin);
		flex-grow: 1;
		min-width: 0;
	}

	.segmented-input-box-compact .segment-input {
		min-width: 0;
		height: 100%;
		font-size: 18px;
		border-radius: var(--content-margin);
		box-shadow: var(--box-shadow);
	}

	/* Compact in-box variant, plus the button */

	.segmented-input-box-compact .segment-input::placeholder {
		font-size: 18px;
	}

	.segmented-input-box-compact .segment-input:not(:focus) {
		background-color: var(--box-color);
	}

	.join-submit-button {
		border: none;
		height: 100%;
		padding-inline: var(--box-margin);
		box-shadow: var(--box-shadow);
		background-color: rgba(255, 255, 255, 0.2);
	}

	.join-submit-button:disabled {
		opacity: 1;
		background-color: var(--box-color);
	}

	:global(.join-submit-button:disabled > *) {
		opacity: 0.5;
	}
</style>
