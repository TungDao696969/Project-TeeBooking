import { CinemaUpdateForm } from "@/components/admin/cinema/cinema-update-form";

interface Props {
  params: Promise<{
    cinemaId: string;
  }>;
}

export default async function EditCinemaPage({ params }: Props) {
  const { cinemaId } = await params;

  return (
    <div className="space-y-6">
      <CinemaUpdateForm cinemaId={cinemaId} />
    </div>
  );
}
