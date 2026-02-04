import LoginHeader from "../../components/login/LoginHeader";
import LoginHero from "../../components/login/LoginHero";
import Footer from "../../components/landing/Footer";

export default function Login() {

  return (
    <div className="min-h-screen bg-black flex flex-col">

      <LoginHeader />

      <LoginHero />

      <Footer />

    </div>
  );
}
