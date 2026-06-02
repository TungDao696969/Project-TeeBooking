import { CinemaUpdateForm } from "@/components/admin/cinema/cinema-update-form";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCinemaPage({ params }: Props) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <CinemaUpdateForm cinemaId={id} />
    </div>
  );
}
