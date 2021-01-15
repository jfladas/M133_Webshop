/// <reference lib="dom" />

import { Item } from "../common/types.ts";
import { CartItem } from "../common/types.ts";
import { Cart } from "../common/types.ts";

export async function loadCart() {

    const container = document.getElementById("container");
    const response = await fetch(`/api/cart`);
    const cart: Cart = await response.json();
    const response2 = await fetch("/api/cart");
    let total = "CHF " + parseFloat((await response2.json()).totalPrice).toFixed(2);
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
        <a id="btnCheckout" href="./checkout.html">Checkout</a>
        `;
    
    const carttable = document.getElementById("carttable");

    cartitems.forEach(async function (cartitem) {
            const response = await fetch(`/api/items/${cartitem.id}`);
            const item: Item = await response.json();
            const row: Node = createRow(cartitem, item);
            carttable.appendChild(row);
        });
    carttable.innerHTML += `<tfoot><tr id="lastCartRow"><td>Total</td><td></td><td></td><td>CHF ${cart.price.toFixed(2)}</td></tr><tfoot>`

}

function createRow(cartitem: CartItem, item: Item): Node {
    const tdName = document.createElement("td");
    const tr = document.createElement("tr");
    const tdUnitPrice = document.createElement("td");
    const tdAmount = document.createElement("td");
    const btnMinus = document.createElement("button");
    const pAmount = document.createElement("p");
    const btnPlus = document.createElement("button");
    const tdTotal = document.createElement("td");
    
    tr.id = cartitem.id.toString();
    tdName.innerText = item.productName;
    tdUnitPrice.innerText = "CHF " + item.specialOffer.toFixed(2);
    btnMinus.innerText = "-";
    btnMinus.addEventListener("click", async event => await minusItemInCart(event));
    pAmount.innerText = cartitem.amount.toString();
    btnPlus.setAttribute("class", "button");
    btnPlus.addEventListener("click", async event => await plusItemInCart(event));
    btnPlus.innerText = "+";
    tdAmount.appendChild(btnMinus);
    tdAmount.appendChild(pAmount);
    tdAmount.appendChild(btnPlus);
    tdTotal.innerText = "CHF " + (cartitem.amount * item.specialOffer).toFixed(2);
    tr.appendChild(tdName);
    tr.appendChild(tdUnitPrice);
    tr.appendChild(tdAmount);
    tr.appendChild(tdTotal);
    return tr;
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