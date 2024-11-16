import { Navbar } from "@/components/home-page/Navbar";
import { Footer } from "@/components/home-page/Footer";
import DetailMitra from "@/components/jukir/DetailMitra";

interface PageProps {
  params: {
    id: string;
  };
}

export default function Page({ params }: PageProps) {
  return (
    <>
      <Navbar />
      <DetailMitra id={params.id} />
      <Footer />
    </>
  );
}