"use client";
import { useState } from "react";
import { AddNameForm } from "./components/AddNameForm";

export default function Home() {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (input.trim()) {
      setNames([...names, input.trim()]);
      setInput("");
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Liste de noms</h1>

      <div className="flex gap-2">
        <AddNameForm input={input} onInputChange={setInput} onAdd={handleAdd} />
      </div>

      <ul className="mt-4">
        {names.map((n, i) => (
          <li key={i} className="border-b py-1">
            {n}
          </li>
        ))}
      </ul>
    </main>
  );
}
