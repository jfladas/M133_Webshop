/// <reference lib="dom" />

import { Item } from "../common/types.ts";

export async function loadOverview() {
    const response = await fetch("/api/items");
    const items: Item[] = await response.json();

    const list = document.querySelector("ul");

    for (const item of items) {
        list.innerHTML += `
            <li>
                <a href="./detail.html?itemId=${item.id}">${item.name} ${item.price}</a>
            </li>
        `;
    }
}