import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      id: "r1",
      routeName: "Manila → Baguio",
      image: "/images/routes/Route1.webp",
      menus: [
        {
          id: "m1",
          name: "Chicken Meal",
          image: "/images/menus/C2.webp",
        },
        {
          id: "m2",
          name: "Meal",
          image: "/images/menus/C3.webp",
        },
      ],
    },
        {
      id: "r2",
      routeName: "Negros → Iloilo",
      image: "/images/routes/Route2.webp",
      menus: [
        {
          id: "m1",
          name: "Chicken Meal",
          image: "/images/menus/jollibee-meal.webp",
        },
        {
          id: "m2",
          name: "Meal",
          image: "/images/menus/jollibee-supermeal.webp",
        },
      ],
    },
  ]);
}
