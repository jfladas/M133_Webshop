/// <reference lib="dom" />

export async function deleteCart() {

    const response = await fetch("/api/cart", {
        method: "delete",
        headers: {
            "Content-type": "application/json"
        }
    });

    if (response.status == 200) {
        location.href = "/home.html";
        alert("order placed successfully!");
    } else {
        alert(await response.text());
    }
}