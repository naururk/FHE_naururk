import { createInstance } from "./src/instance";

let instance: ReturnType<typeof createInstance>;

export async function initFheInstance(): Promise<void> {
  instance = createInstance({
    publicKey: "0x00",
    kmsAddress: "0xcDda2466f44E625715f6575904765d6CCD8870dB",
    chainId: 11155111,
  });
}

export function encryptValue(value: number): string {
  if (!instance) throw new Error("Instance is not initialized");
  return instance.encrypt32(value).ciphertext;
}
