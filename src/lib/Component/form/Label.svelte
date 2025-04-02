<script lang="ts">
	export let classLabel = '';
	export let labelName: string;
</script>

<label class="flex flex-col gap-2 {classLabel}">
	<span class="px-2">{labelName}</span>
	<slot />
</label>
