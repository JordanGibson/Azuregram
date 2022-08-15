<script lang="ts">
	import Avatar from '$lib/Avatar.svelte';
	import type { UserWithAvatar } from 'prisma/types';

	export let user: UserWithAvatar;
	export let url: string;
	export let caption: string;
	export let classNames: string = '';
	export let commentCount: number = -1;
</script>

<div class={classNames}>
	<Avatar {user} />
	{#if url}
		<img class="object-cover my-3" width="580px" src={url} alt="User post" />
	{/if}
	{#if caption || commentCount != -1}
		<span class="flex flex-row justify-between">
			{#if caption}
				<p class="text-gray-900 overflow-clip text-ellipsis whitespace-nowrap">
					<b>{user.username}</b>
					{caption}
				</p>
			{/if}
			{#if commentCount != -1}
				<p class="text-end text-sm text-slate-700 m-0.5 text-ellipsis whitespace-nowrap">
					{commentCount} comments
				</p>
			{/if}
		</span>
	{/if}
</div>
