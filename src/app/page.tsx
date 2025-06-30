import { countries, harbor, products } from "./action";
import Form from "./form";

export default async function Page() {
  const countriesData = await countries({ search: "" });
  const harborData = await harbor({ search: "" });
  const prductsData = await products({ search: "" });

  return (
    <Form countries={countriesData} harbor={harborData} product={prductsData} />
  );
}
