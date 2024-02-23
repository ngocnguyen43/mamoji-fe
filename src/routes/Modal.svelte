<script lang="ts">
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import Leaderboard from './Leaderboard.svelte';
</script>

<div class="modal-background" transition:fade={{ duration: 200 }}>
	<div class="modal" transition:scale={{ start: 0.9, duration: 400, easing: cubicOut }}>
		<slot />
	</div>
	<!-- <Leaderboard /> -->
</div>

<style>
	.modal-background {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		width: 100vw;
		height: 100vh;
		backdrop-filter: blur(5px);
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.2s;
	}
</style>
