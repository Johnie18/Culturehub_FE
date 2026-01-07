"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  shadowColor?: string;
  popoverTitle: string;
  popoverItems: string[];
}

export default function StatCard({
  icon,
  title,
  value,
  shadowColor = "rgba(37,99,235,0.3)",
  popoverTitle,
  popoverItems,
}: StatCardProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="cursor-pointer bg-white rounded-xl hover:shadow-lg transition-shadow p-3 flex items-center gap-3">
          <div
            className="p-3 rounded-full"
            style={{ boxShadow: `0 0 12px 2px ${shadowColor}` }}
          >
            {icon}
          </div>
          <div>
            <h1 className="text-lg font-semibold">{title}</h1>
            <p className="text-xl font-bold">{value}</p>
          </div>
        </div>
      </PopoverTrigger>

      <PopoverContent className="w-80 sm:w-96">
        <h2 className="font-semibold text-lg mb-2">{popoverTitle}</h2>

        <ul className="space-y-1 text-sm max-h-48 overflow-y-auto">
          {popoverItems.map((item, index) => (
            <li
              key={index}
              className="border-b pb-1 last:border-none"
            >
              {item}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
