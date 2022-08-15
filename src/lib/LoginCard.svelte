<script lang="ts">
	import { Label } from 'flowbite-svelte';
	import { sha256 } from 'js-sha256';
	import { createEventDispatcher } from 'svelte';
	import { LockClosed, Mail } from 'svelte-heros';
	import IconInput from './IconInput.svelte';

	const dispatch = createEventDispatcher();

	let email = '';
	let password = '';
	let error = '';

	async function login() {
		try {
			const res = await fetch('/auth/login', {
				method: 'POST',
				body: JSON.stringify({
					email,
					hashedPassword: sha256(password)
				}),
				headers: {
					'Content-Type': 'application/json'
				}
			});
			console.log(res);
			if (res.ok) {
				dispatch('success');
			} else {
				error = (await res.json()).message;
			}
		} catch {
			error = 'Failed to login. Check your internet connection';
		}
	}
</script>

<div
	class="flex flex-col bg-white shadow-md text-gray-500 rounded-lg border border-gray-200 p-6 text-center max-h-min min-w-full"
>
	<form class="flex flex-col space-y-6" action="/">
		<h3 class="text-xl font-medium text-gray-900 p-0">Sign in to Azuregram</h3>
		<div class="text-start space-y-4">
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
			<Label class="space-y-2">
				<span>Your password</span>
				<IconInput
					icon={LockClosed}
					type="password"
					bind:value={password}
					name="password"
					placeholder="•••••"
					required
				/>
			</Label>
		</div>
		{#if error}
			<div class="container mx-auto rounded p-4 bg-slate-200">{error}</div>
		{/if}
		<button
			type="submit"
			on:click|preventDefault={login}
			class="w-full h-12 px-6 text-blue-100 transition-colors duration-150 bg-blue-700 rounded-lg focus:shadow-outline hover:bg-blue-800"
			>Login to your account</button
		>
		<div class="text-sm font-medium text-gray-500 dark:text-gray-300">
			Not registered? <button
				on:click|preventDefault={() => dispatch('toggleLoginRegister')}
				class="text-blue-700 hover:underline dark:text-blue-500"
			>
				Create account
			</button>
		</div>
	</form>
</div>
