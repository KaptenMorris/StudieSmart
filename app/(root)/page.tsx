import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
    <section className='card-cta'>
      <div className='flex flex-col gap-6 max-w-lg'>
        <h2>Gör dig redo för intervju med AI-driven övning och feedback</h2>

        <p className='text-lg'>
        Öva på riktiga intervjufrågor och få omedelbar feedback
        </p>

        <Button asChild className='btn-primary max-sm:w-full'> 
          <Link href="/intervju">Starta en intervju</Link>
        </Button>
      </div>

      <Image src="/robot.png" alt="hero" width={400} height={400} className='max-sm:hidden'/>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
      <h2>Dina intervjuer</h2>

      <div className='interviews-section'>
          {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}

          {/* <p>Du har inte tagit några intervjuer än</p> */}
      </div>
    </section>

    <section className='flex flex-col gap-6 mt-8'>
        <h2>Ta en intervju</h2>

        <div className='interviews-section'>
        {dummyInterviews.map((interview) => (
            <InterviewCard {...interview} key={interview.id}/>
          ))}
        </div>
    </section>
      </>
  )
}

export default page