<script lang="ts" context="module">
	import { goto } from '$app/navigation';
	import Login from '$lib/LoginCard.svelte';
	import Register from '$lib/Register.svelte';
	import { responses } from './auth/_responses';

	export async function load({ session }) {
		const user = session?.user;
		if (user) {
			return responses[300].redirectToFeed;
		}
	}
</script>

<script lang="ts">
	let isRegister = true;
	function toggleLoginRegister() {
		isRegister = !isRegister;
	}

	function redirectToProfile() {
		goto('/feed');
	}
</script>

<main>
	<div class="flex h-screen p-4">
		<div class="mx-auto w-2/3 p-4">
			{#if isRegister}
				<Register on:success={redirectToProfile} on:toggleLoginRegister={toggleLoginRegister} />
			{:else}
				<Login on:success={redirectToProfile} on:toggleLoginRegister={toggleLoginRegister} />
			{/if}
		</div>
	</div>
</main>
