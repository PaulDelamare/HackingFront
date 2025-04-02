<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import type { PageData } from './$types';
	import { invalidateAll } from '$app/navigation';

	export let data: PageData;

	let products = data.products;
	console.log(products);
	const user = data.user;

	const { errors, enhance, message } = superForm(data.form, {
		taintedMessage:
			'Êtes vous sur de vouloir quitter cette page ? Les données ne seront pas sauvegardées'
	});

	$: if ($message) {
		if ($message.success) {
			invalidateAll().then(() => {
				products = data.products;
			});
		}
	}
</script>

<div class="w-full wrap flex flex-col gap-4">
	<div class="w-full flex justify-end">
		<a href="/auth/add-product" class="btn variant-filled-primary">Ajouter</a>
	</div>
	<ul class="flex flex-col gap-8">
		{#each products as product}
			<li class="card p-4">
				<div class="flex flex-col gap-4">
					<div class="flex justify-between items-center">
						<h3 class="text-2xl">{product.title}</h3>
						{#if user.role.role_name === 'admin' || user.id === product.user.id}
							<form use:enhance method="post" action="?/deleteProduct">
								<input type="hidden" name="id_product" value={product.id} />
								<button class="btn variant-filled-error"> Supprimer </button>
							</form>
						{/if}
					</div>
					<div class="flex justify-between">
						<p>{product.description}</p>
						<span>Créateur {product.user.email}</span>
					</div>
				</div>
			</li>
		{/each}
	</ul>
</div>
