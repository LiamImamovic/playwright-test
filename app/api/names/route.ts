import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { names: { orderBy: { createdAt: "desc" } } },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 },
      );
    }

    return NextResponse.json({ names: user.names });
  } catch (error) {
    console.error("Erreur lors de la récupération des noms:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    const { value } = await request.json();

    if (!value || typeof value !== "string" || value.trim().length === 0) {
      return NextResponse.json({ error: "Le nom est requis" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 },
      );
    }

    const name = await prisma.name.create({
      data: {
        value: value.trim(),
        userId: user.id,
      },
    });

    return NextResponse.json({ name });
  } catch (error) {
    console.error("Erreur lors de la création du nom:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
