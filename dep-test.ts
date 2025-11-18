import { initPrault } from "./mod.ts";


const prault = initPrault();
console.log(prault.test());
console.log(prault.test({"FOO": "world"}));
