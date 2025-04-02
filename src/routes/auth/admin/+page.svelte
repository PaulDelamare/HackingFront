<script lang="ts">
	import Td from '$lib/Component/form/Td.svelte';
	import {
		getModalStore,
		getToastStore,
		Paginator,
		type PaginationSettings
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';

	export let data: PageData;

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	let users = data.users;
	const userMe = data.user;

	let searchText = '';
	let paginationSettings = {
		page: 0,
		limit: 5,
		size: users.length,
		amounts: [1, 2, 5, 10]
	} satisfies PaginationSettings;

	$: filteredSource = users.filter((user) =>
		user.email.toLowerCase().includes(searchText.toLowerCase())
	);

	$: paginatedSource = filteredSource.slice(
		paginationSettings.page * paginationSettings.limit,
		paginationSettings.page * paginationSettings.limit + paginationSettings.limit
	);
</script>

<section class="p-4">
	<div class="wrap flex flex-col gap-4">
		<div class="w-full flex flex-col gap-4">
			<h2 class="text-center leading-tight uppercase">Utilisateurs</h2>
			<div class="search-bar w-full max-w-[300px] mx-auto">
				<input
					class="input"
					type="text"
					bind:value={searchText}
					placeholder="Rechercher un utilisateur..."
					on:input={() => {
						paginationSettings.page = 0;
					}}
				/>
			</div>
			<div class=" flex justify-end">
				<a class="btn variant-ghost-primary text-primary-500" href="/auth/users/add">+ Ajouter</a>
			</div>
			<div class="overflow-x-auto">
				<table
					class="table w-full border-collapse card !ring-0 max-[850px]:overflow-hidden max-[850px]:!bg-transparent"
				>
					<thead
						class="max-[850px]:border-none max-[850px]:h-[1px] max-[850px]:m-[-1px] max-[850px]:hidden max-[850px]:absolute max-[850px]:w-[1px]"
					>
						<tr>
							<th class="table-th py-[1rem] px-[0.75rem] text-center">Email</th>
							{#if userMe.role.role_name === 'admin'}
								<th class="table-th py-[1rem] px-[0.75rem] text-center">Supprimer</th>
							{/if}
						</tr>
					</thead>
					<tbody class="table-body">
						{#each paginatedSource as user, index (user.id)}
							<tr
								class="max-[850px]:block max-[850px]:mb-8 max-[850px]:rounded-[10px] {index % 2 ===
								0
									? 'max-[850px]:bg-[rgb(var(--color-primary-500)/.1)]'
									: 'max-[850px]:bg-[rgb(var(--color-surface-500)/0.05)]'}"
							>
								<Td dataLabel="Email">
									{user.email}
								</Td>
								{#if userMe === 'adminr' && user.role.role_name !== 'admin'}
									<td
										data-label="Supprimer"
										class="text-center max-[850px]:font-semibold max-[850px]:border-b-0 max-[850px]:before:content-[attr(data-label)] max-[850px]:before:float-left max-[850px]:before:font-bold max-[850px]:before:uppercase max-[850px]:before:text-[.8rem] p-[0.75rem] border-0 max-[850px]:border-b-[#ddd] max-[850px]:block max-[850px]:text-[1rem] max-[850px]:text-right"
									>
										<!-- <form
											action="?/deleteUser"
											on:submit={async (event) => {
												await confirmDelete(
													event,
													modalStore,
													toastStore,
													user.name,
													'Voulez vous vraiment supprimer cet utilisateur ?'
												);

												invalidateAll().then(() => {
													paginationSettings.page = 0;
													users = data.users;
												});
											}}
											method="POST"
										>
											<input name="id" type="hidden" value={user.id} />
											<button type="submit" class="btn variant-filled-error font-semibold"
												>Supprimer</button
											>
										</form> -->
									</td>
								{/if}
							</tr>
						{/each}
					</tbody>
					<tfoot class="">
						<tr>
							<td class="text-center max-[850px]:hidden">Total</td>
							<td class="p-[0.75rem] border-0 max-[850px]:hidden" />
							<td
								class="text-center footer-left p-[0.75rem] border-0 pl-[1rem] max-[850px]:flex max-[850px]:justify-between max-[850px]:rounded-[10px]"
								><p class="max-[850px]:inline hidden">Total</p>
								<span class="code text-[0.8rem] py-[0.1rem] px-[0.3rem] rounded-[4px]"
									>{paginationSettings.size} Utilisateurs</span
								></td
							>
							<td class="p-[0.75rem] border-0 max-[850px]:hidden" />
							<td class="p-[0.75rem] border-0 max-[850px]:hidden" />
						</tr>
					</tfoot>
				</table>
			</div>

			<div class="pagination px-4">
				<Paginator
					bind:settings={paginationSettings}
					showFirstLastButtons={false}
					showPreviousNextButtons={true}
					controlVariant={'customPagination'}
				/>
			</div>
		</div>
	</div>
</section>
