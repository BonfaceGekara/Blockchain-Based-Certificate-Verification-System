import React from 'react'
import { MdAdd, MdVerified, MdAttachMoney } from 'react-icons/md';
import { TbCertificate } from "react-icons/tb";
import { CiMoneyBill } from "react-icons/ci";

const Dashboard = () => {
  return (
    <div className='p-6 bg-gray-100 min-h-screen w-full'>

      <div className='items-center mb-6'>
        <h1 className='text-2xl font-semibold text-green-800'>
          Welcome, Administrator
        </h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>

        <div className='bg-white p-5 rounded-2xl shadow flex items-center justify-between'>
          <div>
            <p className='text-gray-500 text-sm'>Total Certificates</p>
            <h2 className='text-2xl font-bold'>0</h2>
          </div>
          <TbCertificate className='text-3xl text-green-600' />
        </div>

        <div className='bg-white p-5 rounded-2xl shadow flex items-center justify-between'>
          <div>
            <p className='text-gray-500 text-sm'>Verifications Done</p>
            <h2 className='text-2xl font-bold'>0</h2>
          </div>
          <MdVerified className='text-3xl text-blue-600' />
        </div>

        <div className='bg-white p-5 rounded-2xl shadow flex items-center justify-between'>
          <div>
            <p className='text-gray-500 text-sm'>Revenue (Ksh)</p>
            <h2 className='text-2xl font-bold'>0</h2>
          </div>
          <CiMoneyBill className='text-3xl text-red-600' />
        </div>

        <div className='bg-green-600 text-white p-5 rounded-2xl shadow flex items-center justify-between cursor-pointer hover:bg-green-700 transition'>
          <p className='text-lg font-medium'>Add Certificate</p>
          <MdAdd className='text-3xl' />
        </div>

      </div>

    </div>
  )
}

export default Dashboard;