import GenerateSeatForm from "@/components/admin/seat/seat-generate";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;

  return <GenerateSeatForm roomId={id} />;
}
