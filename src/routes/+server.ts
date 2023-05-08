import type { RequestHandler } from './$types';
import Stripe from 'stripe';

const SECRET_STRIPE_KEY =
	'sk_test_51MEq4SEzEyOH2hcO76r2Xo3vGRtnUUmZ9mAQrCMmN3tLrDunrmqG1xjdqbzMi6vQzDssz6AS0nuu5g8VWO1MKa7N00l0lidzM9';
const stripe = new Stripe(SECRET_STRIPE_KEY, {
	apiVersion: '2022-11-15'
});
// http://localhost:5173/api/stripeCheckout

// POST /stripeCheckout data: items
// return -> url created by Stripe for out user to use
export const POST: RequestHandler = async ({ request }) => {
	// items: [{id: "1", quantity: 6}], {id:'2', quantity: 3}]
	const data = await request.json();
	const items = data.items;

	let lineItems: any = [];
	items.forEach((item: any) => {
		lineItems.push({ price: item.id, quantity: item.quantity });
	});
	const sesstion = await stripe.checkout.sessions.create({
		line_items: lineItems,
		mode: 'payment',
		success_url: 'http://localhost:5173/success',
		cancel_url: 'http://localhost:5173/cancel'
	});
};
