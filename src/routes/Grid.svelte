<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	import Square from './Square.svelte';
	import { information } from './store';
	export let grid: string[];
	export let found: string[];

	let a = -1;
	let b = -1;

	let clear_timeout: NodeJS.Timeout;

	const dispatch = createEventDispatcher();
</script>

<div class="grid">
	{#each grid as emoji, i}
		<Square
			{emoji}
			on:click={() => {
				clearTimeout(clear_timeout);

				if (a === -1 && b === -1) {
					a = i;
					clear_timeout = setTimeout(
						() => {
							a = b = -1;
						},
						1000 - (1000 * $information.difficult) / 100
					);
				} else if (b === -1) {
					b = i;
					if (grid[a] === grid[b]) {
						dispatch('found', {
							emoji,
							score: 20
						});
						$information.score += 20;
					} else {
						clear_timeout = setTimeout(
							() => {
								a = b = -1;
							},
							1000 - (1000 * $information.difficult) / 100
						);
					}
				} else {
					a = i;
					b = -1;
					clear_timeout = setTimeout(
						() => {
							a = b = -1;
						},
						1000 - (1000 * $information.difficult) / 100
					);
				}
			}}
			selected={a === i || b === i}
			found={found.includes(emoji)}
			group={grid.indexOf(emoji) === i ? 'a' : 'b'}
		/>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(var(--size), 1fr);
		grid-template-rows: repeat(var(--size), 1fr);
		height: 100%;
		gap: 1em;
		perspective: 100vw;
	}
</style>
