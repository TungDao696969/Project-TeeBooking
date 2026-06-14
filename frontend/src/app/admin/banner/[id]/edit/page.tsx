import EditBannerForm from "@/components/admin/banner/edit-banner-form";

interface EditBannerPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditBannerPage({ params }: EditBannerPageProps) {
  const { id } = await params;
  return <EditBannerForm id={id} />;
}
