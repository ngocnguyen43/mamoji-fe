<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';
	import MinidenticonImg from './MinidenticonImg.svelte';
	import { information } from './store';
	let random: string;
	function handleOnClick() {
		random = uuidv4().toString();
	}
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
	}
	.btn-reload {
		border: none;
		outline: none;
	}
	.btn-reload:hover {
		cursor: pointer;
	}
</style>
