import { NextResponse } from "next/server";

let availabilities: any[] = []; // Temporary in-memory DB (replace with real DB later)

export async function GET() {
  return NextResponse.json(availabilities);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { routeId, menuId, availableDate, departTime, maxGuests, price } = body;

  if (!routeId || !availableDate || !departTime || !price) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 });
  }

  const newAvailability = {
    id: Date.now().toString(),
    routeId,
    menuId: menuId || null,
    availableDate,
    departTime,
    maxGuests: maxGuests || 1,
    price,
  };

  availabilities.push(newAvailability);
  return NextResponse.json(newAvailability, { status: 201 });
}
