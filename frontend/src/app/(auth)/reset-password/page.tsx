import ResetPasswordForm from "@/components/auth/reset-password-form";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
export default function ResetPasswordPage() {
  return (
    <div>
      <Header />
      <div className="flex py-10 mb-20 items-center justify-center">
        <div className="w-full max-w-md shadow">
          <ResetPasswordForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
