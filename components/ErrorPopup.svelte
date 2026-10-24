<script>
	import { errorPopupState } from "../utils/errorPopup.svelte.js";
	import Popup from "./Popup.svelte";
</script>

<Popup
	verySlim={true}
	bind:open={errorPopupState.popupOpen}
	onuserclose={() => {
		if (errorPopupState.reload) window.location.reload();
	}}
>
	<div class="popup-title">
		<h1>{errorPopupState.title}</h1>
	</div>
	<div>
		<p class="slight-bottom-margin">{errorPopupState.description}</p>
		{#if errorPopupState.errorCode}
			<p class="error-code bright-soft">{errorPopupState.errorCode}</p>
		{/if}
	</div>
	{#if !errorPopupState.hideDisableOption}
		<div id="error-popup-disable">
			<p>Never show again</p>
			<input type="checkbox" bind:checked={errorPopupState.hideErrors} />
		</div>
	{/if}
</Popup>

<style>
	.error-code {
		opacity: 70%;
		padding: var(--box-margin);
		padding-inline: var(--layout-margin);
		border-radius: var(--box-margin);
		font-size: 14px;
		line-height: 22px;
		font-family: monospace;
		margin-top: var(--box-margin);
		box-shadow: var(--box-shadow);
		user-select: text;
		-webkit-user-select: text;
	}

	#error-popup-disable {
		display: flex;
		vertical-align: center;
		margin-top: var(--layout-margin);
		font-size: 22px;
		opacity: 60%;
	}

	.slight-bottom-margin {
		margin-bottom: var(--layout-margin);
	}
</style>
