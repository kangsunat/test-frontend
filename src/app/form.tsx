"use client";

import { useState } from "react";
import Autocomplete from "./autocomplete";
import useDebounce from "./useDebounce";
import TextField from "./textfield";

export default function Form({
  countries,
  harbor,
  product,
}: {
  countries: country[];
  harbor: harbor[];
  product: product[];
}) {
  const [search, setSearch] = useState<{
    country?: string;
    harbor?: string;
    product?: string;
  }>();

  const debounce = useDebounce(search);

  const handleSubmit = () => {};

  return (
    <main className="h-screen container mx-auto grid place-content-center">
      <form
        className=" bg-white text-black rounded-lg w-[500px] p-8 space-y-8"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-2xl ">Form Barang</h2>
        <div className="space-y-6">
          <Autocomplete
            placeholder="Cari Nama Negara"
            label="Negara"
            options={countries}
            onChange={(value) => {}}
            onSelected={(value) => {}}
          />
          <Autocomplete
            disabled
            placeholder="Cari Nama Pelabuhan"
            label="Pelabuhan"
            options={[]}
            onChange={(value) => {}}
            onSelected={(value) => {}}
          />
          <Autocomplete
            disabled
            placeholder="Cari Nama Barang"
            label="Barang"
            options={[]}
            onChange={(value) => {}}
            onSelected={(value) => {}}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextField label="Diskon" endIcon onChange={() => {}} disabled />
            <TextField label="Harga" onChange={() => {}} />
          </div>
          <TextField label="Total" onChange={() => {}} />

          <textarea
            name=""
            id=""
            className={`border-b-2 disabled:bg-gray-300 disabled:placeholder:text-gray-500 focus:border-blue-500 border-gray-500 focus:outline-none p-2 pr-10 w-full rounded-t-lg `}
            readOnly
            placeholder="Some to do here"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button className="bg-indigo-400 text-white px-6 py-3 rounded-lg">
            Simpan
          </button>
        </div>
      </form>
    </main>
  );
}
