import client from "../src/config/vectorDb.js";

(async function(){
    await client.createCollection({
        name: "local_ai_dev",
    });
    console.log("local_ai_dev collection created!😍")
})()
// pnpm chroma run --path ./db