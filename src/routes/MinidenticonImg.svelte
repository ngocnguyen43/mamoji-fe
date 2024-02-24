<script lang="ts">
	import { onMount } from 'svelte';
	import { v4 as uuidv4 } from 'uuid';

	import { information } from './store';
	import { imgURI } from './utils';

	let svgURI: string;
	svgURI = imgURI(uuidv4());

	$information.avatar = svgURI;
	onMount(() => {});
</script>

<img src={svgURI} alt="" srcset="" class="avatar" />
