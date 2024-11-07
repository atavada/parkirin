import { SignInForm } from "@/components/jukir-auth/SignInForm";
import React from "react";
import Image from "next/image";

export default function Page() {
	return (
		<div className="flex justify-center items-center min-h-screen">
			{/* <div className="bg-primary rounded-md p-5">
            <h1 className='text-white text-center font-bold text-2xl md:text-4xl mb-10'>
                Sign In
            </h1>
            <div className="flex flex-col">
                <label className='text-white'>No. Handphone</label>
                <input type="text" className='bg-white rounded-md p-1 mb-5'/>
                <label className='text-white'>Password</label>
                <input type="text" className='bg-white rounded-md p-1 mb-5'/>
                <label className='text-white'>Konfirmasi Password</label>
                <input type="text" className='bg-white rounded-md p-1 mb-5'/>
            </div>
            <div className="flex items-center justify-center">
                <button className="flex items-center justify-center p-3 bg-white text-primary rounded-md">
                    Simpan
                </button>
            </div>
        </div> */}

			<div className="space-y-6 p-4">
				<div className="rounded-xl shadow">
					<Image
						alt="banner"
						className="h-40 w-full rounded-xl mx-auto"
						height="550"
						src="/dummy-image.jpg"
						width="550"
					/>
				</div>
				<SignInForm />
			</div>
		</div>
	);
}
