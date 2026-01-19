'use client'
import { GoogleMapsEmbed } from '@next/third-parties/google'
import React, { useEffect, useState } from 'react'

function GoogleMap() {
  const [mapHeight, setMapHeight] = useState(210)

  useEffect(() => {
    const updateHeight = () => {
      const isMobile = window.innerWidth <= 768
      setMapHeight(isMobile ? 110 : 210)
    }
    updateHeight()

    window.addEventListener('resize', updateHeight)

    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return (
    <GoogleMapsEmbed
      id='footermap'
      apiKey={process.env.NEXT_PUBLIC_REVIEWS_API_KEY || ""}
      height={mapHeight}
      width="100%"
      mode="place"
      q="blinds+and+curtains+Dubai,Dubai,DXB"
    />
  )
}

export default GoogleMap
