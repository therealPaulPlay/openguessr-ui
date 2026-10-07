<script>
	import Popup from "./Popup.svelte";
	import { confirmPopup } from "../confirmPopup.svelte.js";

	let { onconfirm } = $props();

	function confirm() {
		onconfirm?.();
		confirmPopup.visible = false;
		try {
			confirmPopup.executeFunction?.();
		} catch (error) {
			console.error("Error executing confirm callback:", error);
		}
	}
</script>

<Popup verySlim={true} bind:open={confirmPopup.visible}>
	<div class="popup-title">
		<h1>{confirmPopup.title}</h1>
	</div>
	<p>{confirmPopup.description}</p>
	<div style:margin-top="var(--layout-margin)">
		{#if confirmPopup.executeFunction}
			<button class="standard-button popup-bottom-button large" onclick={confirm}>{confirmPopup.confirmText}</button>
		{/if}
	</div>
</Popup>
