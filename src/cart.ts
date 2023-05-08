// React Context
import { writable, get } from 'svelte/store';

export const cartItems = writable<CartItems[]>([]);
// export const cartItems = writable([])
// [{id:"1",quantity: 4}, {id:"2",quantity: 1}]
// declare class CartItems {
// 	id: string;
// 	quantity: number;
// }

// export const cartItems = writable<CartItems[]>([]); which mean
// no matter what writable content is, it should be
// [{id:"1",quantity: 4}, {id:"2",quantity: 1}] like this array

// add to cart (add one)
export const addToCart = (id: string) => {
	// cartItems is a writable, not a value
	// get(cartItems) -> [{id:"1"}]....
	let items = get(cartItems);
	// cartItems is a writable not a value, get method can help
	// to be a value not a writable.
	let itemPosition = items.findIndex((item) => {
		return item.id == id; // does the current item have an id of "1"
	});

	if (itemPosition !== -1) {
		// Item is already in cart, add to the quantity of that item
		cartItems.update(() => {
			let updateItems = items.map((item) => {
				if (item.id === id) {
					return { ...item, quantity: item.quantity + 1 };
				}
				return item;
			});
			return updateItems;
		});
	} else {
		// Item is not in the cart at all, so add the object to the cart
		cartItems.update(() => {
			return [...items, { id: id, quantity: 1 }];
		});
	}
};

export const removeFromCart = (id: string) => {
	let items = get(cartItems);
	let itemPosition = items.findIndex((item) => {
		return item.id == id;
	});
	if (items[itemPosition]?.quantity - 1 === 0) {
		items.splice(itemPosition, 1);
	}
	// console.log('hello');
	// console.log(items);
	// console.log(itemPosition);
	// console.log(items[itemPosition]);
	// console.log(items[itemPosition].quantity);
	cartItems.update(() => {
		let updateItems = items.map((item) => {
			if (item.id === id) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
		return updateItems;
	});
};
