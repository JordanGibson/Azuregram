<script lang="ts">
	import type { UserWithAvatar } from 'prisma/types';

	export let user: UserWithAvatar;
</script>

<div class="flex flex-row">
	<img
		src={user.avatar.url}
		alt="my avatar"
		class="object-cover object-center w-10 h-10 visible rounded-full border border-gray-200"
	/>
	<p class="my-auto mx-2 text-slate-700 font-semibold">{user.username}</p>
</div>
