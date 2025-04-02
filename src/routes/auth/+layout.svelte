<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	const user = data.user;
</script>

<div class="flex min-h-svh flex-col">
	<header class="w-full flex items-center justify-between px-12 py-8 shadow-lg">
		<h1 class="text-3xl"><a href="/auth">Super Site</a></h1>
		<nav>
			<ul class="flex items-center gap-4">
				{#if user.role.role_name === 'admin'}
					<li class=""><a href="/auth/admin">Admin</a></li>
				{/if}
				<li>
					<form method="post" action="/?/logout"><button class="btn">Déconnexion</button></form>
				</li>
			</ul>
		</nav>
	</header>
	<section class="flex-1 flex-row px-16 py-4 max-xl:px-4">
		<div class="w-full h-full">
			<slot />
		</div>
	</section>
</div>
