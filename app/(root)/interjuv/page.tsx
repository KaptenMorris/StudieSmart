import Agent from '@/components/Agent'
import React from 'react'

const page = () => {
  return (
    <>
     <h3>Interjuv Generation</h3>

     <Agent userName="Jag" userId="user1" type="generate" />
    </>
  )
}

export default page