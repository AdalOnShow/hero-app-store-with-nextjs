import Banner from '@/components/home/Banner'
import OurApps from '@/components/home/OurApps'
import Stats from '@/components/home/Stats'
import React from 'react'

const Home = () => {
  return (
    <div>
      <section>
        <Banner />
      </section>
      <section className="py-10 bg-linear-to-tl to-[#632EE3] from-[#9F62F2] ">
        <Stats />
      </section>
      <section className="py-16">
        <OurApps />
      </section>
    </div>
  )
}

export default Home