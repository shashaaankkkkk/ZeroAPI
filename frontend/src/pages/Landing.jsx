import React from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/landing/Banner'
import About_me from '../components/landing/About-me'
import Services from '../components/landing/Services'
function Landing() {
  return (
    <div>
<Navbar/>
<Banner/>
<Services/>
<About_me/>
    </div>
  )
}

export default Landing
