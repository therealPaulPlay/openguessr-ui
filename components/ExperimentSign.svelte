<script>
	import { showConfirmPopup } from "../confirmPopup.svelte.js";
	import experimentStars from "../images/experiment_stars.png";
</script>

<div class="sign">
	<img alt="stars" src={experimentStars} class="stars" />
	<h3>Experiment</h3>
	<p class="subtitle">
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		An OpenGuessr experiment.
		<span
			role="button"
			class="learn-more"
			tabindex="0"
			onclick={() =>
				showConfirmPopup(
					"Experiments",
					"Experiments are new ideas brought to life with help from artificial intelligence and built upon the robust foundations of OpenGuessr.",
				)}>Learn more</span
		>.
	</p>
</div>

<style>
	.sign {
		background-color: var(--panel-color);
		box-shadow: var(--panel-shadow);
		border-radius: var(--layout-margin);
		padding: var(--layout-margin);
		position: relative;
		display: flex;
		flex-direction: column;
		gap: var(--content-margin);
		backdrop-filter: blur(var(--normal-blur));
	}

	.stars {
		position: absolute;
		width: 150px;
		height: 150px;
		top: -73px;
		right: -35px;
		pointer-events: none;
		user-select: none;
	}

	.subtitle {
		opacity: 0.5;
		padding-right: var(--box-margin);
	}

	.learn-more {
		text-decoration: underline;
		cursor: pointer;
	}
</style>
