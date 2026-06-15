import EditCityForm from "@/components/admin/city/edit-city-form";

export default function EditCityPage({ params }: { params: { id: string } }) {
  return <EditCityForm id={params.id} />;
}
