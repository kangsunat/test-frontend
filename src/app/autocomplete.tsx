"use client";

import React, { useState } from "react";

export default function Autocomplete({
  label,
  options,
  onChange,
  onSelected,
  disabled,
  placeholder,
}: {
  disabled?: boolean;
  placeholder: string;
  label: string;
  options: { id_negara: number; kode_negara: string; nama_negara: string }[];
  onChange: (value: string) => void;
  onSelected: (value: {
    id_negara: number;
    kode_negara: string;
    nama_negara: string;
  }) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="flex flex-col relative">
      <label htmlFor="autocomplete" className="font-normal">
        {label}
      </label>
      <input
        type="text"
        id="autocomplete"
        value={inputValue}
        onChange={(value) => {
          setInputValue(value.target.value);
          onChange(value.target.value);
        }}
        placeholder={placeholder}
        disabled={disabled}
        className={`border-b-2 disabled:bg-gray-300 rounded-t-lg disabled:placeholder:text-gray-500 focus:border-blue-500 border-gray-500  focus:outline-none p-2`}
      />
      {options.length > 0 && (
        <div className="absolute p-2 bg-white shadow-2xl top-0 translate-y-12 w-full z-10">
          <ul className="divide-y divide-gray-200">
            {options.map((option, index) => (
              <li
                key={index}
                className={`p-2 hover:bg-green-100 cursor-pointer ${
                  inputValue == option.nama_negara && "bg-green-100"
                }`}
                onClick={() => {
                  setInputValue(option.nama_negara);
                  onSelected(option);
                }}
              >
                {option.nama_negara}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
