import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ShellyProvider } from './context/ShellyContext';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Devices } from './pages/Devices';
import { Scripts } from './pages/Scripts';
import { Analytics } from './pages/Analytics';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';

function App() {
  return (
    <ShellyProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="devices" element={<Devices />} />
            <Route path="scripts" element={<Scripts />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ShellyProvider>
  );
}

export default App;
