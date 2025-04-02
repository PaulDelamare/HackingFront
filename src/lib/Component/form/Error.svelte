<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let error: undefined | string[] | Writable<any> = undefined;
	export let customClass = '';
	export let customError = '';
</script>

{#if error}
	<small class="error-input text-end px-2 {customClass}">{customError ? customError : error}*</small
	>
{/if}
