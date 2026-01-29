import React, { createContext, useContext, useState, useEffect } from 'react';

const ShellyContext = createContext();

export const useShelly = () => {
  const context = useContext(ShellyContext);
  if (!context) {
    throw new Error('useShelly must be used within a ShellyProvider');
  }
  return context;
};

export const ShellyProvider = ({ children }) => {
  // Connection States for Simulation
  const [connections, setConnections] = useState({
    pv: true,
    grid: true,
    home: true,
    battery: true
  });

  // Mock Data State
  const [systemStatus, setSystemStatus] = useState({
    pvPower: 5.2, // kW
    gridPower: -1.2, // kW (Negative = Export)
    homeConsumption: 3.0, // kW
    battery: {
      soc: 90, // %
      power: 0, // kW
      status: 'Standby'
    },
    inverterEfficiency: 96.5,
    todayEnergy: 24.5, // kWh
  });

  const [devices, setDevices] = useState([
    { id: 'dev-1', name: 'Main Breaker 3EM', type: 'Shelly Pro 3EM', ip: '192.168.1.101', status: 'Online', power: 12.4, voltage: 230.1 },
    { id: 'dev-2', name: 'Inverter - East Wing', type: 'Huawei Sun2000', ip: '192.168.1.105', status: 'Offline', power: 0, voltage: 0 },
    { id: 'dev-3', name: 'Battery Room Sensor', type: 'Shelly H&T Gen3', ip: '192.168.1.112', status: 'Warning', temp: 45, humidity: 40 },
    { id: 'dev-4', name: 'Solar Array A Relay', type: 'Shelly Plus 1PM', ip: '192.168.1.108', status: 'Online', power: 4.2, voltage: 229.8 },
    { id: 'dev-5', name: 'Control Room Motion', type: 'Shelly Motion 2', ip: '192.168.1.120', status: 'Online', battery: 85 },
  ]);

  const [alarms, setAlarms] = useState([
    { id: 'al-1', severity: 'Critical', title: 'Inverter Connection Lost', message: 'Huawei Sun2000 failed to respond to 3 consecutive pings.', time: '2 min ago' },
    { id: 'al-2', severity: 'Major', title: 'High Temp Warning', message: 'Battery Room Sensor reporting 45°C. Check cooling systems.', time: '1 hour ago' },
    { id: 'al-3', severity: 'Minor', title: 'Firmware Update Available', message: 'New update v1.4.2 available for 3 devices.', time: '4 hours ago' },
  ]);

  const [scripts, setScripts] = useState([
    { id: 'sc-1', name: 'Grid Export Limit', status: 'Running', cpu: 12, mem: 48, icon: 'bolt', color: 'blue' },
    { id: 'sc-2', name: 'Load Shifting - EV', status: 'Running', cpu: 5, mem: 22, icon: 'ev_station', color: 'green' },
    { id: 'sc-3', name: 'Night Mode Opt.', status: 'Stopped', cpu: 0, mem: 0, icon: 'dark_mode', color: 'gray' },
  ]);

  // Simulation Effect: Fluctuate values slightly to simulate live data
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => {
        // PV Generation
        let fluctuation = Math.random() * 0.1 - 0.05;
        let basePv = connections.pv ? Math.max(0, prev.pvPower + fluctuation) : 0;

        // Home Consumption
        let baseHome = connections.home ? Math.max(0.5, prev.homeConsumption + (Math.random() * 0.05 - 0.025)) : 0;

        // Grid Calculation
        // Grid = Home - PV
        // If Grid is disconnected, it cannot Import or Export.
        // In a real scenario, if PV > Home and Grid is off, PV must curtail or charge battery.
        // Here we simplify: if Grid off, we assume system islanding or curtailment.

        let calculatedGrid = baseHome - basePv;

        if (!connections.grid) {
            calculatedGrid = 0;
            // If Grid is off and PV < Home, we drain battery? (Mock logic)
        }

        return {
          ...prev,
          pvPower: +basePv.toFixed(2),
          homeConsumption: +baseHome.toFixed(2),
          gridPower: +calculatedGrid.toFixed(2),
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [connections]);

  const toggleScript = (id) => {
    setScripts(prev => prev.map(s =>
      s.id === id ? { ...s, status: s.status === 'Running' ? 'Stopped' : 'Running' } : s
    ));
  };

  const acknowledgeAlarm = (id) => {
    setAlarms(prev => prev.filter(a => a.id !== id));
  };

  const toggleConnection = (key) => {
      setConnections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const addDevice = (device) => {
      setDevices(prev => [...prev, { ...device, id: `dev-${Date.now()}`, status: 'Offline', power: 0 }]);
  };

  return (
    <ShellyContext.Provider value={{
        systemStatus,
        connections,
        toggleConnection,
        devices,
        addDevice,
        alarms,
        scripts,
        toggleScript,
        acknowledgeAlarm
    }}>
      {children}
    </ShellyContext.Provider>
  );
};
