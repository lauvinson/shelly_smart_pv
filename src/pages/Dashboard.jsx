import React from 'react';
import { useShelly } from '../context/ShellyContext';
import { Card } from '../components/Card';
import { clsx } from 'clsx';

export const Dashboard = () => {
  const { systemStatus, connections, toggleConnection } = useShelly();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">PV System Overview</h2>
          <p className="text-gray-500 mt-1">Real-time monitoring and performance analysis.</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span> System Healthy</span>
             <span className="text-gray-300">|</span>
             <span>Last updated: Live</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 h-40 flex flex-col justify-between relative group">
          <div className="absolute -right-4 -top-4 bg-primary/5 w-32 h-32 rounded-full group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Current Power</p>
              <h3 className="text-3xl font-bold text-text-main dark:text-white">{systemStatus.pvPower} <span className="text-lg text-gray-400 font-normal">kW</span></h3>
            </div>
            <span className="material-symbols-outlined text-primary bg-primary/10 p-2.5 rounded-xl">solar_power</span>
          </div>
          <div className="flex items-center gap-1 text-eco-green text-sm font-medium mt-auto z-10">
            <span className="material-symbols-outlined text-lg">trending_up</span>
            <span>+12% vs avg</span>
          </div>
        </Card>

        <Card className="p-6 h-40 flex flex-col justify-between relative group">
          <div className="absolute -right-4 -top-4 bg-green-50 w-32 h-32 rounded-full group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Daily Energy</p>
              <h3 className="text-3xl font-bold text-text-main dark:text-white">{systemStatus.todayEnergy} <span className="text-lg text-gray-400 font-normal">kWh</span></h3>
            </div>
            <span className="material-symbols-outlined text-eco-green bg-green-100 p-2.5 rounded-xl">battery_charging_full</span>
          </div>
          <div className="flex items-center gap-1 text-eco-green text-sm font-medium mt-auto z-10">
             <span className="material-symbols-outlined text-lg">trending_up</span>
             <span>+5% vs yesterday</span>
          </div>
        </Card>

        <Card className="p-6 h-40 flex flex-col justify-between relative group">
          <div className="absolute -right-4 -top-4 bg-blue-50 w-32 h-32 rounded-full group-hover:scale-110 transition-transform"></div>
           <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Inverter Eff.</p>
              <h3 className="text-3xl font-bold text-text-main dark:text-white">{systemStatus.inverterEfficiency}<span className="text-lg text-gray-400 font-normal">%</span></h3>
            </div>
            <span className="material-symbols-outlined text-blue-500 bg-blue-100 p-2.5 rounded-xl">donut_large</span>
          </div>
           <div className="flex items-center gap-1 text-gray-400 text-sm font-medium mt-auto z-10">
             <span className="material-symbols-outlined text-lg">remove</span>
             <span>Stable</span>
           </div>
        </Card>

        <Card className="p-6 h-40 flex flex-col justify-between relative group">
          <div className="absolute -right-4 -top-4 bg-purple-50 w-32 h-32 rounded-full group-hover:scale-110 transition-transform"></div>
          <div className="flex justify-between items-start z-10">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Grid Balance</p>
              <h3 className="text-3xl font-bold text-text-main dark:text-white">{systemStatus.gridPower > 0 ? '+' : ''}{systemStatus.gridPower} <span className="text-lg text-gray-400 font-normal">kW</span></h3>
            </div>
            <span className="material-symbols-outlined text-purple-500 bg-purple-100 p-2.5 rounded-xl">grid_view</span>
          </div>
          <div className="flex items-center gap-1 text-primary text-sm font-medium mt-auto z-10">
             <span className="material-symbols-outlined text-lg">arrow_outward</span>
             <span>{systemStatus.gridPower < 0 ? 'Exporting' : (systemStatus.gridPower === 0 ? 'Islanded' : 'Importing')}</span>
          </div>
        </Card>
      </div>

      {/* Energy Flow & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         <Card className="lg:col-span-2 p-6 min-h-[500px] flex flex-col relative overflow-hidden">
             <div className="flex justify-between items-center mb-6 z-10">
                 <div className="flex items-center gap-3">
                     <div className="bg-orange-50 p-2 rounded-lg">
                        <span className="material-symbols-outlined text-primary">hub</span>
                     </div>
                     <div>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Real-time Energy Flow</h3>
                        <p className="text-xs text-gray-500">Live interaction & disconnection simulation</p>
                     </div>
                 </div>
             </div>

             {/* Flow Visualization */}
             <div className="flex-1 relative bg-gradient-to-br from-gray-50 to-white dark:from-[#2a1d15] dark:to-[#33241b] rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                    {/* PV to Inverter */}
                    <path className={clsx("flow-animation flow-fast", !connections.pv && "opacity-20")} d="M15% 50% L 50% 50%" fill="none" stroke="#f26c0d" strokeWidth="3" />

                    {/* Inverter to Grid (Curve) */}
                    <path className={clsx("flow-animation flow-slow", (!connections.grid || !connections.pv) && "opacity-20")} d="M50% 50% Q 85% 50% 85% 20%" fill="none" stroke="#3b82f6" strokeWidth="3" />

                    {/* Inverter to Home (Curve) */}
                    <path className={clsx("flow-animation flow-normal", !connections.home && "opacity-20")} d="M50% 50% Q 85% 50% 85% 80%" fill="none" stroke="#4caf50" strokeWidth="3" />

                    {/* Inverter to Battery (Straight Down) */}
                    <path className={clsx("flow-animation flow-slow", !connections.battery && "opacity-20")} d="M50% 50% L 50% 85%" fill="none" stroke="#4caf50" strokeWidth="3" />
                </svg>

                {/* Simulation Toggles on Lines */}
                {/* PV Line Toggle */}
                <div className="absolute left-[32.5%] top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group" onClick={() => toggleConnection('pv')}>
                    <div className={clsx("w-8 h-4 rounded-full relative transition-colors shadow-md border border-white", connections.pv ? "bg-green-500" : "bg-gray-300")}>
                        <div className={clsx("absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all", connections.pv ? "right-0.5" : "left-0.5")}></div>
                    </div>
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                        Simulate PV Cut
                    </div>
                </div>

                {/* Grid Line Toggle */}
                <div className="absolute left-[70%] top-[30%] -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group" onClick={() => toggleConnection('grid')}>
                    <div className={clsx("w-8 h-4 rounded-full relative transition-colors shadow-md border border-white", connections.grid ? "bg-green-500" : "bg-gray-300")}>
                        <div className={clsx("absolute top-0.5 w-3 h-3 bg-white rounded-full shadow-sm transition-all", connections.grid ? "right-0.5" : "left-0.5")}></div>
                    </div>
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap pointer-events-none">
                        Simulate Grid Loss
                    </div>
                </div>

                {/* Nodes */}
                {/* PV Node */}
                <div className="absolute left-[15%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
                     <div className={clsx("glass-panel w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all border-transparent", !connections.pv && "opacity-50 grayscale")}>
                        <span className="material-symbols-outlined text-3xl text-primary mb-2">solar_power</span>
                        <span className="font-bold text-xs text-gray-800">PV Array</span>
                        <span className="text-[10px] text-gray-500 font-mono mt-1">{systemStatus.pvPower} kW</span>
                     </div>
                </div>

                {/* Inverter Node (Center) */}
                <div className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="glass-panel w-32 h-32 rounded-2xl flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-xl hover:border-gray-300 relative">
                        <div className={clsx("absolute top-2 right-2 w-2 h-2 rounded-full animate-pulse", connections.pv ? "bg-green-500" : "bg-red-500")}></div>
                        <span className="material-symbols-outlined text-5xl text-gray-700 mb-1">electric_meter</span>
                        <span className="font-bold text-xs text-gray-800">Inverter</span>
                        <span className="text-[10px] text-eco-green font-medium">{connections.pv ? 'Active' : 'Standby'}</span>
                    </div>
                </div>

                {/* Grid Node */}
                <div className="absolute left-[85%] top-[20%] -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className={clsx("glass-panel w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all border-transparent", !connections.grid && "opacity-50 grayscale")}>
                        <span className="material-symbols-outlined text-3xl text-electric-blue mb-1">grid_4x4</span>
                        <span className="font-bold text-xs text-gray-800">Grid</span>
                        <span className="text-[10px] text-primary font-bold font-mono">{Math.abs(systemStatus.gridPower)} kW {systemStatus.gridPower < 0 ? 'Exp' : 'Imp'}</span>
                    </div>
                </div>

                {/* Home Node */}
                <div className="absolute left-[85%] top-[80%] -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="glass-panel w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-xl hover:border-eco-green border-transparent">
                         <span className="material-symbols-outlined text-3xl text-eco-green mb-1">home</span>
                         <span className="font-bold text-xs text-gray-800">Home</span>
                         <span className="text-[10px] text-gray-500 font-mono">{systemStatus.homeConsumption} kW</span>
                    </div>
                </div>

                {/* Battery Node */}
                <div className="absolute left-[50%] top-[85%] -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="glass-panel w-24 h-24 rounded-2xl flex flex-col items-center justify-center transition-all hover:scale-105 hover:shadow-xl hover:border-eco-green border-transparent relative">
                         <div className="absolute -right-2 top-0 bg-eco-green text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm">{systemStatus.battery.soc}%</div>
                         <span className="material-symbols-outlined text-3xl text-eco-green mb-1">battery_charging_full</span>
                         <span className="font-bold text-xs text-gray-800">Battery</span>
                         <span className="text-[10px] text-gray-500 font-mono">{systemStatus.battery.status}</span>
                    </div>
                </div>

             </div>
         </Card>

         <div className="flex flex-col gap-6">
             {/* Recent Events List */}
             <Card className="p-6 flex-1 flex flex-col">
                 <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Events</h3>
                     <button className="text-xs text-primary font-bold hover:underline">View All</button>
                 </div>
                 <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
                     <div className="flex gap-4 items-start">
                         <div className="flex flex-col items-center">
                             <div className="w-2 h-2 rounded-full bg-red-500 mt-2"></div>
                             <div className="w-px h-full bg-gray-100 my-1"></div>
                         </div>
                         <div className="pb-4 border-b border-gray-50 flex-1">
                             <div className="flex justify-between items-start">
                                 <h4 className="text-sm font-bold text-gray-900 dark:text-white">Critical: Low Voltage</h4>
                                 <span className="text-[10px] text-gray-400">10:42 AM</span>
                             </div>
                             <p className="text-xs text-gray-500 mt-1">String 2 voltage dropped below 180V threshold.</p>
                         </div>
                     </div>
                     {/* More events... */}
                     <div className="flex gap-4 items-start">
                         <div className="flex flex-col items-center">
                             <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                         </div>
                         <div className="pb-4 flex-1">
                             <div className="flex justify-between items-start">
                                 <h4 className="text-sm font-bold text-gray-900 dark:text-white">System Backup</h4>
                                 <span className="text-[10px] text-gray-400">02:00 AM</span>
                             </div>
                             <p className="text-xs text-gray-500 mt-1">Automated daily data backup completed.</p>
                         </div>
                     </div>
                 </div>
             </Card>
         </div>
      </div>
    </div>
  );
};
