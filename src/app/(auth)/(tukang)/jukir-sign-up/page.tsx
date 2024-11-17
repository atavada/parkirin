"use client"

import Loading from "@/components/home-page/Loading";
import { SignUpFormJukir } from "@/components/jukir-auth/SignUpFormJukir";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page() {
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
        <Image alt="banner" className="h-40 w-full rounded-xl mx-auto" height="550" src="/logo.png" width="550" />
			<SignUpFormJukir />
		</>
	);
}
