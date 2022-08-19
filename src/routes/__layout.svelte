<script lang="ts" context="module">
	import Header from '$lib/Header.svelte';

	import '../app.css';
</script>

<Header />
<div class="bg-slate-100">
	<div class="container w-3/4 bg-slate-100">
		<slot />
	</div>
</div>
