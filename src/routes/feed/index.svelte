<script lang="ts">
	import { goto } from '$app/navigation';

	import UserPost from '$lib/UserPost.svelte';
	import type { Media,Post } from '@prisma/client';
	import type { CommentWithAuthor,UserWithAvatar } from 'prisma/types.js';

	export let posts: (Post & {
		author: UserWithAvatar;
		media: Media;
		comments: CommentWithAuthor[];
	})[];
</script>

<div
	class="rounded border p-3 bg-white grid grid-cols-3 gap-3 h-screen"
	style="height:913px;overflow-y:scroll;"
>
	{#each posts as post}
		<div
			class="w-full h-fit p-3 border rounded hover:cursor-pointer"
			on:click={() => goto('/post/' + post.id)}
		>
			<UserPost
				url={post.media.url}
				user={post.author}
				caption={post.caption}
				commentCount={post.comments.length}
			/>
		</div>
	{/each}
</div>
