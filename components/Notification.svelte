<script>
	import { notification, hideNotification } from "../notifications.svelte.js";
	import { Check, SquareArrowOutUpRight, X } from "@lucide/svelte";
	import { fly } from "svelte/transition";

	let { top = "var(--layout-margin)", onaccept, ondismiss } = $props();

	function accept() {
		if (notification.acceptFunction) {
			try {
				notification.acceptFunction();
			} catch (error) {
				console.error("Error executing notification function:", error);
			}
		}

		onaccept?.();
		hideNotification();
	}

	function dismiss() {
		if (notification.dismissFunction) {
			try {
				notification.dismissFunction();
			} catch (error) {
				console.error("Error executing notification function:", error);
			}
		}

		ondismiss?.();
		hideNotification();
	}

	let notificationTextArray = $derived(
		notification.clickableText ? notification.text?.split("%s") : [notification.text],
	);
</script>

<div class="notification-holder" style:top>
	{#if notification.visible}
		<div id="notification-bar" transition:fly={{ y: -20, duration: 250 }}>
			<p id="notification-text">
				{#each notificationTextArray, index}
					{notificationTextArray[index]}
					{#if notificationTextArray.length > index + 1}
						<!-- svelte-ignore a11y_click_events_have_key_events -->
						<span class="clickable-text" onclick={notification.textClickFunction} role="button" tabindex="0"
							>{notification.clickableText}</span
						>
					{/if}
				{/each}
			</p>
			<div class="notification-button-box">
				{#if notification.acceptFunction}
					<button
						id="notification-accept"
						class="standard-button bright"
						onclick={accept}
						aria-label={notification.viewOnly ? "View" : "Accept"}
					>
						{#if notification.viewOnly}
							<SquareArrowOutUpRight size={20} strokeWidth={2.25} style="vertical-align: -1px;" />
						{:else}
							<Check size={20} strokeWidth={2.25} style="vertical-align: -1px;" />
						{/if}
					</button>
				{/if}
				<button id="notification-dismiss" class="standard-button bright" onclick={dismiss} aria-label="Dismiss">
					<X size={20} strokeWidth={2.25} style="vertical-align: -1px;" />
				</button>
			</div>
		</div>
	{/if}
</div>

<style>
	#notification-bar {
		background-color: var(--panel-color);
		backdrop-filter: blur(var(--normal-blur));
		box-shadow: var(--panel-shadow);
		border-radius: var(--box-margin);
		width: fit-content;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: var(--panel-margin);
		gap: var(--layout-margin);
		pointer-events: auto;
		max-width: 80%;
		margin-inline: auto;
	}

	.clickable-text {
		cursor: pointer;
		transition: opacity 250ms ease;
	}

	.clickable-text:hover {
		opacity: 0.5;
	}

	.notification-holder {
		position: fixed;
		left: var(--box-margin);
		right: var(--box-margin);
		display: flex;
		justify-content: center;
		pointer-events: none;
		z-index: 999;
		transition: top 250ms ease;
	}

	#notification-dismiss,
	#notification-accept {
		padding-inline: var(--box-margin);
	}

	#notification-text {
		padding-left: var(--panel-margin);
		max-width: 350px;
		overflow: hidden;
		text-overflow: ellipsis;
		text-wrap: nowrap;
	}

	.notification-button-box {
		display: flex;
		align-items: center;
		width: fit-content;
		gap: var(--panel-margin);
	}
</style>
