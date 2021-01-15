/// <reference lib="dom" />

import { Item } from "../common/types.ts";

export async function loadItems() {
    const container = document.getElementById("container");
    const response = await fetch("/api/items");
    const items = await response.json();
    const response2 = await fetch("/api/cart");
    const cart = await response2.json();

    container.innerHTML +=
        `<div class="cart">
            <a href="/cart.html">
                <img src="images/cart.png" class="cartimg"/>
                <p class="cartprice">CHF ${cart.price.toFixed(2)}</p>
            </a>
        </div>`;
    
    for (const item of items) {
        container.innerHTML +=
            `<div class="box">
                <a href="detail.html?id=${item.id}">
                    <img src="api/images/${item.imageName}"/>
                    <p class="name">${item.productName}</p>
                    <p class="discount">${item.specialOffer.toFixed(2)}</p>
                    <p class="price">${item.normalPrice.toFixed(2)}</p>
                </a>
            </div>`;
    }
}