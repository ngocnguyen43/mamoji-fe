<script lang="ts">
	import { flip } from 'svelte/animate';
	import { queryLeaderBoard } from './api';
	import Icon from '@iconify/svelte';

	const query = queryLeaderBoard();
</script>

<div class="leaderboard">
	<table class="leaderboard-table">
		<thead>
			<tr>
				<th>Rank</th>
				<th>Player</th>
				<th>Score</th>
			</tr>
		</thead>
		<tbody>
			{#if $query.isLoading}
				<tr>
					<td>
						<span>Loading...</span>
					</td>
				</tr>
			{:else if $query.isError}
				<td>Error </td>
			{:else if $query.isSuccess}
				{@const list = $query.data}
				{#if list.length}
					{#each list as row, i (row.id)}
						<tr animate:flip>
							<td>No.{i + 1}</td>
							<td style="display: flex;align-items: center; gap: 1em; max-width: 8.5em;">
								<img src={row.avatar} alt="" srcset="" style="" class="leaderboard-avatar" />
								<span style="text-overflow: ellipsis; overflow: hidden;white-space: nowrap;"
									>{row.player}</span
								>
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
			{/if}
		</tbody>
	</table>
</div>

<style>
	@media only screen and (max-width: 1700px) {
		.leaderboard {
			display: none;
		}
	}
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
