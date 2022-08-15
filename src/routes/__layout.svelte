<script lang="ts" context="module">
	import Header from '$lib/Header.svelte';
	import type { UserWithAvatar } from 'prisma/types';

	import '../app.css';

	let user: UserWithAvatar;
	export async function load({ session }) {
		session = session?.user;
	}
</script>

<Header isSignedIn={user === undefined} />
<div class="bg-slate-100">
	<div class="container w-3/4 bg-slate-100">
		<slot />
	</div>
</div>
