<script lang="ts">
	import { faker } from '@faker-js/faker';
	import { uploadFileAsBlob as uploadAvatar } from '../azure/BlobService.js';

	import { Label } from 'flowbite-svelte';
	import { sha256 } from 'js-sha256';
	import { createEventDispatcher } from 'svelte';
	import { AtSymbol, Identification, LockClosed, Mail } from 'svelte-heros';
	import IconInput from './IconInput.svelte';

	const dispatch = createEventDispatcher();

	let firstName = '';
	let lastName = '';
	let username = '';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let error = '';
	let avatarFiles: FileList | undefined;
	let avatarUrl = faker.internet.avatar();
	$: if (avatarFiles) {
		avatarFiles
			.item(0)
			?.arrayBuffer()
			.then((response) => {
				var arrayBufferView = new Uint8Array(response);
				var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
				var urlCreator = window.URL || window.webkitURL;
				var imageUrl = urlCreator.createObjectURL(blob);
				avatarUrl = imageUrl;
			});
	}

	async function register() {
		if (password !== confirmPassword) {
			error = 'Passwords must match';
			return;
		}
		try {
			if (avatarFiles && avatarFiles.length > 0) {
				avatarUrl = await uploadAvatar(avatarFiles.item(0)!);
			}
			const res = await fetch('/auth/register', {
				method: 'POST',
				body: JSON.stringify({
					firstName,
					lastName,
					username,
					email,
					hashedPassword: sha256(password),
					avatarUrl
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			if (res.ok) {
				dispatch('success');
			} else {
				error = (await res.json()).message;
			}
		} catch {
			error = 'Failed to register. Check your internet connection';
		}
	}
</script>

<div
	class="flex flex-col bg-white shadow-md text-gray-500 rounded-lg border border-gray-200 p-6 text-center max-h-min min-w-full"
>
	<form class="flex flex-col space-y-6 min-w-max" action="/">
		<h3 class="text-xl font-medium text-gray-900 p-0">Register at Azuregram</h3>
		<div class="text-start space-y-4">
			<div class="flex flex-row space-x-6">
				<Label class="flex flex-col grow m-auto space-y-2">
					<span>First Name</span>
					<IconInput
						icon={Identification}
						bind:value={firstName}
						name="firstName"
						placeholder="Joe"
						required
					/>
				</Label>
				<Label class="flex flex-col grow m-auto space-y-2">
					<span>Last Name</span>
					<IconInput
						icon={Identification}
						bind:value={lastName}
						name="lastName"
						placeholder="Bloggs"
						required
					/>
				</Label>
			</div>
			<Label class="space-y-2">
				<span>Username</span>
				<IconInput
					icon={AtSymbol}
					bind:value={username}
					name="username"
					placeholder="thejoeman21"
					required
				/>
			</Label>
			<Label class="space-y-2">
				<span>Email</span>
				<IconInput
					icon={Mail}
					type="email"
					bind:value={email}
					name="email"
					placeholder="name@company.com"
					required
				/>
			</Label>
			<div class="flex flex-row space-x-6">
				<Label class="flex flex-col grow space-y-2">
					<span>Password</span>
					<IconInput
						icon={LockClosed}
						type="password"
						bind:value={password}
						name="password"
						placeholder="••••••••"
						required
					/>
				</Label>
				<Label class="flex flex-col grow space-y-2">
					<span>Confirm Password</span>
					<IconInput
						icon={LockClosed}
						type="password"
						bind:value={confirmPassword}
						name="confirmPassword"
						placeholder="••••••••"
						required
					/>
				</Label>
			</div>
			<Label class="space-y-2">
				<span>Avatar</span>
				<div class="flex flex-row space-x-0 border border-solid border-slate-500 rounded">
					<input
						class="bg-slate-300 w-full"
						accept="image/png, image/jpeg"
						bind:files={avatarFiles}
						id="avatar"
						name="avatar"
						type="file"
					/>
					<p />
					<img src={avatarUrl} class="p-0 h-10 w-10" alt="User Avatar" />
				</div>
			</Label>
		</div>
		{#if error}
			<div class="container mx-auto rounded p-4 bg-slate-200">{error}</div>
		{/if}
		<button
			type="submit"
			on:click|preventDefault={register}
			class="w-full h-12 px-6 text-blue-100 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-blue-800 disabled:bg-slate-400"
			>Register</button
		>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Already have an account? <button
				on:click|once|preventDefault={() => {
					dispatch('toggleLoginRegister');
				}}
				class="text-blue-700 hover:underline dark:text-blue-500"
			>
				Login
			</button>
		</div>
	</form>
</div>
