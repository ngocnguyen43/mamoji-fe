<script lang="ts">
	import Game from './Game.svelte';
	import '../style.css';
	import Modal from './Modal.svelte';
	import { levels } from './labels';
	let state: 'waiting' | 'won' | 'paused' | 'lost' | 'playing' = 'waiting';
	let game: Game;
</script>

<Game
	bind:this={game}
	on:play={() => {
		state = 'playing';
	}}
/>
{#if state !== 'playing'}
	<Modal>
		<h1>Hello</h1>
		{#if state === 'won' || state === 'lost'}
			<p>you {state} the game!</p>
		{:else if state === 'paused'}
			<p>game paused</p>
		{:else if state === 'waiting'}
			<p>choose a level:</p>
		{/if}
		<div class="btns">
			{#if state === 'paused'}
				<button>Resume</button>
				<button>Quit</button>
			{:else}
				{#each levels as level}
					<button
						on:click={() => {
							game.start(level);
						}}>{level.label}</button
					>
				{/each}
			{/if}
		</div>
	</Modal>
{/if}
