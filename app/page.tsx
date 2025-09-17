"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AddNameForm } from "./components/AddNameForm";
import { AuthButton } from "./components/AuthButton";
import { Name, useNames } from "./hooks/useNames";

export default function Home() {
  const [input, setInput] = useState("");
  const { data: session } = useSession();
  const { names, loading, error, addName } = useNames() as {
    names: Name[];
    loading: boolean;
    error: string | null;
    addName: (name: string) => Promise<void>;
  };

  const handleAdd = async () => {
    if (!input.trim()) return;

    try {
      await addName(input.trim());
      setInput("");
    } catch (err) {
      console.error("Erreur lors de l'ajout du nom:", err);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-4">
      {session && <AuthButton />}
      <div className="w-full max-w-md flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center">Liste de noms</h1>

        {session ? (
          <>
            <div className="mb-4 flex items-center gap-2">
              <AddNameForm
                input={input}
                onInputChange={setInput}
                onAdd={handleAdd}
              />
            </div>

            {loading && (
              <div className="text-center text-gray-500">
                Chargement des noms...
              </div>
            )}

            {error && (
              <div className="text-center text-red-500 bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="">
                {names.length === 0 ? (
                  <p className="text-gray-500 text-center">
                    Aucun nom ajouté pour le moment
                  </p>
                ) : (
                  <ul className="flex flex-col gap-4">
                    {names.map((name: Name) => (
                      <li
                        key={name.id}
                        className="border-b py-2 px-4 rounded-lg max-h-96 overflow-y-auto bg-white text-center"
                      >
                        <div className="items-center">
                          <span className="text-lg font-bold text-gray-800">
                            {name.value}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-4">
              Connectez-vous pour gérer votre liste de noms
            </p>
            <AuthButton />
          </div>
        )}
      </div>
    </main>
  );
}
