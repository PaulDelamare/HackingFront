<script lang="ts">
	export let dataLabel: string;
	export let final = false;
</script>

<td
	data-label={dataLabel}
	class="{final
		? 'max-[850px]:border-b-0'
		: 'max-[850px]:border-b-[1px]'} text-center max-[850px]:font-semibold max-[850px]:before:content-[attr(data-label)] max-[850px]:before:float-left max-[850px]:before:font-bold max-[850px]:before:uppercase max-[850px]:before:text-[.8rem] p-[0.75rem] border-0 max-[850px]:border-b-[#ddd] max-[850px]:block max-[850px]:text-[1rem] max-[850px]:text-right"
	><slot /></td
>
