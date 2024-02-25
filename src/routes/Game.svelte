<script lang="ts">
	import { createEventDispatcher, onMount, beforeUpdate } from 'svelte';

	import Countdown from './Countdown.svelte';
	import Found from './Found.svelte';
	import Grid from './Grid.svelte';
	import { levels, type Level } from './labels';
	import { information } from './store';
	import { shuffle } from './utils';

	import { tweened } from 'svelte/motion';
	import { quintOut } from 'svelte/easing';
	import { derived } from 'svelte/store';
	import { mutatePlayer, queryLeaderBoard } from './api';

	let score = tweened(0, { duration: 2000, easing: quintOut });

	let formattedScore = derived(score, ($myNumber) => $myNumber.toFixed());

	const dispatch = createEventDispatcher();
	let remaining: number;
	let duration: number;
	let playing: boolean;

	let size: number = 6;
	let grid: string[] = create_grid(levels[1]);
	let found: string[] = [];

	export function refreshScore() {
		score.set(0, { duration: 0 });
	}
	const mutate = mutatePlayer();
	const query = queryLeaderBoard();

	export function start(state: number, difficult: number = 0) {
		const level = levels[state];
		size = level.size;
		grid = create_grid(level);
		found = [];
		remaining = duration = level.duration - (level.duration * difficult) / 100;

		resume();
	}
	export function resume() {
		playing = true;
		countdown();
		dispatch('play');
	}
	function create_grid(level: Level) {
		const copy = level.emojis.slice();
		const pairs: string[] = [];
		for (let i = 0; i < level.size ** 2 / 2; i += 1) {
			const index = Math.floor(Math.random() * copy.length);
			const emoji = copy[index];

			copy.slice(index, 1);
			pairs.push(emoji);
		}
		pairs.push(...pairs);
		return shuffle(pairs);
	}
	function countdown() {
		const start = Date.now();
		let remaining_at_start = remaining;

		function loop() {
			if (!playing) return;
			requestAnimationFrame(loop);
			remaining = remaining_at_start - (Date.now() - start);
			if (remaining <= 0) {
				dispatch('lost');
				$mutate.mutate(
					{
						player: $information.name,
						score: $information.score,
						avatar: $information.avatar,
						id: $information.id
					},
					{
						onSuccess: () => {
							$query.refetch();
						}
					}
				);
				playing = false;
			}
		}
		loop();
	}
	onMount(countdown);
	beforeUpdate(() => {
		score.set($information.score);
	});
</script>

<div class="game" style="--size:{size}">
	<div class="info" style="position: relative;">
		{#key grid}
			<div
				style="display: flex;align-items: center; justify-content: center; position: absolute; top: -7em;left: 50%;transform: translateX(-50%); gap: 2em;"
				class:information-box={!playing}
				id="user-box"
			>
				<img src={$information.avatar} alt="" srcset="" class="user-information-avatar" />
				<h1 style="text-transform: uppercase;">{$information.name}</h1>
				<h1>Score: {$formattedScore}</h1>
			</div>
		{/key}
		{#if playing}
			<Countdown
				{remaining}
				{duration}
				on:click={() => {
					playing = false;
					dispatch('pause');
				}}
			/>
		{/if}
	</div>
	<div class="grid-container">
		{#key grid}
			<Grid
				{grid}
				on:found={(e) => {
					found = [...found, e.detail.emoji];
					score.set(e.detail.score + $information.score);
					if (found.length === (size * size) / 2) {
						playing = false;
						setTimeout(() => {
							playing = false;
							dispatch('win', {
								remaining
							});
							$mutate.mutate(
								{
									player: $information.name,
									score: $information.score,
									avatar: $information.avatar,
									id: $information.id
								},
								{
									onSuccess: () => {
										$query.refetch();
									}
								}
							);
						}, 500);
					}
				}}
				{found}
			/>
		{/key}
	</div>
	<div class="info">
		<Found {found} />
	</div>
</div>

<style>
	.game {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		font-size: min(1vmin, 0.5em);
	}
	.info {
		width: 80em;
		height: 10em;
	}
	.grid-container {
		width: 80em;
		height: 80em;
	}
	.user-information-avatar {
		border-radius: 50%;
		background-color: rgb(202, 202, 202);
		width: 50px;
		height: 50px;
	}
	.information-box {
		visibility: hidden;
	}
</style>
