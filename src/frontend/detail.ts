/// <reference lib="dom" />

import { Item } from "../common/types.ts";

export async function loadDetail() {
    const id = new URLSearchParams(window.location.search).get("id");
    const container = document.getElementById("container");
    const response = await fetch(`/api/items/${id}`);
    const item: Item = await response.json();
    const response2 = await fetch("/api/cartprice");
    const cartprice = await response2.text();

    container.innerHTML +=
        `<div>
            <a href="/cart.html"><img src="images/cart.png" class="cartimg"/>CHF ${cartprice}</a>
        </div>
        <div>
            <img src="api/images/${item.imageName}"/>
            ${item.productName}
            <p class="discount">${item.specialOffer}</p><p class="price">${item.normalPrice}</p>
        </div>`;
}