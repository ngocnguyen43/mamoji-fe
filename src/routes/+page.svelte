<script lang="ts">
	import { confetti } from '@neoconfetti/svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import Game from './Game.svelte';
	import '../style.css';
	import Information from './Information.svelte';
	import { levels } from './labels';
	import Modal from './Modal.svelte';
	import { information, resetInformation } from './store';
	import { quintOut } from 'svelte/easing';
	import { tweened } from 'svelte/motion';
	import { browser } from '$app/environment';
	let state: 'waiting' | 'won' | 'paused' | 'lost' | 'playing' = 'waiting';
	let game: Game;
	let currentLevel: number;

	let score = tweened(0, { duration: 2000, easing: quintOut });

	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
</script>

<svelte:head>
	<title>Mamoji</title>
	<meta name="description" content="the emoji matching game" />

	<meta name="twitter:card" content="summary_large_image" />
	<!-- <meta property="twitter:domain" content="ematchi.vercel.app" />
	<meta property="twitter:url" content="https://ematchi.vercel.app" /> -->
	<meta name="twitter:title" content="ematchi" />
	<meta name="twitter:description" content="the emoji matching game" />
	<!-- <meta name="twitter:image" content="https://ematchi.vercel.app/og.png" /> -->
</svelte:head>
<QueryClientProvider client={queryClient}>
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
		on:win={(e) => {
			score.set(+(e.detail.remaining / 100).toFixed() + $information.score);
			$information.score += +(e.detail.remaining / 100).toFixed();
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
							style="font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
							on:click={() => game.resume()}>Resume</button
						>
						<button
							style="font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
							on:click={() => {
								state = 'waiting';
								resetInformation();
								game.refreshScore();
							}}>Quit</button
						>
					</div>
				{:else if state === 'won'}
					<div style="display: flex;align-items: center; justify-content: center; gap: 2em;">
						<img src={$information.avatar} alt="" srcset="" class="user-information-avatar" />
						<h1 style="text-transform: uppercase;">{$information.name}</h1>
					</div>
					<h1 style="text-align: center;">Score: {$information.score}</h1>
					<div class="buttons">
						<button
							style="font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
							on:click={() => {
								game.start(currentLevel, $information.difficult + 10);
								$information.difficult += 10;
							}}>Next Level</button
						>
						<button
							style="font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
							on:click={() => {
								state = 'waiting';
								resetInformation();
								game.refreshScore();
							}}>Quit</button
						>
					</div>
				{:else if state === 'lost'}
					<div class="buttons">
						<button
							style="font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
							on:click={() => {
								game.start(currentLevel, 1);
								$information.difficult = 1;
								game.refreshScore();
							}}>Play again</button
						>
						<button
							style="font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
							on:click={() => {
								state = 'waiting';
								resetInformation();
								game.refreshScore();
							}}>Quit</button
						>
					</div>
				{:else}
					<div class="buttons">
						{#each levels as level, i}
							<button
								style="font-weight: 400;font-size: 1em; background-color: purple;color: white;border-radius: 0.75rem;border: none; outline: none; cursor: pointer;"
								on:click={() => {
									if ($information.name.length) {
										currentLevel = i;
										game.start(i);
										state = 'playing';
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
</QueryClientProvider>

<style>
	header {
		font-size: min(5vw, 2rem);
		font-family: Grandstander;
	}

	h1 {
		font-size: 4em;
		margin: 0;
		height: 1em;
		text-align: center;
	}
	h1 span {
		color: purple;
	}
	p {
		text-align: center;
		margin: 1em;
		font-size: 1.25em;
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
	.user-information-avatar {
		border-radius: 50%;
		background-color: rgb(202, 202, 202);
		width: 50px;
		height: 50px;
	}
</style>
