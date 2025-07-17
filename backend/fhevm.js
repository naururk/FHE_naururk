import { createInstance } from "../fhevmjs/dist/node.js";

let instance;

export async function initFheInstance() {
  instance = await createInstance({
    chainId: 11155111, // Sepolia
    kmsAddress: "0x0000000000000000000000000000000000000043", // адрес KMS контракта Zama
  });
}

export function encryptValue(n) {
  if (!instance) throw new Error("FHE instance not initialized");
  return instance.encrypt32(n);
}
