/// <reference lib="dom" />

import { Item } from "../common/types.ts";

export async function loadDetail() {
    const itemId = new URLSearchParams(window.location.search).get("itemId"); 
    const response = await fetch(`/api/items/${itemId}`);
    const item: Item = await response.json();

    document.querySelector("h1").innerText = `${item.name} ${item.price}`;
    document.querySelector("span").innerText = item.id;
}