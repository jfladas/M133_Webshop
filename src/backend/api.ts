import { Router } from "https://deno.land/x/oak@v6.4.0/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import { Item } from "../common/types.ts";

// Session konfigurieren und starten
const session = new Session({ framework: "oak" });
await session.init();
export const usableSession = session.use()(session);

const items: Item[] = [
    { id: "i01", name: "item1", price: 0.5, desc: "Description" },
    { id: "i02", name: "item2", price: 1, desc: "0" },
    { id: "i03", name: "item3", price: 7.75, desc: "0" },
];

const router = new Router();
router
    .get("/api/items", cxt => {
        cxt.response.body = items;
    })
    .get("/api/items/:id", async ctx => {
        ctx.response.body = items
            .find(p => p.id == ctx.params.id);
    });

export const api = router.routes();