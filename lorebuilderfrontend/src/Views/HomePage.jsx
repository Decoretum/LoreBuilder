import React, { useEffect } from 'react';
import Card from '@mui/material/Card';

export function Home() {

    // Sample function
    const getData = async () => {
       await window.electronAPI.getData();
    }

    useEffect(() => {
        getData();
    }, [])

  return (
    <>
      <Card>
      
        <div className='hero-container flex-column'>
          <div>
            <img src="/images/hero.png" alt="" />
          </div>
          <div className='d-flex w-75 mx-auto inter text-muted lh-lg'>
            <p>This is an application that was designed and developed by Gael Estrera, Shaira Eunice Aban, Beah Rentuaya, Andrea Tiongco, and Christian Dasalla for the final class project in CSCI 180.05. This application was designed and developed to be used as a Bike Management system for Ateneo de Manila University students and staff.</p>
          </div>
        </div>
        
      </Card>
      
    </>
    
  )
}