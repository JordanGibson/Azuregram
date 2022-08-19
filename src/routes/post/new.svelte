<script lang="ts" context="module">
	import IconInput from '$lib/IconInput.svelte';
	import { Label } from 'flowbite-svelte';
	import type { UserWithAvatar } from 'prisma/types';
	import { Chat } from 'svelte-heros';
	import { uploadFileAsBlob } from '../../azure/BlobService';
	import { responses } from '../auth/_responses';

	let user: UserWithAvatar;

	export function load({ session }) {
		if (!session?.user) {
			return responses[300].redirectToHome;
		}
		user = session.user;
	}
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import UserPost from '../../lib/UserPost.svelte';

	let files: FileList | undefined;
	let url: string =
		'https://placehold.jp/3d4070/ffffff/400x400.png?text=Upload%20image%20for%20preview';
	let caption: string = '';
	$: if (files) {
		files
			.item(0)
			?.arrayBuffer()
			.then((response) => {
				var arrayBufferView = new Uint8Array(response);
				var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
				var urlCreator = window.URL || window.webkitURL;
				var imageUrl = urlCreator.createObjectURL(blob);
				url = imageUrl;
			});
	}

	$: createPostButtonEnabled = files && files.length > 0;

	async function upload() {
		if (files && files.length > 0) {
			createPostButtonEnabled = false;
			url = await uploadFileAsBlob(files.item(0)!);
			const response = await fetch('/post/create', {
				method: 'POST',
				body: JSON.stringify({
					url,
					caption
				})
			});
			if (response.ok) {
				goto('/post/' + (await response.json()).id);
			}
		}
	}
</script>

<div class="flex h-screen p-4">
	<div class="mx-auto w-full p-4">
		<div class="grid grid-cols-2 gap-4">
			<div
				class="flex flex-col bg-white shadow-md text-gray-500 rounded-lg border border-gray-200 p-6 text-center h-fit"
			>
				<form class="flex flex-col space-y-6 max-h-fit" action="/">
					<h3 class="text-xl font-medium text-gray-900 p-0">New Post</h3>
					<div class="text-start space-y-4">
						<Label class="space-y-2">
							<span>Caption</span>
							<IconInput
								icon={Chat}
								type="text"
								name="caption"
								bind:value={caption}
								placeholder="Something really inspiring..."
								required
							/>
						</Label>
					</div>
					<input
						class="bg-slate-300 rounded-full"
						accept="image/png, image/jpeg, image/webp"
						bind:files
						id="avatar"
						name="avatar"
						type="file"
					/>
					<button
						class="text-white bg-blue-700 hover:bg-blue-800 disabled:bg-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
						on:click={upload}
						disabled={!createPostButtonEnabled}
					>
						Create Post
					</button>
				</form>
			</div>
			<div
				class="flex flex-col bg-white shadow-md text-gray-500 rounded-lg border border-gray-200 p-6 text-center"
			>
				<form class="flex flex-col space-y-6 min-w-max" action="/">
					<h3 class="text-xl font-medium text-gray-900 p-0">Preview</h3>
					<div
						class="flex flex-col shadow-md text-gray-500 border border-gray-200 p-6 text-center space-y-6 h-auto w-auto"
					>
						<UserPost {user} {url} {caption} />
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
