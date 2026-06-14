import CreateBannerForm from "@/components/admin/banner/create-banner-form";

export default function CreateBannerPage() {
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Create Banner</h1>

        <p className="text-muted-foreground">
          Create a new banner for the homepage.
        </p>
      </div>

      {/* Form */}
      <CreateBannerForm />
    </div>
  );
}
