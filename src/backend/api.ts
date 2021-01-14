import { Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Item } from "../common/types.ts";
import { CartItem } from "../common/types.ts";

// Session konfigurieren und starten
const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

async function loadItems(): Promise<Item[]> {
    const jsonFile = await Deno.readTextFile(`${Deno.cwd()}/src/backend/items.json`);
    return JSON.parse(jsonFile);
}

const items: Item[] = await loadItems();

var cartitems: CartItem[] = [
    { id: "001", amount: 2, price: 1 },
    { id: "002", amount: 3, price: 4 }
];

const router = new Router();
router
    .get("/api/items", cxt => {
        cxt.response.body = items;
    })
    .get("/api/items/:id", async ctx => {
        const id = ctx.params.id;
        let singleProduct = null;
        ctx.response.type = 'application/json';
        items.forEach(item => {
            if (item.id == id) {
                singleProduct = item;
            }
        });
        ctx.response.body = singleProduct;
    })
    .get("/api/images/:image", async ctx => {
        const image = await Deno.readFile(`${Deno.cwd()}/src/backend/images/${ctx.params.image}`);
        ctx.response.body = image;
        ctx.response.headers.set('Content-Type', 'image/jpg');
    })
    .get("/api/cartprice", async ctx => {
        ctx.response.type = 'text/plain';
        let price = 0;
        cartitems.forEach(cartitem => {
            price += cartitem.amount * cartitem.price;
        });
        ctx.response.body = price;
    });

export const api = router.routes();