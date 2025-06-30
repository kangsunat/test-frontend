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
      `${url}/negaras${search && `?filter=${queryString}`}`
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
}: {
  search?: string;
}): Promise<harbor[]> {
  try {
    const filter = { where: { nama_pelabuhan: search } };
    const queryString = encodeURIComponent(JSON.stringify(filter));
    const response = await fetch(
      `${url}/pelabuhans${search && `?filter=${queryString}`}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}

// find all product by harborId
export async function products({
  search,
}: {
  search?: string;
}): Promise<product[]> {
  try {
    const filter = { where: { nama_barang: search } };
    const queryString = encodeURIComponent(JSON.stringify(filter));
    const response = await fetch(
      `${url}/barangs${search && `?filter=${queryString}`}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return [];
  }
}
