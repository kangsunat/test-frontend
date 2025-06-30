"use server";

const url = "http://202.157.176.100:3001";

// find all country
export async function countries({
  search,
}: {
  search?: string;
}): Promise<country[]> {
  try {
    const filter = { where: { nama_negara: search } };
    const queryString = encodeURIComponent(JSON.stringify(filter));
    const response = await fetch(
      `${url}/negaras${search && `?filter=${queryString}`}`,
      { cache: "no-store" }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return [];
  }
}

// find all harbor by countryId
export async function harbor({
  search,
  id,
}: {
  search?: string;
  id?: string;
}): Promise<harbor[]> {
  try {
    const filter = {
      where: { ...(search && { nama_pelabuhan: search }), id_negara: id },
    };

    const queryString = encodeURIComponent(JSON.stringify(filter));
    const response = await fetch(`${url}/pelabuhans?filter=${queryString}`, {
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}

// find all product by harborId
export async function products({
  search,
  id,
}: {
  search?: string;
  id?: string;
}): Promise<product[]> {
  try {
    const filter = {
      where: { ...(search && { nama_barang: search }), id_pelabuhan: id },
    };
    const queryString = encodeURIComponent(JSON.stringify(filter));
    const response = await fetch(`${url}/barangs?filter=${queryString}`, {
      cache: "no-store",
    });
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}
