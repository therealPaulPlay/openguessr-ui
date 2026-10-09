<script>
	import {
		Chip,
		Collapsible,
		ConfirmPopup,
		ErrorPopup,
		InfoBanner,
		LoadingSpinner,
		Notification,
		Popup,
		RoomCodeInput,
		Tabs,
		Ticker,
		TitleSeparator,
		ExperimentSign,
		tooltip,
		showNotification,
		showConfirmPopup,
		showErrorPopup,
	} from "../index.js";
	import ExamplePortal from "./ExamplePortal.svelte";
	import { ArrowRight, Info, SquarePen, Share2, Trash } from "@lucide/svelte";

	let popupOpen = $state(false);
	let rounds = $state(5);
	let time = $state(60);
	let tooltipState = $state({ visible: false });
</script>

<!-- Mount ConfirmPoup and ErrorPopup -->
<ConfirmPopup />
<ErrorPopup />

<!-- Mount Notification -->
<Notification />

<!-- Example popup -->
<Popup bind:open={popupOpen} slim>
	<div class="popup-title">
		<h1>More</h1>
	</div>
	<TitleSeparator text="Text" />
	<div class="box">
		<div class="scroll-area of-top of-bottom" style:max-height="180px">
			<p style:padding-inline="var(--content-margin)">
				Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
				dolore magna aliquyam erat, sed diam voluptua. <br /><br />At vero eos et accusam et justo duo dolores et ea
				rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
				amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
				erat, sed diam voluptua. <br /><br />At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
				gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
				sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
				voluptua. <br /><br />At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
				takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
				diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
				<br /><br />At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
				sanctus est Lorem ipsum dolor sit amet.
			</p>
		</div>
	</div>
	<TitleSeparator text="Controls" />
	<div class="box" style:width="fit-content" style:display="flex" style:flex-wrap="wrap" style:gap="var(--box-margin)">
		<button class="standard-button bright">
			<SquarePen
				size={20}
				strokeWidth={2.25}
				style="margin-right: var(--content-margin); margin-bottom: -2px;"
			/>Edit</button
		>
		<button class="standard-button bright"
			><Share2
				size={20}
				strokeWidth={2.5}
				style="margin-right: var(--content-margin); margin-bottom: -3px;"
			/>Share</button
		>
		<button class="standard-button bright"
			><Trash
				size={20}
				strokeWidth={2.5}
				style="margin-right: var(--content-margin); margin-bottom: -2px;"
			/>Delete</button
		>
	</div>
	<!-- Useless confirm button here just as an example, a popup bottom button should only be included when needed -->
	<button class="standard-button large popup-bottom-button" onclick={() => (popupOpen = false)}>Confirm</button>
</Popup>

<main>
	<h1 class="title">Examples</h1>

	<ExamplePortal title="1. Buttons">
		<div class="panel">
			<button class="standard-button bright">Lock in guess</button>
			<button class="standard-button bright"><Info size={22} strokeWidth={2.25} style="margin-bottom: -2px;" /></button>
		</div>
	</ExamplePortal>

	<ExamplePortal title="2. Popup and overflow">
		<div class="panel panel-rounder">
			<button class="standard-button large wide" onclick={() => (popupOpen = true)}>Open</button>
		</div>
	</ExamplePortal>

	<ExamplePortal title="3. Containers and boxes">
		<div class="layout layout-slim" style:align-items="start">
			<div class="container">
				<h3 class="box-text" style:padding-inline="var(--content-margin)">General</h3>
				<div class="box">
					<p class="supportive" style:padding-inline="var(--content-margin)">This is how you build a container.</p>
				</div>
			</div>
			<div class="container" style:width="300px">
				<h3 class="box-text" style:padding-inline="var(--content-margin)">Getting started</h3>
				<div class="box box-dark">
					<ol class="supportive">
						<li>Containers are great</li>
						<li>Boxes are too</li>
					</ol>
				</div>
				<div class="box box-flex">
					<p class="supportive" style:opacity="1" style:padding-inline="var(--content-margin)">Ready to start?</p>
					<button class="standard-button bright"
						>Start <ArrowRight
							size={20}
							strokeWidth={2.25}
							style="margin-left: var(--content-margin); margin-bottom: -2px;"
						/></button
					>
				</div>
			</div>
		</div>
	</ExamplePortal>

	<ExamplePortal title="4. Chips">
		<div class="panel row">
			<Chip text="Now live" />
			<Chip text="New" red italic mutedOpacity={false} />
			<Chip text="More info" onclick={() => {}} mutedOpacity={false} />
		</div>
	</ExamplePortal>

	<ExamplePortal title="5. Collapsibles">
		<div class="layout-flex">
			<div class="layout layout-flex-item" style:align-items="start">
				<div class="container" style:width="400px">
					<div class="box">
						<p style:padding-inline="var(--content-margin)" class="supportive">
							Some content isn't relevant to all players.
						</p>
					</div>
					<Collapsible title="Rarely used" inPage={false}>
						<p class="box-text supportive" style:display="block" style:padding-inline="var(--content-margin)">
							Content appears here.
						</p>
					</Collapsible>
				</div>
			</div>
			<div class="layout layout-flex-item" style:align-items="start" style:width="430px">
				<Collapsible title="Additional details">
					<div class="box">
						<p class="box-text supportive" style:padding-inline="var(--content-margin)">
							Collapsibles can be used in pages too. Notice how the text is now inside a box?
						</p>
					</div>
				</Collapsible>
			</div>
		</div>
	</ExamplePortal>

	<ExamplePortal title="6. Tooltips">
		<div class="panel panel-rounder row">
			<button class="standard-button bright large" {@attach tooltip({ text: "Info" })}
				><Info size={22} strokeWidth={2.25} style="margin-bottom: -2px;" /></button
			>
			<button
				class="standard-button bright large"
				{@attach tooltip({
					text: "This is a persistent tooltip.",
					imageSrc: "https://picsum.photos/seed/tooltip/300/300",
					maxWidth: 175,
					state: tooltipState,
				})}
				onclick={() => (tooltipState.visible = !tooltipState.visible)}>Toggle here</button
			>
		</div>
	</ExamplePortal>

	<ExamplePortal title="7. Tabs">
		<div class="layout layout-slim layout-slim-with-padding">
			<div class="container" style:width="350px">
				<div class="box box-flex">
					<p style:padding-inline="var(--content-margin)">Current view</p>
					<Tabs tabs={["Map", "List"]} />
				</div>
				<div class="box box-loading">
					<p style:opacity="0.5">Loading...</p>
				</div>
			</div>
		</div>
	</ExamplePortal>

	<ExamplePortal title="8. Ticker">
		<div class="layout layout-slim layout-slim-with-padding">
			<div class="container" style:min-width="375px">
				<div class="box box-flex">
					<p style:padding-inline="var(--content-margin)">Rounds</p>
					<Ticker bind:value={rounds} initialValue={5} minimum={1} maximum={10} note="rounds" />
				</div>
				<div class="box box-flex">
					<p style:padding-inline="var(--content-margin)">Time</p>
					<Ticker
						bind:value={time}
						initialValue={60}
						step={30}
						minimum={30}
						maximum={300}
						minValueWidth="50px"
						note="sec"
					/>
				</div>
			</div>
		</div>
	</ExamplePortal>

	<ExamplePortal title="9. Notifications">
		<div class="panel row">
			<button class="standard-button bright" onclick={() => showNotification("Copied!")}>Simple</button>
			<button class="standard-button bright" onclick={() => showNotification("Accept event invite?", () => {})}
				>With action</button
			>
			<button
				class="standard-button bright"
				onclick={() =>
					showNotification(
						"%s sent you a message.",
						() => {},
						undefined,
						true,
						"Paul",
						() => {},
					)}>Clickable text</button
			>
		</div>
	</ExamplePortal>

	<ExamplePortal title="10. Info banners">
		<div class="layout layout-slim layout-slim-with-padding" style:flex-direction="column">
			<InfoBanner text="Inactive players are hidden." inPage={true} />
			<div class="container" style:width="400px">
				<div class="box">
					<p class="supportive" style:padding-inline="var(--content-margin)">Clicking continue will remove this map.</p>
				</div>
				<InfoBanner text="This can't be undone." />
			</div>
		</div>
	</ExamplePortal>

	<ExamplePortal title="11. Confirm popups">
		<div class="panel row">
			<button
				class="standard-button bright"
				onclick={() =>
					showConfirmPopup("Remove item?", "The item will be removed from your favorites.", () => {}, "Remove")}
				>With action</button
			>
			<button
				class="standard-button bright"
				onclick={() => showConfirmPopup("About", "This map's locations are generated live.")}>Info only</button
			>
		</div>
	</ExamplePortal>

	<ExamplePortal title="12. Error popups">
		<div class="panel row">
			<button
				class="standard-button bright"
				onclick={() =>
					showErrorPopup("Failed to load map", "An error occurred loading the map.", "Error: 404 - Map not found")}
				>With error code</button
			>
			<button
				class="standard-button bright"
				onclick={() =>
					showErrorPopup("Connection lost", "You were disconnected from the server.", undefined, false, true)}
				>Text only</button
			>
		</div>
	</ExamplePortal>

	<ExamplePortal title="13. Room code input">
		<div class="layout layout-slim layout-slim-with-padding" style:flex-direction="column">
			<RoomCodeInput />
			<div class="container" style:margin-top="var(--layout-margin)">
				<div style:display="flex" style:height="40px" style:width="250px">
					<RoomCodeInput inPage={false} />
				</div>
			</div>
		</div>
	</ExamplePortal>

	<ExamplePortal title="14. Loading spinner">
		<LoadingSpinner />
	</ExamplePortal>

	<ExamplePortal title="15. Experiment sign">
		<ExperimentSign />
	</ExamplePortal>
</main>

<style>
	main {
		padding: var(--layout-margin);
		max-width: 1100px;
		margin-inline: auto;
		padding-block: var(--layout-spacer);
	}

	.title {
		padding-block: var(--layout-margin);
		margin-bottom: var(--layout-margin);
	}

	.box {
		border-radius: var(--box-margin);
		padding: var(--box-margin);
		background-color: var(--box-color);
		border-radius: var(--box-margin);
		box-shadow: var(--box-shadow);
	}

	.box-flex {
		display: flex;
		justify-content: space-between;
		gap: var(--box-margin);
		align-items: center;
	}

	.box-loading {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 75px;
	}

	.box-dark {
		background-color: var(--box-color-dark);
	}

	.container {
		border-radius: var(--layout-margin);
		padding: var(--box-margin);
		background-color: var(--box-color);
		box-shadow: var(--panel-shadow);
		display: flex;
		flex-direction: column;
		gap: var(--box-margin);
	}

	.panel {
		border-radius: var(--box-margin);
		padding: var(--panel-margin);
		background-color: var(--panel-color);
		backdrop-filter: blur(var(--normal-blur));
		box-shadow: var(--panel-shadow);
		display: flex;
		justify-content: center;
		align-items: center;
		gap: var(--panel-margin);
	}

	.panel-rounder {
		border-radius: var(--layout-margin);
	}

	.scroll-area {
		overflow-y: auto;
		border-radius: var(--content-margin);
		scrollbar-width: none;
	}

	.layout {
		position: absolute;
		inset: calc(var(--layout-margin) + var(--box-margin));
		border-radius: calc(var(--layout-margin) * 2);
		background: var(--overlay-color-dark);
		backdrop-filter: blur(var(--elevated-blur));
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--layout-margin);
		gap: var(--layout-margin);
		box-shadow: var(--panel-shadow);
	}

	.layout-flex {
		display: flex;
		gap: calc(var(--layout-margin) + var(--box-margin));
	}

	.layout-flex-item {
		position: relative;
		min-height: 200px;
		inset: 0;
	}

	.layout-slim {
		margin-inline: auto;
		max-width: fit-content;
	}

	.layout-slim-with-padding {
		padding-inline: 50px;
	}

	.supportive {
		opacity: 0.75;
	}
</style>
