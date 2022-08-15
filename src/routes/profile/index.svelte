<script lang="ts" context="module">
	import type { User } from '@prisma/client';
	import { responses } from '../auth/_responses';
	let user: User;
	export async function load({ session }) {
		if (!session?.user) {
			return responses[300].redirectToHome;
		}
		user = session?.user;
	}
</script>

<h1>Profile Page</h1>
<h1>{user.username}</h1>
<p>{user.firstName} {user.lastName} - {user.username}</p>
