<script lang="ts">
	import ProductCard from '$lib/productCard.svelte';
	import { get } from 'svelte/store';
	import { cartItems } from '../cart';
	const products: Product[] = [
		{
			id: 'price_1N5IPvEzEyOH2hcOU7rZ5y1D',
			name: 'coffee',
			price: 5
		},
		{
			id: 'price_1N5IOWEzEyOH2hcOm1dYugtt',
			name: 'Sunglasses',
			price: 10
		},
		{
			id: 'price_1N5IQOEzEyOH2hcO4WZrZLDN',
			name: 'Water Bottle',
			price: 5
		}
	];
	async function checkout() {
		await fetch('api/stripeCheckout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ items: get(cartItems) })
		})
			.then((data) => {
				return data.json();
			})
			.then((data) => {
				data.url;
				window.location.replace(data.url);
			});
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="grid grid-cols-3 gap-4">
		<div class="col-span-3">
			<h1>Sveltekit 1.0 store</h1>
		</div>
		{#each products as product}
			<ProductCard {product} />
		{/each}
		<div class="col-span-3">
			<button class="btn variant-filled-primary" on:click={() => checkout()}
				>checkout with Stripe API</button
			>
		</div>
	</div>
</div>
