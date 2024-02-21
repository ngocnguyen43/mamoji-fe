<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
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
	on:pause={() => {
		state = 'paused';
	}}
	on:lost={() => {
		state = 'lost';
	}}
	on:win={() => {
		state = 'won';
	}}
/>
{#if state !== 'playing'}
	<Modal>
		<header>
			<h1>Ma<span>moji</span></h1>
			<p style="font-size: 1.25em;">The emoji matching game</p>
		</header>
		<div style="display: flex;justify-content: center; font-size: 1em;">
			{#if state === 'won' || state === 'lost'}
				<p>you {state} the game!</p>
			{:else if state === 'paused'}
				<p>game paused</p>
			{:else if state === 'waiting'}
				<p>choose a level:</p>
			{/if}
		</div>
		<div class="btns">
			{#if state === 'paused'}
				<div class="buttons">
					<button
						style="padding: 8px;font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.5rem;border: none; outline: none; cursor: pointer;"
						on:click={() => game.resume()}>Resume</button
					>
					<button
						style="padding: 8px;font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.5rem;border: none; outline: none; cursor: pointer;"
						on:click={() => {
							state = 'waiting';
						}}>Quit</button
					>
				</div>
			{:else}
				<div class="buttons">
					{#each levels as level}
						<button
							style="padding: 8px;font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.5rem;border: none; outline: none; cursor: pointer;"
							on:click={() => {
								game.start(level);
							}}>{level.label}</button
						>
					{/each}
				</div>
			{/if}
		</div>
	</Modal>
{/if}
{#if state === 'won'}
	<div
		class="confetti"
		use:confetti={{
			stageWidth: innerHeight,
			stageHeight: innerHeight
		}}
	></div>
{/if}

<style>
	h1 {
		font-size: 5em;
	}
	h1 span {
		color: purple;
	}
	p {
		font-family: Grandstander;
	}
	.confetti {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 50%;
		top: 30%;
		pointer-events: none;
	}
	.buttons {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
</style>
