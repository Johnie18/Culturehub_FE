"use client"

import { useState } from "react"

export default function GreenToggle() {
  const [active, setActive] = useState(false)

  return (
    <button
      onClick={() => setActive(!active)}
      className={`
        w-20 
        py-1 
        rounded-md 
        font-semibold 
        text-sm 
        transition-all 
        duration-300 
        transform
        ${active ? "bg-green-500 text-white scale-105" : "bg-gray-200 text-gray-600 scale-100"}
      `}
    >
      {active ? "Present" : "Not Here"}
    </button>
  )
}
