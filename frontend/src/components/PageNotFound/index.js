import React from 'react'
import './index.css'

function PageNotFound() {
  if (!localStorage.getItem('alertShown')) {
    // Show the alert
    alert("You may have inputted invalid dates - double check the brand and dates you selected.");

    // Set a flag in localStorage to indicate that the alert has been shown
    localStorage.setItem('alertShown', true);
  }
  // {alert("You may have inputted invalid dates - double check the brand and dates you selected.")}
  return (
    <div className='page-not-found'>
    </div>
  )
}

export default PageNotFound;
