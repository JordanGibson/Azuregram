<script lang="ts">
	import { invalidate } from '$app/navigation';

	import Avatar from '$lib/Avatar.svelte';
	import type { Media, Post } from '@prisma/client';
	import type { CommentWithAuthor, UserWithAvatar } from 'prisma/types.js';
	import { PaperAirplane } from 'svelte-heros';
	import UserPost from '../../lib/UserPost.svelte';

	let comment: string = '';

	const onKeyPress = (e) => {
		if (e.charCode === 13 && comment != '') postComment();
	};

	async function postComment() {
		let commentLeft = comment;
		comment = '';
		const response = await fetch('/post/comment', {
			method: 'POST',
			body: JSON.stringify({
				comment: commentLeft,
				postId: post.id
			})
		});
		if (response.ok) {
			await invalidate('/post/' + post.id);
		}
	}

	export let post: Post & { author: UserWithAvatar; media: Media; comments: CommentWithAuthor[] };
</script>

<div class="flex p-4">
	<div class="mx-auto w-full p-4 bg-white shadow-md rounded-lg border border-gray-200 ">
		<div class="flex flex-col text-gray-500 p-6 text-center h-fit">
			<div class="row">
				<div
					class="grid grid-cols-2 shadow-md text-gray-500 border border-gray-200 p-6 text-center h-auto w-auto"
				>
					<UserPost
						classNames="w-fit m-0"
						user={post.author}
						url={post.media.url}
						caption={post.caption}
					/>
					<div>
						<div class="space-y-1 border mt-0 rounded-t" style="overflow-y: scroll;height:644px">
							{#if post.comments.length > 0}
								{#each post.comments as comment}
									<div class="border-b-2 border-double p-4">
										<Avatar user={comment.author} />
										<p class="text-gray-900 text-start mt-2">{comment.content}</p>
									</div>
								{/each}
							{:else}
								<div class="p-4">
									<p class="text-center">Be the first to comment!</p>
								</div>
							{/if}
						</div>
						<div class="flex flex-row w-full pr-0 border border-gray-200 rounded-b">
							<input
								class="w-full border-white rounded-bl"
								type="text"
								bind:value={comment}
								on:keypress={onKeyPress}
								placeholder="Add a comment"
							/>
							<span
								class="inline-flex items-center px-5 text-md text-gray-900 bg-gray-200 border rounded-br"
								on:click|preventDefault={postComment}
							>
								<svelte:component this={PaperAirplane} class="h-fit w-5" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
