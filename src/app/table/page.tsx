"use client"

import React from 'react'
import { useState } from "react"
import { repos } from '@schemas/data'
import { DataTable } from '../components/DataTable'
import { columns } from './columns'
import { Progress } from "@/components/ui/progress"
import SidePanel from '@app/components/SidePanel'



export default function Table() {

  const [isOpen, setOpenSidepanel] = useState(false);

  return (
    <main className="flex flex-center flex-col min-h-screen justify-center ">
      <div><SidePanel isOpen={isOpen} stateChanger={setOpenSidepanel} /> </div>
      
      <h1 className='text-3xl text-center'>Repositories</h1>
      <div className='flex flex-col px-48 my-6'>
      <Progress value={66} />
      <span className='flex justify-center mt-2'>60/100 repos mapped 🚀 </span>
        
        </div>

      <div className='m-4'>

        <DataTable columns={columns} stateChanger={setOpenSidepanel} isOpen={isOpen} data={repos}></DataTable>

      </div>
    </main>
  )
}

