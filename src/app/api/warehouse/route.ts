import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const warehouses = await prisma.warehouse.findMany({
      include: { inventory: true },
    });
    return NextResponse.json(warehouses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch warehouses" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, location, inventory } = await req.json();

    const newWarehouse = await prisma.warehouse.create({
      data: {
        name,
        location,
        inventory: {
          create: inventory.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            category: item.category,
            status: item.status,
          })),
        },
      },
      include: { inventory: true },
    });

    return NextResponse.json(newWarehouse);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create warehouse" },
      { status: 500 }
    );
  }
}
