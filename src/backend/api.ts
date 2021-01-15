import { Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Item } from "../common/types.ts";
import { CartItem } from "../common/types.ts";
import { Cart } from "../common/types.ts";

// Session konfigurieren und starten
const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

async function loadItems(): Promise<Item[]> {
    const jsonFile = await Deno.readTextFile(`${Deno.cwd()}/src/backend/items.json`);
    return JSON.parse(jsonFile);
}

async function getTotal(cart: Cart): Promise<number> {
    let total = 0;
    cart.items.forEach(async item => {
        const index = items.findIndex(p => p.id == item.id);
        const price = items[index].specialOffer;
        total += price * item.amount;
    });
    total = +total.toFixed(2);
    return total;
}

const items: Item[] = await loadItems();

const router = new Router();
router
    .get("/api/items", cxt => {
        cxt.response.body = items;
    })
    .get("/api/items/:id", async ctx => {
        const index = items.findIndex(p => p.id == ctx.params.id);
        ctx.response.body = items[index];
    })
    .get("/api/images/:image", async ctx => {
        const image = await Deno.readFile(`${Deno.cwd()}/src/backend/images/${ctx.params.image}`);
        ctx.response.body = image;
        ctx.response.headers.set('Content-Type', 'image/jpg');
    })
    .get("/api/cart", async ctx => {
        if (await ctx.state.session.get("cart") == undefined) {
            let cart: Cart = {
                price: 0,
                items: []
            };
            await ctx.state.session.set("cart", cart);
        }
        const cart = await ctx.state.session.get("cart");
        ctx.response.body = cart;
    })
    .post("/api/cart/:id", async ctx => {
        const id = Number(ctx.params.id);
        var cart = await ctx.state.session.get("cart");
        const index = cart.items.findIndex((item: CartItem) => parseInt(item.id) == id);
        
        if (cart.items[index] == undefined) {
            cart.items.push({ amount:1, id:id });
        } else {
            cart.items[index].amount += 1;
        }

        cart.price = await getTotal(cart);
        ctx.state.session.set("cart", cart);
        ctx.response.status = 200;
        ctx.response.body = cart;
        
    })
    .delete("/api/cart", async ctx => {
        ctx.state.session.set("cart", {
            price: 0,
            items: []
        });
        ctx.response.status = 200;
        ctx.response.body = ctx.state.session.get("cart");
        
    });
export const api = router.routes();