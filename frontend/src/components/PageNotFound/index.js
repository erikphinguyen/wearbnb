import React, { useState, useEffect } from 'react'
import './index.css'

function PageNotFound() {
  const [alertShown, setAlertShown] = useState(false);

  useEffect(() => {
    if (!alertShown) {
      // Show the alert
      alert("You may have inputted invalid dates - double check the brand and dates you selected.\nNote that you can NOT book a brand for today or in the past.");
      // Set the flag to indicate that the alert has been shown
      setAlertShown(true);
    }
  }, [alertShown]);

  return (
    <div className='page-not-found'>
    </div>
  )
}

export default PageNotFound;
