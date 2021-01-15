/// <reference lib="dom" />

import { Item } from "../common/types.ts";
import { CartItem } from "../common/types.ts";
import { Cart } from "../common/types.ts";

export async function loadCart() {

    const container = document.getElementById("container");
    const response = await fetch(`/api/cart`);
    const cart: Cart = await response.json();
    const cartitems: CartItem[] = cart.items;


    container.innerHTML +=
        `<table id="carttable">
            <tr>
                <th>item</th>
                <th>price</th>
                <th>amount</th>
                <th>total</th>
            </tr>
        </table>
        <a class="button" id="buttonCheckout" href="./checkout.html">Checkout</a>
        `;
    
    const carttable = document.getElementById("carttable")
    cartitems.forEach(async function (cartitem) {
            const response = await fetch(`/api/items/${cartitem.id}`);
            const item: Item = await response.json();

            const row: Node = createRow(cartitem, item);
            carttable.appendChild(row);
        });
    carttable.innerHTML += `<tfoot><tr id="lastCartRow"><td>Total</td><td></td><td></td><td>CHF ${cart.price.toFixed(2)}</td></tr><tfoot>`

    function createRow(cartitem: CartItem, item: Item): Node {
    const tr = document.createElement("tr");
    tr.id = cartitem.id.toString();

    const tdName = document.createElement("td");
    tdName.innerText = item.productName;

    const tdUnitPrice = document.createElement("td");
    tdUnitPrice.innerText = "CHF " + item.normalPrice.toFixed(2);

    const tdAmount = document.createElement("td");
    const btnMinus = document.createElement("button");
    btnMinus.setAttribute("class", "button");
    btnMinus.innerText = "-";
    btnMinus.addEventListener("click", async event => await minusItemInCart(event));
    const pAmount = document.createElement("p");
    pAmount.innerText = cartitem.amount.toString();
    const btnPlus = document.createElement("button");
    btnPlus.setAttribute("class", "button");
    btnPlus.addEventListener("click", async event => await plusItemInCart(event));
    btnPlus.innerText = "+";
    tdAmount.appendChild(btnMinus);
    tdAmount.appendChild(pAmount);
    tdAmount.appendChild(btnPlus);

    const tdTotal = document.createElement("td");
    tdTotal.innerText = "CHF " + (cartitem.amount * item.normalPrice).toFixed(2);

    tr.appendChild(tdName);
    tr.appendChild(tdUnitPrice);
    tr.appendChild(tdAmount);
    tr.appendChild(tdTotal);

    return tr
}

async function plusItemInCart(event: any) {
    const id = event.srcElement.closest("tr").id;
    await fetch(`/api/cart/${id}`, { 
        method: "post" 
    });
    await loadCart();
}

async function minusItemInCart(event: any) {
    const id = event.srcElement.closest("tr").id;
    await fetch(`/api/cart/${id}`, { 
        method: "delete" 
    });
    await loadCart();
}
}