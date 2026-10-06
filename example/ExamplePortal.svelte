<script>
	let { title, children } = $props();
</script>

<section>
	<h2>{title}</h2>
	<div class="portal">
		{@render children?.()}
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		gap: var(--layout-margin);
		margin-bottom: var(--layout-spacer);
	}

	h2 {
		padding-inline: var(--content-margin);
	}

	.portal {
		border-radius: var(--layout-margin);
		overflow: hidden;
		position: relative;
		min-height: 300px;
		padding: var(--layout-margin);
		background:
			radial-gradient(ellipse 60% 35% at 50% 105%, rgba(200, 150, 140, 0.25), transparent),
			linear-gradient(
				in oklch to bottom,
				#080a1a 0%,
				#0c1026 20%,
				#121733 38%,
				#1a1e3e 54%,
				#252546 68%,
				#352d4c 80%,
				#4a3850 90%,
				#5e4652 100%
			);
		box-shadow: var(--panel-shadow);
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		gap: var(--layout-margin);
	}
</style>
