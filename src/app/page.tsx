
"use client"

import { About } from "@/components/home-page/About";
import { Demo } from "@/components/home-page/Demo";
import { Faq } from "@/components/home-page/Faq";
import { Footer } from "@/components/home-page/Footer";
import { Hero } from "@/components/home-page/Hero";
import Loading from "@/components/home-page/Loading";
import { Navbar } from "@/components/home-page/Navbar";
import { useEffect, useState } from "react";

export default function Home() {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
      }, []);

      if (isLoading) {
        return <Loading />;
      }



  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Demo />
      <Faq />
      <Footer />
    </>
  );
}
