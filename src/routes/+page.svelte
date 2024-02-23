<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import Game from './Game.svelte';
	import '../style.css';
	import Modal from './Modal.svelte';
	import { levels } from './labels';
	import Information from './Information.svelte';
	import { information, reset } from './store';
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
			<p>The emoji matching game</p>
		</header>
		<div style="font-size: 1em;">
			{#if state === 'won' || state === 'lost'}
				<p>you {state} the level!</p>
			{:else if state === 'paused'}
				<p>game paused</p>
			{:else if state === 'waiting'}
				<Information />
				<p style="text-align: center;">choose a level:</p>
			{/if}
		</div>
		<div class="btns">
			{#if state === 'paused'}
				<div class="buttons">
					<button
						style="padding: 8px;font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
						on:click={() => game.resume()}>Resume</button
					>
					<button
						style="padding: 8px;font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
						on:click={() => {
							state = 'waiting';
							reset();
						}}>Quit</button
					>
				</div>
			{:else if state === 'won'}
				<div class="buttons">
					<button
						style="padding: 8px;font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
						on:click={() => game.resume()}>Next Level</button
					>
					<button
						style="padding: 8px;font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
						on:click={() => {
							state = 'waiting';
							reset();
						}}>Quit</button
					>
				</div>
			{:else}
				<div class="buttons">
					{#each levels as level}
						<button
							style="padding: 8px;font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
							on:click={() => {
								if ($information.name.length) {
									game.start(level);
								}
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
	header {
		font-size: min(5vw, 2rem);
		font-family: Grandstander;
	}

	h1 {
		font-size: 4em;
		margin: 0;
		height: 1em;
	}
	h1 span {
		color: purple;
	}
	p {
		text-align: center;
		margin: 1em;
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
		gap: 0.5em;
		font-size: 1.5em;
		justify-content: center;
		align-items: center;
	}
</style>
