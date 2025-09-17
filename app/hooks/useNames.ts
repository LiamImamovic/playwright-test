"use client";

import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";

export type Name = {
  id: string;
  value: string;
  createdAt: string;
  updatedAt: string;
};

export const useNames = () => {
  const [names, setNames] = useState<Name[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { data: session } = useSession();

  const fetchNames = useCallback(async () => {
    if (!session) {
      setNames([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/names");

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des noms");
      }

      const data = await response.json();
      setNames(data.names || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }, [session]);

  const addName = async (value: string) => {
    if (!session) {
      throw new Error("Vous devez être connecté");
    }

    try {
      const response = await fetch("/api/names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ value }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout du nom");
      }

      const data = await response.json();
      setNames((prev) => [data.name, ...prev]);
      return data.name;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      throw err;
    }
  };

  useEffect(() => {
    fetchNames();
  }, [fetchNames]);

  return {
    names,
    loading,
    error,
    addName,
    refetch: fetchNames,
  };
};
