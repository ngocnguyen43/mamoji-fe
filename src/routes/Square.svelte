<script lang="ts">
	import { send } from './transition';
	import { get_twenmoji_url } from './utils';
	export let emoji: string;
	export let selected: boolean;
	export let found: boolean;
	export let group: 'a' | 'b';
</script>

<div class="square" class:flipped={selected || found}>
	<button on:click disabled={selected || found} />
	<div class="background" />
	{#if !found}
		<img alt={emoji} out:send={{ key: `${emoji}:${group}` }} src={get_twenmoji_url(emoji)} />
	{/if}
</div>

<style>
	.square {
		display: flex;
		align-items: center;
		justify-content: center;
		transform-style: preserve-3d;
		transition: transform 0.4s;
	}
	.background {
		position: absolute;
		background-color: white;
		border: 0.5em solid #eee;
		transform: rotateY(180deg);
		backface-visibility: hidden;
		width: 100%;
		height: 100%;
		border-radius: 2em;
		pointer-events: none;
	}
	img {
		height: 5em;
		width: 5em;
		pointer-events: none;
		transform: rotateY(180deg);
		backface-visibility: hidden;
	}
	button {
		background-color: #eee;
		border: none;
		position: absolute;
		font-size: inherit;
		width: 100%;
		height: 100%;
		border-radius: 2em;
	}
	.flipped {
		transform: rotateY(180deg);
		background-color: white;
		z-index: 2;
	}
</style>
