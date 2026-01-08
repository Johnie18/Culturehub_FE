"use client";

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/* ================= TYPES ================= */

interface EditableMenu {
  id: string;
  name: string;
  image: string;
  price?: number;
  quantity?: number;
}

interface AvailabilityCardState {
  routeId?: string;
  date?: Date | null;
  driverName?: string;
  menus?: EditableMenu[];
}

interface Route {
  id: string;
  routeName: string;
  menus: {
    id: string;
    name: string;
    image: string;
  }[];
}

/* ================= COMPONENT ================= */

export default function RouteAvailabilityCards() {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [cards, setCards] = useState<AvailabilityCardState[]>([
    { routeId: undefined, date: null, driverName: "" },
  ]);

  /* ================= FETCH ROUTES ================= */

  useEffect(() => {
    fetch("/api/routes")
      .then((res) => res.json())
      .then(setRoutes);
  }, []);

  /* ================= CARD HANDLERS ================= */

  const handleAddCard = () => {
    setCards((prev) => [
      ...prev,
      { routeId: undefined, date: null, driverName: "" },
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
      const card = { ...copy[index], [key]: value };

      if (key === "routeId") {
        const route = routes.find((r) => r.id === value);
        // All menus from route should display
        card.menus = route
          ? route.menus.map((menu) => ({
              id: menu.id,
              name: menu.name,
              image: menu.image,
            }))
          : [];
      }

      copy[index] = card;
      return copy;
    });
  };

  /* ================= MENU HANDLERS ================= */

  const updateMenu = (
    cardIndex: number,
    menuIndex: number,
    key: keyof EditableMenu,
    value: any
  ) => {
    setCards((prev) => {
      const copy = [...prev];
      const menus = [...(copy[cardIndex].menus || [])];
      menus[menuIndex] = { ...menus[menuIndex], [key]: value };
      copy[cardIndex].menus = menus;
      return copy;
    });
  };

  const addMenu = (cardIndex: number) => {
    setCards((prev) => {
      const copy = [...prev];
      const menus = copy[cardIndex].menus || [];
      menus.push({
        id: crypto.randomUUID(),
        name: "",
        image: "",
      });
      copy[cardIndex].menus = menus;
      return copy;
    });
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    cardIndex: number,
    menuIndex: number
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    updateMenu(cardIndex, menuIndex, "image", preview);
  };

  /* ================= SUBMIT ================= */

  const handleSubmit = async (index: number) => {
    const card = cards[index];
    if (!card.routeId || !card.date || !card.driverName) return;

    await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        route_id: card.routeId,
        available_date: card.date.toISOString().split("T")[0],
        driver_name: card.driverName,
        menus: card.menus,
      }),
    });

    alert("Availability added!");
  };

  /* ================= UI ================= */

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Route Availability</h2>
        <Button onClick={handleAddCard}>Add Card</Button>
      </div>

      <div className="space-y-6">
        {cards.map((card, index) => {
          const isValid =
            card.routeId &&
            card.date &&
            card.driverName &&
            card.menus?.every((m) => m.name.trim());

          return (
            <div
              key={index}
              className="relative border rounded-xl bg-white shadow p-4"
            >
              {/* Delete */}
              <button
                onClick={() => handleDeleteCard(index)}
                className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-white shadow text-gray-500 hover:text-red-500"
              >
                ✕
              </button>

              {/* Header */}
              <div className="flex gap-4 mb-4">
                <select
                  className="border rounded px-2 py-1"
                  value={card.routeId ?? ""}
                  onChange={(e) =>
                    handleChange(index, "routeId", e.target.value)
                  }
                >
                  <option value="">Select Route</option>
                  {routes.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.routeName}
                    </option>
                  ))}
                </select>

                <DatePicker
                  selected={card.date ?? null}
                  onChange={(d: Date) => handleChange(index, "date", d)}
                  className="border rounded px-2 py-1"
                  placeholderText="Select date"
                />
              </div>

              {/* Driver Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Driver Name
                </label>
                <input
                  type="text"
                  placeholder="Driver Name"
                  className="border rounded px-2 py-1 w-full"
                  value={card.driverName ?? ""}
                  onChange={(e) =>
                    handleChange(index, "driverName", e.target.value)
                  }
                />
              </div>

              {/* MENUS */}
              <div className="space-y-4">
                {card.menus?.map((menu, mIndex) => (
                  <div
                    key={menu.id}
                    className="flex gap-4 border rounded-lg p-3 items-center"
                  >
                    {/* Image */}
                    <div className="w-32 h-24 bg-gray-100 rounded overflow-hidden">
                      {menu.image && (
                        <img
                          src={menu.image}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Fields */}
                    <div className="flex-1 grid grid-cols-3 gap-2">
                      <input
                        className="border rounded px-2 py-1"
                        placeholder="Menu name"
                        value={menu.name}
                        onChange={(e) =>
                          updateMenu(index, mIndex, "name", e.target.value)
                        }
                      />

                      <input
                        type="number"
                        className="border rounded px-2 py-1"
                        placeholder="0"
                        value={menu.price ?? ""}
                        onChange={(e) =>
                          updateMenu(
                            index,
                            mIndex,
                            "price",
                            Number(e.target.value)
                          )
                        }
                      />

                      <input
                        type="number"
                        className="border rounded px-2 py-1"
                        placeholder="0"
                        value={menu.quantity ?? ""}
                        onChange={(e) =>
                          updateMenu(
                            index,
                            mIndex,
                            "quantity",
                            Number(e.target.value)
                          )
                        }
                      />
                    </div>

                    {/* Image Button */}
                    <label className="cursor-pointer text-sm text-blue-600">
                      Change Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) =>
                          handleImageUpload(e, index, mIndex)
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>

              {/* Add Menu */}
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => addMenu(index)}
              >
                + Add Menu
              </Button>

              {/* Submit */}
              <Button
                disabled={!isValid}
                onClick={() => handleSubmit(index)}
                className="w-full mt-4"
              >
                Submit Availability
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
