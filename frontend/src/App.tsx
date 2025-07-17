import { useState } from "react";
import { ethers } from "ethers";
import ABI from "../contracts/PrivateComparator.json";

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS;
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [status, setStatus] = useState("");

  const handleCompare = async () => {
    try {
      setStatus("🔒 Sending to backend...");

      const res = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ a: Number(a), b: Number(b) }),
      });

      const { encA, encB, proofA, proofB } = await res.json();

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signer);

      setStatus("📤 Sending tx...");
      const tx = await contract.setValues(encA, encB, proofA, proofB);
      await tx.wait();

      setStatus("✅ Done! Tx sent.");
    } catch (err) {
      console.error(err);
      setStatus("❌ Error");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>🔐 Private Comparator</h1>
      <input
        placeholder="Enter A"
        value={a}
        onChange={(e) => setA(e.target.value)}
      />
      <input
        placeholder="Enter B"
        value={b}
        onChange={(e) => setB(e.target.value)}
      />
      <button onClick={handleCompare}>Compare Privately</button>
      <p>{status}</p>
    </div>
  );
}
