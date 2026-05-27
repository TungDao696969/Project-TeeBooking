import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
import ProfileForm from "@/components/profile/profile-form";

export default function ProfilePage() {
  return (
    <div>
      <Header />
      <div className="min-h-screen px-4 py-10">
        <ProfileForm />
      </div>
      <Footer />
    </div>
  );
}
