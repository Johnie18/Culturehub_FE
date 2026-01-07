"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Menu {
  id: string;
  name: string;
  image: string;
}

interface Route {
  id: string;
  routeName: string;
  menus: Menu[];
}

interface AvailabilityCardState {
  routeId?: string;
  menuId?: string;
  date?: Date | null;
}

export default function RouteAvailabilityCards() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [cards, setCards] = useState<AvailabilityCardState[]>([
    { routeId: undefined, menuId: undefined, date: null },
  ]);

  useEffect(() => {
    fetch("/api/routes")
      .then((res) => res.json())
      .then(setRoutes);
  }, []);

  const handleAddCard = () => {
    setCards((prev) => [
      ...prev,
      { routeId: undefined, menuId: undefined, date: null },
    ]);
  };

  const handleDeleteCard = (index: number) => {
    if (cards.length === 1) return;
    setCards((prev) => prev.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    key: keyof AvailabilityCardState,
    value: any
  ) => {
    setCards((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [key]: value };
      return copy;
    });
  };

  const handleSubmit = async (index: number) => {
    const card = cards[index];
    if (!card.routeId || !card.menuId || !card.date) return;

    const payload = {
      route_id: card.routeId,
      available_date: card.date.toISOString().split("T")[0],
      depart_time: "08:00:00",
      max_guests: 20,
      price: 500,
      menu_id: card.menuId === "none" ? null : card.menuId,
    };

    await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    alert("Availability added!");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Route Availability</h2>
        <Button onClick={handleAddCard}>Add Card</Button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => {
          const selectedRoute = routes.find((r) => r.id === card.routeId);
          const selectedMenu =
            card.menuId && card.menuId !== "none"
              ? selectedRoute?.menus.find((m) => m.id === card.menuId)
              : undefined;

          const isValid =
            card.routeId && card.menuId && card.date;

          return (
 <div key={index} className="relative flex justify-center">
      
      {/* Floating delete button */}
      <button
        onClick={() => handleDeleteCard(index)}
        className="absolute -top-3 -right-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md text-gray-500 hover:text-red-500 hover:scale-105 transition"
        title="Delete card"
      >
        ✕
      </button>

      {/* Card */}
      <div className="w-full max-w-[280px] h-[400px] rounded-xl border bg-white shadow-sm hover:shadow-md transition flex flex-col p-4">

              {/* Route */}
              <select
                className="border rounded px-2 py-1 mb-3"
                value={card.routeId ?? ""}
                onChange={(e) =>
                  handleChange(index, "routeId", e.target.value)
                }
              >
                <option value="">Select Route</option>
                {routes.map((route) => (
                  <option key={route.id} value={route.id}>
                    {route.routeName}
                  </option>
                ))}
              </select>

              {/* Date */}
              <DatePicker
                selected={card.date ?? null}
                onChange={(date: Date) =>
                  handleChange(index, "date", date)
                }
                className="w-full border rounded px-2 py-1 mb-3"
                placeholderText="Select date"
                dateFormat="MM-dd-yyyy"
              />

              {/* Menu */}
              {selectedRoute && (
                <select
                  className="border rounded px-2 py-1 mb-3"
                  value={card.menuId ?? ""}
                  onChange={(e) =>
                    handleChange(index, "menuId", e.target.value)
                  }
                >
                  <option value="">Select Menu</option>
                  <option value="none">Without Menu</option>
                  {selectedRoute.menus.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.name}
                    </option>
                  ))}
                </select>
              )}

              {/* Fixed image slot */}
              <div className="h-40 w-full rounded-lg border mb-4 overflow-hidden flex items-center justify-center bg-gray-50">
                {selectedMenu && card.menuId !== "none" ? (
                  <img
                    src={selectedMenu.image}
                    alt={selectedMenu.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>

              {/* Submit always at bottom */}
              <Button
                disabled={!isValid}
                onClick={() => handleSubmit(index)}
                className="mt-auto w-full"
              >
                Submit
              </Button>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
