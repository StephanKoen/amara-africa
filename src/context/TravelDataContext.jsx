import { createContext, useContext, useState } from 'react'

const TravelDataContext = createContext(null)

export function TravelDataProvider({ children }) {
  const [travelData, setTravelData] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [parsedSummary, setParsedSummary] = useState(null)

  return (
    <TravelDataContext.Provider value={{
      travelData, setTravelData,
      fileName, setFileName,
      parsedSummary, setParsedSummary,
    }}>
      {children}
    </TravelDataContext.Provider>
  )
}

export function useTravelData() {
  return useContext(TravelDataContext)
}
