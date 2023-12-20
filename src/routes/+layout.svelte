<script lang="ts">
	import { page } from '$app/stores'
	import '../app.css'

	const days = 25
	const groupBy = 5
	let openedGroup = -1
	let showDropdown = false

	const clickOutside = (node) => {
		const handleClick = (event) => {
			if (node && !node.contains(event.target) && !event.defaultPrevented) {
				node.dispatchEvent(new CustomEvent('clickOutside', node))
			}
		}

		document.addEventListener('click', handleClick, true)

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true)
			}
		}
	}
</script>

<nav
	class="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600"
>
	<div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
		<a href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
			<img
				src="https://svelte.dev/_app/immutable/assets/svelte-logo.5c5d7d20.svg"
				class="h-8 w-6 overflow-hidden object-cover object-left"
				alt="Svelte Logo"
			/>
			<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
				<span class="hidden sm:inline">Svelte</span>
				Advent
			</span>
		</a>
		<div class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
			<a
				href={typeof parseInt($page.url.pathname.substring(1)) === 'number' &&
				parseInt($page.url.pathname.substring(1)) < 25
					? (parseInt($page.url.pathname.substring(1)) + 1).toString()
					: 'first'}
				class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
			>
				Next
				<span class="hidden sm:inline">Advent</span>
			</a>
			<button
				data-collapse-toggle="navbar-sticky"
				type="button"
				class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
				aria-controls="navbar-sticky"
				aria-expanded="false"
			>
				<span class="sr-only"> Open main menu </span>
				<svg
					class="w-5 h-5"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 17 14"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 1h15M1 7h15M1 13h15"
					/>
				</svg>
			</button>
		</div>
		<div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
			<ul
				class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
			>
				<li use:clickOutside on:clickOutside={() => (showDropdown = false)}>
					<button
						data-dropdown-toggle="dropdownNavbar"
						class="flex items-center justify-between w-full py-2 px-3 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
						on:click={() => (showDropdown = !showDropdown)}
					>
						Select a Day
						<svg
							class="w-2.5 h-2.5 ms-2.5"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6"
						>
							<path
								stroke="currentColor"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="m1 1 4 4 4-4"
							/>
						</svg></button
					>
					<!-- Dropdown menu -->
					<div
						class="z-10 absolute mt-2 left-1/2 -translate-x-1/2 font-normal overflow-hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
						class:hidden={!showDropdown}
					>
						<div class="py-1">
							<a
								href="/first"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
							>
								First Day
							</a>
						</div>
						<ul
							class="py-2 text-sm text-gray-700 dark:text-gray-200"
							aria-labelledby="dropdownLargeButton"
						>
							{#each new Array(days / groupBy).fill(0) as _, group (group)}
								<li aria-labelledby="dropdownNavbarLink">
									<button
										data-dropdown-toggle="doubleDropdown"
										data-dropdown-placement="right-start"
										type="button"
										class="flex overflow-hidden items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
										on:click={() => (openedGroup = openedGroup === group ? -1 : group)}
									>
										Days {group * groupBy + 1} - {(group + 1) * groupBy}
										<svg
											class="w-2.5 h-2.5 ms-2.5"
											aria-hidden="true"
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 10 6"
										>
											<path
												stroke="currentColor"
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="m1 1 4 4 4-4"
											/>
										</svg>
									</button>
									<div
										class="overflow-hidden transition-all duration-500"
										class:max-h-96={openedGroup === group}
										class:max-h-0={openedGroup !== group}
									>
										<ul
											class="py-2 text-sm bg-slate-800 text-gray-700 dark:text-gray-200"
											aria-labelledby="doubleDropdownButton"
										>
											{#each new Array(days / groupBy).fill(0) as _, index (index)}
												<li>
													<a
														href="/{group * groupBy + index + 1}"
														class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
													>
														{group * groupBy + index + 1}
													</a>
												</li>
											{/each}
										</ul>
									</div>
								</li>
							{/each}
						</ul>
						<div class="py-1">
							<a
								href="/last"
								class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
							>
								Last Day
							</a>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</nav>

<div class="h-screen bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 antialiased">
	<div class="container mx-auto py-28">
		<slot />
	</div>
</div>
