import { createContext, useContext, useState, useMemo } from 'react'
import { demoRecords, computeStats } from '../data/demoData'

const TravelDataContext = createContext(null)

export function TravelDataProvider({ children }) {
  const [uploadedData,   setUploadedData]   = useState(null)
  const [fileName,       setFileName]       = useState(null)
  const [columnMapping,  setColumnMapping]  = useState(null)
  const [pendingFile,    setPendingFile]    = useState(null) // raw parse result awaiting mapper

  const isDemo     = !uploadedData
  const travelData = uploadedData || demoRecords
  const stats      = useMemo(() => computeStats(travelData), [travelData])

  function clearUpload() {
    setUploadedData(null)
    setFileName(null)
    setColumnMapping(null)
    setPendingFile(null)
  }

  return (
    <TravelDataContext.Provider value={{
      travelData, stats, isDemo,
      fileName,  setFileName,
      uploadedData, setUploadedData,
      columnMapping, setColumnMapping,
      pendingFile,   setPendingFile,
      clearUpload,
    }}>
      {children}
    </TravelDataContext.Provider>
  )
}

export function useTravelData() {
  return useContext(TravelDataContext)
}
