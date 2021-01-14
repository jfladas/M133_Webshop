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
            if(item.id == id)
            {
                singleProduct = item;
            }
        });
        ctx.response.body = singleProduct;
    })
    .get("/api/images/:image", async context => {
        const image = await Deno.readFile(`${Deno.cwd()}/src/backend/images/${context.params.image}`);
        context.response.body = image;
        context.response.headers.set('Content-Type', 'image/jpg');
    });

export const api = router.routes();