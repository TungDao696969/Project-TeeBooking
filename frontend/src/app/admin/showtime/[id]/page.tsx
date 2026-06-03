import ShowtimeDetail from "@/components/admin/showtime/showtime-detail";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function Page({ params }: Props) {
  const { id } = await params;

  return (
    <div className="container mx-auto py-8">
      <ShowtimeDetail id={id} />
    </div>
  );
}
