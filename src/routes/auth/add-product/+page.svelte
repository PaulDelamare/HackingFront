<script lang="ts">
	import Input from '$lib/Component/form/Input.svelte';
	import Submit from '$lib/Component/form/Submit.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import Error from '$lib/Component/form/Error.svelte';
	import PictoPassword from '$lib/Component/picto/PictoPassword.svelte';
	import PictoEmail from '$lib/Component/picto/PictoEmail.svelte';
	import { goto } from '$app/navigation';
	import { getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;

	const toastStore = getToastStore();

	const { form, errors, enhance, message } = superForm(data.form, {
		taintedMessage:
			'Êtes vous sur de vouloir quitter cette page ? Les données ne seront pas sauvegardées'
	});

	$: if ($message) {
		if ($message.success) {
			let t: ToastSettings = {
				message: ' Produit créé avec succès',
				background: 'bg-success-500'
			};
			toastStore.trigger(t);
			goto('/auth');
		}
	}
</script>

<section class="pt-12 mx-auto flex justify-center items-center">
	<form action="?/addProduct" method="post" use:enhance class="flex flex-col gap-16 w-[600px]">
		<div class="">
			<h2 class="text-5xl text-center uppercase">Créer un produit</h2>
		</div>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-8">
				<Input
					placeholder="Titre"
					error={$errors.title}
					bind:value={$form.title}
					name="title"
					type="text"
				></Input>

				<Input
					placeholder="Description"
					error={$errors.description}
					bind:value={$form.description}
					name="description"
					type="text"
				></Input>
			</div>

			<Submit>Créer</Submit>
			<Error error={$message} />
		</div>
	</form>
</section>
