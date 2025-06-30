type country = {
  id_negara: number;
  kode_negara: string;
  nama_negara: string;
};

type harbor = {
  id_pelabuhan: string;
  nama_pelabuhan: string;
  id_negara: string;
};

type product = {
  id_barang: number;
  nama_barang: string;
  id_pelabuhan: number;
  description: string;
  diskon: number;
  harga: number;
};
