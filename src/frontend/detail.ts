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
        `<div class="cart">
            <a href="/cart.html">
                <img src="images/cart.png" class="cartimg"/>
                <p class="cartprice">CHF ${cart.price.toFixed(2)}</p>
            </a>
        </div>
        <div>
            <img class ="detailimg" src="api/images/${item.imageName}"/>
            <p class="name detail">${item.productName}</p>
            <p class="discount detail">${item.specialOffer.toFixed(2)}</p>
            <p class="price detail">${item.normalPrice.toFixed(2)}</p>
        </div>
        <button id="addToCart">add to cart</button>
        `;
    
    document.getElementById("addToCart").addEventListener("click", async () => {
        const id = new URLSearchParams(window.location.search).get("id");
        await fetch(`/api/cart/${id}`, {
            method: "post"
        });
        location.href = "/cart.html";
    });
}