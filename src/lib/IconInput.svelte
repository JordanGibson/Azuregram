<script lang="ts">
	import type { SvelteComponent } from 'svelte';

	export let value: string = '';
	export let icon: typeof SvelteComponent;
	export let type: string = 'text';
	export let spanClass: string =
		'inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600';
	export let iconClass: string = 'h-4 w-4 mr-2';
	export let iconSize: number = 18;

	function typeAction(input) {
		input.type = type;
	}
</script>

<div class="flex">
	<span class={spanClass}>
		<svelte:component this={icon} size={iconSize} class={iconClass} />
	</span>
	<input
		{...$$restProps}
		use:typeAction
		bind:value
		class="rounded-none rounded-r-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:focus:border-blue-500"
	/>
</div>
