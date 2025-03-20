import Background from "@/components/Background";
import HeroMiddle from "@/components/HeroMiddle";
import Footer from "@/components/Footer";
import SignatureServices from "@/components/SignatureServices";
import Steps from "@/components/Steps";
export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-100 to-pink-100">
      <Background />
      <HeroMiddle />
      <SignatureServices />
      <Steps />
      <Footer />
    </main>
  );
}
