import { SignInForm } from '@/components/SignInForm'
import React from 'react'

function page() {
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
        <SignInForm />
    </div>
  )
}

export default page