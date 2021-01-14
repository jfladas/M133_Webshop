/// <reference lib="dom" />

import { Item } from "../common/types.ts";

export async function loadItems() {
    const container = document.getElementById("container");
    const response = await fetch("/api/items");
    const items = await response.json();
    for (const item of items) {
        container.innerHTML +=
        `<div>
            <a href="detail.html?id=${item.id}">
                <img src="api/images/${item.imageName}"/>
                ${item.productName}
            </a>
            <p class="discount">${item.specialOffer}</p><p class="price">${item.normalPrice}</p>
        </div>`;
    }
}