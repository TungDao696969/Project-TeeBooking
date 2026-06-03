import EditShowtimeForm from "@/components/admin/showtime/edit-showtime-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-8">
      <EditShowtimeForm id={id} />
    </div>
  );
}
