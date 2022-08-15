<script lang="ts">
	import { goto } from '$app/navigation';

	import { Button, Navbar, NavBrand, NavHamburger, NavLi, NavUl } from 'flowbite-svelte';

	async function signIn() {
		goto('/');
	}

	async function signOut() {
		await fetch('/auth/logout');
	}

	export let isSignedIn: boolean;
</script>

<Navbar let:hidden let:toggle rounded={true} class="drop-shadow">
	<NavBrand href="/">
		<img
			src="https://flowbite.com/docs/images/logo.svg"
			class="mr-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
		<span class="self-center whitespace-nowrap text-xl font-semibold"> Azuregram </span>
	</NavBrand>
	<div class="flex md:order-2">
		{#if isSignedIn}
			<Button on:click={signOut}>Sign out</Button>
		{:else}
			<Button on:click={signIn}>Sign in</Button>
		{/if}
		<NavHamburger on:click={toggle} />
	</div>
	<NavUl {hidden} class="-mx-20 order-1">
		<NavLi href="/feed">Feed</NavLi>
		<NavLi href="/post/new">Post</NavLi>
	</NavUl>
</Navbar>
