<script lang="ts">
	export let duration: number;
	export let remaining: number;
</script>

<div class="countdown">
	<button on:click>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><title>pause-circle</title><path
				d="M15,16H13V8H15M11,16H9V8H11M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
				fill="#ccc"
			/></svg
		>
	</button>
	<div class="duration">
		<div class="remaining" style="--p: {remaining / duration}"></div>
	</div>
</div>

<style>
	.countdown {
		display: flex;
		align-items: center;
		gap: 2em;
	}
	button {
		height: 5em;
		width: 5em;
		aspect-ratio: 1;
		background: transparent;
		border: none;
		padding: 0;
	}
	svg {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.duration {
		flex: 1;
		height: 1em;
		background: #ccc;
	}
	.remaining {
		position: absolute;
		height: 100%;
		width: calc(100% * var(--p));
		background-color: #999;
	}
</style>
