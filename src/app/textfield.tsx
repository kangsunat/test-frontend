"use client";

import React from "react";

export default function TextField({
  label,
  placeholder,
  disabled,
  onChange,
  endIcon,
  value, // Ini akan menjadi satu-satunya sumber kebenaran untuk nilai input
  readonly,
  type = "number",
}: {
  type: "number" | "text";
  readonly?: boolean;
  disabled?: boolean;
  placeholder?: string;
  label: string;
  onChange: (value: string) => void;
  endIcon?: boolean;
  value: string | number; // Tetap bisa menerima string atau number dari parent
}) {
  return (
    <div className="relative w-full">
      <label
        htmlFor={`textfield-${label.toLowerCase().replace(/\s/g, "-")}`}
        className="font-normal"
      >
        {label}
      </label>
      <div className="flex items-center">
        <input
          readOnly={readonly}
          // Konversi number ke string untuk prop value di input HTML
          value={typeof value === "number" ? value.toString() : value}
          type={type} // Ini bagus untuk input numerik
          id={`textfield-${label.toLowerCase().replace(/\s/g, "-")}`} // Gunakan ID unik
          onChange={(e) => {
            onChange(e.target.value); // Kirim nilai string kembali ke parent
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`border-b-2 disabled:bg-gray-300 disabled:placeholder:text-gray-500 focus:border-blue-500 border-gray-500 focus:outline-none p-2 pr-10 w-full rounded-t-lg `}
        />
        {endIcon && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1">
            {" "}
            {/* Sesuaikan posisi jika perlu */}
            <p className="font-bold text-black">%</p>
          </div>
        )}
      </div>
    </div>
  );
}
