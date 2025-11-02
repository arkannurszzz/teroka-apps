import About from "@/pages/Landing/About";
import Explore from "@/pages/Landing/Explore";
import Hero from "@/pages/Landing/Hero";
import InviteForm from "@/pages/Landing/Invite-form";
import Option from "@/pages/Landing/Option";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <About />
      <Option />
      <Explore />
      <InviteForm />
    </div>
  );
}
