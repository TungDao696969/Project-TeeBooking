import { CinemaDetail } from "@/components/admin/cinema/cinema-detail";
interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CinemaDetailPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <CinemaDetail cinemaId={id} />
    </div>
  );
}
