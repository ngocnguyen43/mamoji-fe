<script lang="ts">
	import { flip } from 'svelte/animate';
	import { onMount } from 'svelte';

	onMount(() => {
		async function createList() {
			var a = await fetch('https://namey.muffinlabs.com/name.json?count=10');
			var names = await a.json();

			var list = [];
			for (var i = 0; i < names.length; i++)
				list.push({
					order: i,
					rank: i + 1,
					name: names[i],
					score: Math.round(Math.random() * 200)
				});
			return list;
		}

		createList().then((l) => (list = l));
	});

	async function shuffle() {
		list = [...list.sort(() => (Math.random() > 0.5 ? -1 : 1))];
	}
	var list: any[] = [];
</script>

<div class="leaderboard">
	<button on:click={shuffle}>Shuffle</button>

	<table>
		<tr>
			<th>#</th>
			<th>Name</th>
			<th>Score</th>
		</tr>
		{#each list as row (row.rank)}
			<tr animate:flip>
				<td>{row.rank}</td>
				<td>{row.name}</td>
				<td>{row.score}</td>
			</tr>
		{/each}
	</table>
</div>

<style>
	.leaderboard {
		position: fixed;
		width: 100vw;
		height: 100vh;
		right: 0;
	}
</style>
