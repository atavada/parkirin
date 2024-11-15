"use client"

import { useEffect, useState } from "react";

export const Hero = () => {
    const [offsetY, setOffsetY] = useState(0);

    const handleScroll = () => {
        setOffsetY(window.scrollY * 0.5);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <div
                className="w-full min-h-screen flex items-center pt-12 bg-cover bg-center relative"
                style={{
                    backgroundImage: "url('/parkir.jpg')",
                    backgroundPositionY: `${offsetY}px`
                }}
            >
                <div className="absolute inset-0 bg-black opacity-75"></div>

                <div className="container mx-auto relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left space-y-4 pl-0 md:pl-8">
                            <h1 className="text-white text-4xl lg:text-6xl font-bold cursor-default">Mau Duit?</h1>
                            <h1 className="text-white text-4xl lg:text-6xl font-bold cursor-default">
                                <span className="text-primary">Parkirin</span> Dulu Aja
                            </h1>
                            <p className="text-white text-lg lg:text-xl leading-relaxed font-medium cursor-default">
                                Solusi juru parkir untuk mendapatkan tempat bekerja yang nyaman
                            </p>
                            <button
                                id="aboutButton"
                                className="px-8 py-3 bg-primary border-primary text-white font-bold rounded-lg hover:bg-white hover:text-primary transition duration-300"
                            >
                                Selengkapnya
                            </button>
                        </div>
                        <div className="flex justify-center lg:justify-end mb-10 md:mb-0 pr-0 md:pr-10">
                            <img
                                className="w-[20rem] lg:w-4/5 rounded-2xl transition-transform duration-500 hover:scale-105"
                                src={"/parkirmotor.jpg"}
                                alt={""}
                                width={30}
                                height={30}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
