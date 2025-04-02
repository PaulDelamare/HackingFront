<script lang="ts">
	import Input from '$lib/Component/form/Input.svelte';
	import Submit from '$lib/Component/form/Submit.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import Error from '$lib/Component/form/Error.svelte';
	import PictoPassword from '$lib/Component/picto/PictoPassword.svelte';
	import PictoEmail from '$lib/Component/picto/PictoEmail.svelte';

	export let data: PageData;

	const { form, errors, enhance, message } = superForm(data.form, {
		taintedMessage:
			'Êtes vous sur de vouloir quitter cette page ? Les données ne seront pas sauvegardées'
	});
</script>

<section class="container h-screen mx-auto flex justify-center items-center">
	<form action="?/login" method="post" use:enhance class="flex flex-col gap-16 w-[600px]">
		<div class="">
			<h2 class="text-5xl text-center uppercase">Connexion</h2>
		</div>
		<div class="flex flex-col gap-8">
			<div class="flex flex-col gap-8">
				<Input
					placeholder="Email"
					error={$errors.email}
					bind:value={$form.email}
					name="email"
					type="email"
				>
					<div slot="icon" class="p-2 py-3">
						<PictoEmail classSvg="{!$errors.email ? 'fill-secondary-500' : 'fill-error-500'} w-6" />
					</div>
				</Input>
				<Input
					placeholder="Mot de passe"
					error={$errors.password}
					bind:value={$form.password}
					name="password"
					type="password"
				>
					<div slot="icon" class="p-2 py-3">
						<PictoPassword
							classSvg="fill-none  {!$errors.password
								? 'stroke-secondary-500'
								: 'stroke-error-500'} stroke-[7px] w-5"
						/>
					</div>
				</Input>
			</div>

			<Submit>Connexion</Submit>
			<Error error={$message} />
			<div class="inline-block text-center px-2">
				<a class="underline" href="/register"><small>Pas encore de compte ? </small></a>
			</div>
		</div>
	</form>
</section>
