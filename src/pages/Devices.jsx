import React from 'react';
import { useShelly } from '../context/ShellyContext';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';

export const Devices = () => {
  const { devices, alarms } = useShelly();

  return (
    <div className="flex flex-col gap-6">
       <div className="flex flex-col gap-1 mb-2">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Device Assets & Health</h2>
            <p className="text-gray-500 text-sm">Monitor infrastructure status, active alarms, and network topology.</p>
       </div>

       <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
           {/* Table */}
           <div className="xl:col-span-8 bg-white dark:bg-[#2a1d15] rounded-xl border border-slate-100 dark:border-gray-800 shadow-sm overflow-hidden flex flex-col h-[600px]">
               <div className="px-6 py-4 border-b border-slate-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                  <h3 className="font-bold text-gray-900 dark:text-white">Connected Assets</h3>
                  <div className="flex gap-2">
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><span className="material-symbols-outlined text-[20px]">refresh</span></button>
                    <button className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500"><span className="material-symbols-outlined text-[20px]">download</span></button>
                  </div>
               </div>
               <div className="overflow-auto flex-1">
                   <table className="w-full text-left border-collapse">
                       <thead className="sticky top-0 bg-gray-50 dark:bg-gray-900 z-10 shadow-sm">
                           <tr>
                               <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Device Name</th>
                               <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                               <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                               <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Load / Voltage</th>
                               <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Action</th>
                           </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                           {devices.map(device => (
                               <tr key={device.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                   <td className="px-6 py-4">
                                       <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 text-primary p-2 rounded-lg">
                                                <span className="material-symbols-outlined text-[20px]">bolt</span>
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900 dark:text-white">{device.name}</div>
                                                <div className="text-xs text-gray-500">IP: {device.ip}</div>
                                            </div>
                                       </div>
                                   </td>
                                   <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{device.type}</td>
                                   <td className="px-6 py-4">
                                       <StatusBadge status={device.status} />
                                   </td>
                                   <td className="px-6 py-4">
                                       <div className="text-sm font-medium text-gray-900 dark:text-white">{device.power !== undefined ? `${device.power} kW` : (device.temp ? `${device.temp}°C` : 'N/A')}</div>
                                       <div className="text-xs text-gray-500">{device.voltage ? `${device.voltage} V` : (device.battery ? `Bat: ${device.battery}%` : '')}</div>
                                   </td>
                                   <td className="px-6 py-4 text-right">
                                       <button className="text-gray-400 hover:text-primary transition-colors">
                                           <span className="material-symbols-outlined">more_vert</span>
                                       </button>
                                   </td>
                               </tr>
                           ))}
                       </tbody>
                   </table>
               </div>
           </div>

           {/* Alarms */}
           <div className="xl:col-span-4 flex flex-col gap-6 h-[600px]">
                <Card className="flex flex-col h-full overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900 dark:text-white">Alarm Center</h3>
                            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded-full">{alarms.length} Active</span>
                        </div>
                    </div>
                    <div className="p-4 overflow-y-auto flex flex-col gap-4 bg-gray-50/30 dark:bg-gray-900/30 flex-1">
                        {alarms.map(alarm => (
                            <div key={alarm.id} className={`bg-white dark:bg-[#33241b] rounded-lg p-4 border-l-4 shadow-sm ${alarm.severity === 'Critical' ? 'border-red-500' : (alarm.severity === 'Major' ? 'border-orange-400' : 'border-yellow-400')}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className={`flex items-center gap-2 ${alarm.severity === 'Critical' ? 'text-red-600' : (alarm.severity === 'Major' ? 'text-orange-500' : 'text-yellow-600')}`}>
                                        <span className="material-symbols-outlined text-[20px]">{alarm.severity === 'Critical' ? 'error' : 'warning'}</span>
                                        <span className="text-xs font-bold uppercase tracking-wide">{alarm.severity}</span>
                                    </div>
                                    <span className="text-xs text-gray-400">{alarm.time}</span>
                                </div>
                                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{alarm.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 leading-snug">{alarm.message}</p>
                                <button className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg text-sm font-semibold transition-colors">
                                   Acknowledge
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>
           </div>
       </div>
    </div>
  )
}
