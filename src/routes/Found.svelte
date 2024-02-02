<script lang="ts">
	import { receive } from './transition';
	import { get_twenmoji_url } from './utils';

	export let found: string[];
</script>

<div class="found">
	{#each found as emoji}
		<div class="pair">
			<img alt={emoji} in:receive={{ key: `${emoji}:a` }} src={get_twenmoji_url(emoji)} />
			<img alt={emoji} in:receive={{ key: `${emoji}:b` }} src={get_twenmoji_url(emoji)} />
		</div>
	{/each}
</div>

<style>
	.found {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		gap: 2em;
	}
	.pair {
		width: 5em;
		height: 5em;
	}
	img {
		position: absolute;
		left: 0;
		top: 0;
		height: 5em;
		width: 5em;
	}
</style>
