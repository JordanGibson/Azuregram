<script lang="ts">
	import { Navbar, NavBrand, NavLi, NavUl } from 'flowbite-svelte';
	import { Camera } from 'svelte-heros';
</script>

<Navbar let:hidden rounded={true} class="drop-shadow">
	<NavBrand href="/" class="space-x-2">
		<Camera />
		<span class="self-center whitespace-nowrap text-xl font-semibold"> Azuregram </span>
	</NavBrand>
	<NavUl {hidden} class="order-1">
		<NavLi href="/feed">Feed</NavLi>
		<NavLi href="/post/new">Post</NavLi>
	</NavUl>
</Navbar>
