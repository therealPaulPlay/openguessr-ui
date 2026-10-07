<script>
	import compassSpinner from "../vector-graphics/compass_spinner.svg";

	let { class: classes = "", style } = $props();
</script>

<img src={compassSpinner} fetchpriority="high" alt="Loading" class="spinner {classes}" {style} />

<style>
	.spinner {
		opacity: 0.5;
		filter: drop-shadow(0 0 30px rgba(255, 255, 255, 0.5));
		animation: rotation 1.5s infinite linear;
		width: 125px;
		height: 125px;
		user-select: none;
		pointer-events: none;
		transition:
			transform 250ms ease,
			scale 250ms ease,
			opacity 500ms ease;
	}

	@keyframes rotation {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(359deg);
		}
	}
</style>
