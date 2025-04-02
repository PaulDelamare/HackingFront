<script lang="ts" generics="T">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	import { onMount } from 'svelte';
	import Error from './Error.svelte';
	export let type: HTMLInputTypeAttribute = 'text';
	export let name: string;
	export let placeholder = '';
	export let value = '';
	export let error: undefined | string[] = undefined;
	export let constraints: T = {} as T;
	export let classInput = '';
	export let ringColor = '!ring-secondary-500';

	let inputElement: HTMLInputElement;

	onMount(() => {
		if (inputElement) {
			inputElement.type = type;
		}
	});
</script>

<div class="flex flex-col gap-1 w-full">
	<div
		class="input !bg-transparent {classInput} !ring-2 {!error
			? ringColor
			: '!ring-error-500'} flex px-2"
	>
		<slot name="icon" />
		<input
			bind:this={inputElement}
			class="input-custom"
			bind:value
			{placeholder}
			{name}
			{...constraints}
		/>
	</div>
	<Error {error} />
</div>

<style>
	input:-webkit-autofill,
	input:-webkit-autofill:hover,
	input:-webkit-autofill:focus,
	input:-webkit-autofill:active {
		-webkit-background-clip: text;
		-webkit-text-fill-color: #ffffff;
		transition: background-color 5000s ease-in-out 0s;
		box-shadow: inset 0 0 20px 20px #23232329;
	}
</style>
