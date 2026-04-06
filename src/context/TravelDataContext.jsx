import { createContext, useContext, useState } from 'react'

const TravelDataContext = createContext(null)

export function TravelDataProvider({ children }) {
  const [travelData, setTravelData] = useState(null)
  const [fileName, setFileName] = useState(null)

  return (
    <TravelDataContext.Provider value={{ travelData, setTravelData, fileName, setFileName }}>
      {children}
    </TravelDataContext.Provider>
  )
}

export function useTravelData() {
  return useContext(TravelDataContext)
}
