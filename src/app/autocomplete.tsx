"use client";

import React, { useEffect, useState, useRef } from "react"; // Import useRef

export default function Autocomplete<T extends { [key: string]: any }>({
  label,
  options,
  onChange,
  onSelected,
  disabled,
  placeholder,
  value,
  target,
}: {
  target: "country" | "harbor" | "product";
  value: string;
  disabled?: boolean;
  placeholder: string;
  label: string;
  options: T[];
  onChange: (value: string) => void;
  onSelected: (value: T) => void;
}) {
  const [inputValue, setInputValue] = useState(value ?? "");
  // State baru untuk mengontrol visibilitas dropdown
  const [showOptions, setShowOptions] = useState(false);
  // Ref untuk mendeteksi klik di luar komponen
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Efek untuk menutup dropdown ketika klik di luar komponen
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    }
    // Tambahkan event listener saat komponen mount
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Bersihkan event listener saat komponen unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]); // Dependensi pada wrapperRef

  return (
    // Tambahkan ref ke wrapper div
    <div className="flex flex-col relative" ref={wrapperRef}>
      <label htmlFor="autocomplete" className="font-normal">
        {label}
      </label>
      <input
        type="text"
        id="autocomplete"
        value={inputValue}
        onChange={(e) => {
          // Gunakan 'e' untuk event
          setInputValue(e.target.value);
          onChange(e.target.value);
          setShowOptions(true); // Tampilkan opsi saat mulai mengetik
        }}
        onFocus={() => setShowOptions(true)} // Tampilkan opsi saat input difokuskan
        // onBlur={() => setShowOptions(false)} // Hati-hati dengan onBlur, bisa menutup terlalu cepat
        placeholder={placeholder}
        disabled={disabled}
        className={`border-b-2 disabled:bg-gray-300 rounded-t-lg disabled:placeholder:text-gray-500 focus:border-blue-500 border-gray-500  focus:outline-none p-2 peer`}
      />
      {/* Kondisional rendering atau kelas untuk visibilitas */}
      {showOptions && options.length > 0 && (
        <div
          className={`h-[200px] overflow-auto absolute p-2 bg-white shadow-2xl top-full w-full z-10 opacity-100 mt-1`}
        >
          {" "}
          {/* Sesuaikan posisi top-full dan mt-1 */}
          <ul className="divide-y divide-gray-200">
            {options.map((option, index) => (
              <li
                key={index}
                className={`p-2 hover:bg-green-100 cursor-pointer ${
                  inputValue ===
                  (target == "country"
                    ? option.nama_negara
                    : target == "harbor"
                    ? option.nama_pelabuhan
                    : option.nama_barang)
                    ? "bg-green-100"
                    : "" // Gunakan === untuk perbandingan ketat
                }`}
                onClick={() => {
                  setInputValue(
                    target == "country"
                      ? option.nama_negara
                      : target == "harbor"
                      ? option.nama_pelabuhan
                      : option.nama_barang
                  );
                  onSelected(option);
                  setShowOptions(false); // Sembunyikan opsi setelah memilih
                }}
              >
                {target == "country"
                  ? option.nama_negara
                  : target == "harbor"
                  ? option.nama_pelabuhan
                  : option.nama_barang}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
