import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";
export default function ForgotPasswordPage() {
  return (
    <div>
      <Header />
      <div className="flex py-10 mb-20 items-center justify-center">
        <div className="w-full max-w-md shadow">
          <ForgotPasswordForm />
        </div>
      </div>
      <Footer />
    </div>
  );
}
