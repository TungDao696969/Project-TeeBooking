import { CinemaDetail } from "@/components/admin/cinema/cinema-detail";
interface Props {
  params: Promise<{
    cinemaId: string;
  }>;
}

export default async function CinemaDetailPage({ params }: Props) {
  const { cinemaId } = await params;

  return (
    <div className="space-y-6">
      <CinemaDetail cinemaId={cinemaId} />
    </div>
  );
}
