import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Overview from './pages/Overview'
import FareDiscrepancies from './pages/FareDiscrepancies'
import FraudCompliance from './pages/FraudCompliance'
import SavingsOpportunities from './pages/SavingsOpportunities'
import PredictiveInsights from './pages/PredictiveInsights'
import AIAnalyst from './pages/AIAnalyst'
import { TravelDataProvider } from './context/TravelDataContext'
import styles from './App.module.css'
export default function App() {
  return (
    <TravelDataProvider>
      <BrowserRouter>
        <div className={styles.layout}>
          <Sidebar />
          <main className={styles.main}>
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/fare-discrepancies" element={<FareDiscrepancies />} />
              <Route path="/fraud-compliance" element={<FraudCompliance />} />
              <Route path="/savings" element={<SavingsOpportunities />} />
              <Route path="/predictive" element={<PredictiveInsights />} />
              <Route path="/ai-analyst" element={<AIAnalyst />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TravelDataProvider>
  )
}