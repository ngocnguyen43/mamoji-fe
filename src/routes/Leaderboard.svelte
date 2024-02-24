<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import Icon from '@iconify/svelte';
	onMount(() => {
		async function createList() {
			const a = await fetch('https://namey.muffinlabs.com/name.json?count=10');
			const names = await a.json();

			const list = [];
			for (let i = 0; i < names.length; i++)
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

	// async function shuffle() {
	// 	list = [...list.sort(() => (Math.random() > 0.5 ? -1 : 1))];
	// }
	let list: any[] = [];
</script>

<div class="leaderboard">
	<table class="leaderboard-table">
		<tr>
			<th>Rank</th>
			<th>Player</th>
			<th>Score</th>
		</tr>
		{#if list.length}
			{#each list as row, i (row.rank)}
				<tr animate:flip>
					<td>No.{i + 1}</td>
					<td style="display: flex;align-items: center; gap: 1em; max-width: 8.5em;">
						<img
							src={'data:image/svg+xml;utf8,%3Csvg%20viewBox%3D%22-1.5%20-1.5%208%208%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22hsl(240%2095%25%2045%25)%22%3E%3Crect%20x%3D%220%22%20y%3D%220%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%221%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%223%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%220%22%20y%3D%224%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%221%22%20y%3D%220%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%221%22%20y%3D%224%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%221%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%222%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%222%22%20y%3D%223%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%220%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%221%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%223%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%224%22%20y%3D%224%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%223%22%20y%3D%220%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3Crect%20x%3D%223%22%20y%3D%224%22%20width%3D%221%22%20height%3D%221%22%2F%3E%3C%2Fsvg%3E'}
							alt=""
							srcset=""
							style=""
							class="leaderboard-avatar"
						/>
						<span style="text-overflow: ellipsis;overflow: hidden;">{row.name}</span>
					</td>
					<td
						>{row.score}
						{#if i === 0}
							<Icon icon="emojione:crown" />
						{/if}
					</td>
				</tr>
			{/each}
		{:else}
			<tr>
				<td>-</td>
				<td>-</td>
				<td>-</td>
			</tr>
		{/if}
	</table>
</div>

<style>
	.leaderboard {
		position: fixed;

		right: 5em;
		top: 5.5em;
		/* top: 50%;
		transform: translateY(-50%); */
	}
	.leaderboard-table {
		/* border-collapse: separate; */
		border-spacing: 1em 0.5em;
		table-layout: fixed;
		color: #141a39;
		cursor: default;
		font-size: 1.5em;
		gap: 1em;
	}
	.leaderboard-avatar {
		height: 50px;
		width: 50px;
		border-radius: 50%;
		background-color: rgb(202, 202, 202);
		filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.2));
	}
</style>
