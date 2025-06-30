"use client";

import { useEffect, useState } from "react";
import Autocomplete from "./autocomplete";
import TextField from "./textfield";
import { useRouter, useSearchParams } from "next/navigation";

export default function Form({
  countries,
  harbor,
  product,
}: {
  countries: country[];
  harbor: harbor[];
  product: product[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<{
    country?: country;
    harbor?: harbor;
    product?: product;
  }>({ country: undefined, harbor: undefined, product: undefined });

  const [harga, setHarga] = useState<number | null>(null);
  const [diskon, setDiskon] = useState<number | null>(null);
  const [total, setTotal] = useState<string>("");

  const handleSubmit = () => {};

  const handleChange = (
    key:
      | "country"
      | "harbor"
      | "product"
      | "countryId"
      | "harborId"
      | "product",
    value: string
  ) => {
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set(key, value);
    router.replace(`/?${currentParams.toString()}`);
  };

  useEffect(() => {
    // Gunakan nilai langsung dari state inputHarga dan inputDiskon
    const hargaNum = harga ?? 0; // Jika null, anggap 0
    const diskonNum = diskon ?? 0; // Jika null, anggap 0

    let calculatedTotal = 0;

    if (hargaNum >= 0) {
      if (diskonNum >= 0 && diskonNum <= 100) {
        // Diskon 0-100%
        calculatedTotal = hargaNum - hargaNum * (diskonNum / 100);
      } else {
        calculatedTotal = hargaNum; // Jika diskon tidak valid, total = harga
      }
    }
    console.log("needs changing value ", total, calculatedTotal);

    setTotal(
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      }).format(calculatedTotal)
    );
  }, [harga, diskon]);

  return (
    <main className="h-screen container mx-auto grid place-content-center">
      <form
        className=" bg-white text-black rounded-lg w-[500px] p-8 space-y-8"
        onSubmit={handleSubmit}
      >
        <h2 className="font-bold text-2xl ">Form Barang</h2>
        <div className="space-y-6">
          <Autocomplete<country>
            target="country"
            value={searchParams.get("country") ?? ""}
            placeholder="Cari Nama Negara"
            label="Negara"
            options={countries}
            onChange={(value) => {
              handleChange("country", value);
            }}
            onSelected={(value) => {
              // handleChange("country", value.nama_negara);
              handleChange("countryId", value.id_negara.toString());

              setSelected((prev) => ({
                country: value,
                harbor: undefined,
                product: undefined,
              }));
            }}
          />
          <Autocomplete<harbor>
            target="harbor"
            value={searchParams.get("harbor") ?? ""}
            disabled={!selected?.country}
            placeholder="Cari Nama Pelabuhan"
            label="Pelabuhan"
            options={harbor}
            onChange={(value) => handleChange("harbor", value)}
            onSelected={(value) => {
              handleChange("harborId", value.id_pelabuhan);
              setSelected((prev) => ({
                ...prev,
                harbor: value,
                product: undefined,
              }));
            }}
          />
          <Autocomplete<product>
            target="product"
            value={""}
            disabled={!selected?.harbor}
            placeholder="Cari Nama Pelabuhan"
            label="Pelabuhan"
            options={product}
            onChange={(value) => handleChange("product", value)}
            onSelected={(value) => {
              handleChange("product", value.nama_barang);
              setDiskon(value.diskon);
              setHarga(value.harga);
              setSelected((prev) => ({
                ...prev,
                product: value,
              }));
            }}
          />

          <div className="grid grid-cols-2 gap-4">
            <TextField
              type="number"
              label="Diskon"
              value={diskon ?? 0}
              endIcon
              onChange={(value) => {
                setDiskon(parseInt(value));
              }}
              disabled={!selected.product}
            />
            <TextField
              type="number"
              value={harga ?? 0}
              label="Harga"
              onChange={(value) => {
                setHarga(parseInt(value));
              }}
              disabled={!selected.product}
            />
          </div>
          <TextField
            type="text"
            label="Total"
            onChange={() => {}}
            value={total}
          />

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
