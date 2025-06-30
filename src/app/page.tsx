import { countries, harbor, products } from "./action";
import Form from "./form";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;

  const countriesData = await countries({
    search: (query["country"] as string) ?? "",
  });
  const harborData = await harbor({
    search: (query["harbor"] as string) ?? "",
    id: (query["countryId"] as string) ?? "",
  });
  const prductsData = await products({
    search: (query["product"] as string) ?? "",
    id: (query["harborId"] as string) ?? "",
  });

  return (
    <Form countries={countriesData} harbor={harborData} product={prductsData} />
  );
}
