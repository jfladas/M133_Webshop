/// <reference lib="dom" />

import { Item } from "../common/types.ts";

export async function loadDetail() {
    const id = new URLSearchParams(window.location.search).get("id");
    const container = document.getElementById("container");
    const response = await fetch(`/api/items/${id}`);
    const item: Item = await response.json();
    const response2 = await fetch("/api/cart");
    const cart = await response2.json();

    container.innerHTML +=
        `<div>
            <a href="/cart.html" class="button"><img src="images/cart.png" class="cartimg"/>CHF ${cart.price.toFixed(2)}</a>
        </div>
        <div>
            <img src="api/images/${item.imageName}"/>
            ${item.productName}
            <p class="discount">${item.specialOffer}</p><p class="price">${item.normalPrice}</p>
        </div>`;
}