import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {

  const [date,setDate]=useState('')

  const setDates=()=>{
    let d = new Date().getFullYear()
    setDate(d)
    console.log(d)
  }
  
  useEffect(()=>{
    setDates()
  },[])
  
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-2 my-2 border-top ">
        <div className="col-md-4 d-flex align-items-center mx-auto">
          <Link href="/" class="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          </Link>
          <p className="text-muted mx-auto">© {date} GoFood, Inc</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer