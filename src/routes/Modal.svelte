<script></script>

<div class="modal-background">
	<div>
		<slot />
	</div>
</div>

<style>
	.modal-background {
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
		width: 100vw;
		height: 100vh;
		backdrop-filter: blur(10px);
	}
</style>
