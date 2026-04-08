export function matchRisksToTravelers(riskEvents, records) {
  const results = []

  riskEvents.forEach(risk => {
    const affectedBookings = []

    records.forEach(record => {
      const origin = (record.originCode || record.origin || '').toUpperCase()
      const dest = (record.destinationCode || record.destination || '').toUpperCase()
      const traveler = record.travelerName || record.traveler || 'Unknown'
      const travelDate = record.travelDate || record.date

      const airportMatch = risk.affectedAirports.some(airport =>
        origin.includes(airport) || dest.includes(airport)
      )

      const countryMatch = risk.affectedCountries.some(country => {
        const airportCountryMap = {
          'LHR': 'GB', 'LGW': 'GB', 'AMS': 'NL', 'CDG': 'FR',
          'JNB': 'ZA', 'CPT': 'ZA', 'DXB': 'AE', 'AUH': 'AE',
          'JFK': 'US', 'EWR': 'US', 'NBO': 'KE', 'IST': 'TR',
          'SIN': 'SG', 'DUR': 'ZA'
        }
        return airportCountryMap[origin] === country ||
               airportCountryMap[dest] === country
      })

      if (airportMatch || countryMatch) {
        affectedBookings.push({
          traveler,
          origin,
          destination: dest,
          date: travelDate,
          bookingRef: record.bookingRef || record.id || 'N/A',
          phone: record.travelerPhone || null,
          email: record.travelerEmail || null
        })
      }
    })

    if (affectedBookings.length > 0) {
      results.push({
        ...risk,
        affectedTravelers: affectedBookings,
        affectedCount: affectedBookings.length
      })
    }
  })

  return results.sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
    return severityOrder[a.severity] - severityOrder[b.severity]
  })
}

export function getTravelerLocations(records) {
  const today = new Date()
  const locations = []

  records.forEach(record => {
    const travelDate = new Date(record.travelDate || record.date)
    const daysDiff = Math.abs((today - travelDate) / (1000 * 60 * 60 * 24))

    if (daysDiff <= 3) {
      const destCode = (record.destinationCode || record.destination || '').toUpperCase()
      const coords = getAirportCoords(destCode)
      if (coords) {
        locations.push({
          traveler: record.travelerName || record.traveler || 'Unknown',
          location: record.destination || destCode,
          airportCode: destCode,
          lat: coords.lat + (Math.random() - 0.5) * 0.5,
          lng: coords.lng + (Math.random() - 0.5) * 0.5,
          travelDate: record.travelDate,
          bookingRef: record.bookingRef || 'N/A',
          department: record.department || 'Unknown'
        })
      }
    }
  })

  if (locations.length === 0) {
    return getDemoTravelerLocations()
  }

  return locations
}

function getDemoTravelerLocations() {
  return [
    { traveler: 'Sarah Johnson', location: 'London', airportCode: 'LHR', lat: 51.5074, lng: -0.1278, department: 'Sales', bookingRef: 'SAA-2024-023' },
    { traveler: 'Mike Peters', location: 'Dubai', airportCode: 'DXB', lat: 25.2048, lng: 55.2708, department: 'Executive', bookingRef: 'EK-2024-045' },
    { traveler: 'Lisa van Wyk', location: 'Amsterdam', airportCode: 'AMS', lat: 52.3676, lng: 4.9041, department: 'Sales', bookingRef: 'KL-2024-067' },
    { traveler: 'James Okafor', location: 'New York', airportCode: 'JFK', lat: 40.6413, lng: -73.7781, department: 'Marketing', bookingRef: 'SA-2024-089' },
    { traveler: 'Priya Naidoo', location: 'Singapore', airportCode: 'SIN', lat: 1.3644, lng: 103.9915, department: 'Engineering', bookingRef: 'SQ-2024-112' },
    { traveler: 'David Chen', location: 'Nairobi', airportCode: 'NBO', lat: -1.2921, lng: 36.8219, department: 'Operations', bookingRef: 'KQ-2024-134' },
    { traveler: 'Emma Williams', location: 'Paris', airportCode: 'CDG', lat: 48.8566, lng: 2.3522, department: 'Marketing', bookingRef: 'AF-2024-156' },
  ]
}

function getAirportCoords(code) {
  const airports = {
    'LHR': { lat: 51.4700, lng: -0.4543 },
    'LGW': { lat: 51.1537, lng: -0.1821 },
    'AMS': { lat: 52.3105, lng: 4.7683 },
    'CDG': { lat: 49.0097, lng: 2.5479 },
    'JNB': { lat: -26.1392, lng: 28.2460 },
    'CPT': { lat: -33.9648, lng: 18.6017 },
    'DXB': { lat: 25.2532, lng: 55.3657 },
    'AUH': { lat: 24.4330, lng: 54.6511 },
    'JFK': { lat: 40.6413, lng: -73.7781 },
    'EWR': { lat: 40.6895, lng: -74.1745 },
    'NBO': { lat: -1.3192, lng: 36.9275 },
    'IST': { lat: 41.2753, lng: 28.7519 },
    'SIN': { lat: 1.3644, lng: 103.9915 },
    'DUR': { lat: -29.6144, lng: 31.1197 },
  }
  return airports[code] || null
}
