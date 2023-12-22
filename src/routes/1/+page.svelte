<script lang="ts">
	import Icon from '@iconify/svelte'
	import type { PageData } from './$types'

	export let data: PageData

	let sortUp = true
	let sorter: keyof (typeof data.children)[0]

	const changeSort = (type: typeof sorter) => () => {
		if (type === sorter) {
			sortUp = !sortUp
		} else {
			sorter = type
			sortUp = false
		}
	}

	const sort = (children: typeof data.children) => {
		if (!sorter) return [...children]
		const sortDir = sortUp ? -1 : 1
		return [...children].sort((a, b) => {
			if (sorter === 'name') {
				return (
					(a[sorter].toLowerCase() < b[sorter].toLowerCase()
						? -1
						: a[sorter].toLowerCase() > b[sorter].toLowerCase()
							? 1
							: 0) * sortDir
				)
			}
			if (sorter === 'naughty') {
				return ((a[sorter] ? 1 : 0) - (b[sorter] ? 1 : 0)) * sortDir
			}
			return (a[sorter] - b[sorter]) * sortDir
		})
	}
</script>

<section class="border border-slate-400 rounded-md overflow-hidden">
	<table class="w-full divide-y divide-slate-400">
		<thead>
			<tr class="divide-x divide-slate-400 bg-slate-700">
				<td class="w-1/2">
					<button
						class="w-full h-full py-2 px-4 flex justify-between items-center"
						on:click={changeSort('name')}
					>
						<span> Name </span>
						{#if sorter === 'name'}
							<span>
								{#if sortUp}
									<Icon icon="mingcute:up-fill" />
								{:else}
									<Icon icon="mingcute:down-fill" />
								{/if}
							</span>
						{/if}
					</button>
				</td>
				<td class="w-1/4">
					<button
						class="w-full h-full py-2 px-4 flex justify-between items-center"
						on:click={changeSort('tally')}
					>
						<span> Tally </span>
						{#if sorter === 'tally'}
							<span>
								{#if sortUp}
									<Icon icon="mingcute:up-fill" />
								{:else}
									<Icon icon="mingcute:down-fill" />
								{/if}
							</span>
						{/if}
					</button>
				</td>
				<td class="w-1/4">
					<button
						class="w-full h-full py-2 px-4 flex justify-between items-center"
						on:click={changeSort('naughty')}
					>
						<span> Status </span>
						{#if sorter === 'naughty'}
							<span>
								{#if sortUp}
									<Icon icon="mingcute:up-fill" />
								{:else}
									<Icon icon="mingcute:down-fill" />
								{/if}
							</span>
						{/if}
					</button>
				</td>
			</tr>
		</thead>
		<tbody class="divide-y divide-slate-400">
			{#each sort(data.children) as child (child.id)}
				<tr class="divide-x divide-slate-400">
					<td class="py-2 px-4">
						{child.name}
					</td>
					<td class="py-2 px-4">
						{child.tally}
					</td>
					<td
						class="py-2 px-4"
						class:text-red-300={child.naughty}
						class:text-green-300={!child.naughty}
					>
						{child.naughty ? 'Naughty' : 'Nice'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</section>

<div class="hidden">
	<Icon icon="mingcute:up-fill" />
	<Icon icon="mingcute:down-fill" />
</div>
