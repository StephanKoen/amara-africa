import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { TravelDataProvider, useTravelData } from './context/TravelDataContext'
import Sidebar     from './components/Sidebar'
import Topbar      from './components/Topbar'
import DemoBanner  from './components/DemoBanner'
import UpgradeBanner from './components/UpgradeBanner'
import ColumnMapper from './components/ColumnMapper'
import WelcomePopup from './components/WelcomePopup'
import Login        from './pages/Login'
import Demo         from './pages/Demo'
import UploadData   from './pages/UploadData'
import Overview     from './pages/Overview'
import FareDiscrepancies   from './pages/FareDiscrepancies'
import FraudCompliance     from './pages/FraudCompliance'
import SavingsOpportunities from './pages/SavingsOpportunities'
import UnusedCredits       from './pages/UnusedCredits'
import ContractOpportunities from './pages/ContractOpportunities'
import ReportsAnalytics    from './pages/ReportsAnalytics'
import PredictiveInsights  from './pages/PredictiveInsights'
import AIAnalyst           from './pages/AIAnalyst'
import TMCPortal           from './pages/TMCPortal'
import RiskIntelligence    from './pages/RiskIntelligence'
import styles from './App.module.css'

function AppShell() {
  const { user, showWelcome, setShowWelcome } = useAuth()
  const { pendingFile, setPendingFile, setUploadedData, setFileName } = useTravelData()

  function handleConfirmMapping(records, mapping) {
    setUploadedData(records)
    setFileName(pendingFile.fileName)
    setPendingFile(null)
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/demo"  element={<Demo />} />
        <Route path="*"      element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.body}>
        <Topbar />
        <DemoBanner />
        <main className={styles.main}>
          <Routes>
            <Route path="/"                 element={<Navigate to="/overview" replace />} />
            <Route path="/overview"         element={<Overview />} />
            <Route path="/upload"           element={<UploadData />} />
            <Route path="/fare-discrepancies" element={<FareDiscrepancies />} />
            <Route path="/fraud-compliance"   element={<FraudCompliance />} />
            <Route path="/savings"            element={<SavingsOpportunities />} />
            <Route path="/unused-credits"     element={<UnusedCredits />} />
            <Route path="/contracts"          element={<ContractOpportunities />} />
            <Route path="/reports"            element={<ReportsAnalytics />} />
            <Route path="/predictive"         element={<PredictiveInsights />} />
            <Route path="/ai-analyst"         element={<AIAnalyst />} />
            <Route path="/tmc-portal"          element={<TMCPortal />} />
            <Route path="/risk-intelligence"  element={<RiskIntelligence />} />
            <Route path="*"                   element={<Navigate to="/overview" replace />} />
          </Routes>
        </main>
        <UpgradeBanner />
      </div>
      {showWelcome && <WelcomePopup onClose={() => setShowWelcome(false)} />}
      {pendingFile  && (
        <ColumnMapper
          data={pendingFile}
          onConfirm={handleConfirmMapping}
          onCancel={() => setPendingFile(null)}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <TravelDataProvider>
          <AppShell />
        </TravelDataProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
