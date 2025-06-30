"use client";

import React from "react";

export default function TextField({
  label,
  placeholder,
  disabled,
  onChange,
  endIcon,
  value,
}: {
  disabled?: boolean;
  placeholder?: string;
  label: string;
  onChange: (value: string) => void;
  endIcon?: boolean;
  value?: string;
}) {
  return (
    <div className="relative w-full">
      <label htmlFor="autocomplete" className="font-normal">
        {label}
      </label>
      <div className="flex items-center">
        <input
          type="number"
          id="autocomplete"
          onChange={(value) => {
            onChange(value.target.value);
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`border-b-2 disabled:bg-gray-300 disabled:placeholder:text-gray-500 focus:border-blue-500 border-gray-500 focus:outline-none p-2 pr-10 w-full rounded-t-lg `}
        />
        {endIcon && (
          <div className="absolute right-2 top-11 -translate-y-1/2  rounded px-2 py-1">
            <p className="font-bold text-black">%</p>
          </div>
        )}
      </div>
    </div>
  );
}
