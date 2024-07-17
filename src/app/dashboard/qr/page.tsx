import dynamic from 'next/dynamic'
import React from 'react'

const LectorQr = dynamic(() => import('@/components/LectorQr/LectorQr'), {
  ssr: false,
})

const page = () => {
  return (
    <>
    <LectorQr/>
    </>
  )
}

export default page