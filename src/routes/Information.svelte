<script lang="ts">
	import MinidenticonImg from './MinidenticonImg.svelte';
	import { information } from './store';
</script>

<label class="information">
	<MinidenticonImg />
	<input
		type="text"
		bind:value={$information.name}
		spellcheck="false"
		placeholder="Enter your name"
	/>
</label>

<style>
	.information {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 1em;
	}
	input {
		font-family: Grandstander;
		outline: none;
		border: none;
		font-size: 1.25em;
		padding: 0.5em;
		border-radius: 8px;
		background-color: rgb(202, 202, 202);
		filter: drop-shadow(0.2em 0.2em 0.5em rgba(0, 0, 0, 0.2));
	}
</style>
