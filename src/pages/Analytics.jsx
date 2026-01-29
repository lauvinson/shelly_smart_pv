import React from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Card } from '../components/Card';

const data = [
  { name: 'Jan', current: 4000, previous: 3500 },
  { name: 'Feb', current: 3000, previous: 2800 },
  { name: 'Mar', current: 5000, previous: 4500 },
  { name: 'Apr', current: 7000, previous: 6000 },
  { name: 'May', current: 8500, previous: 7500 },
  { name: 'Jun', current: 9000, previous: 8200 },
  { name: 'Jul', current: 9500, previous: 9000 },
  { name: 'Aug', current: 9200, previous: 8800 },
  { name: 'Sep', current: 8000, previous: 7800 },
  { name: 'Oct', current: 6000, previous: 5500 },
  { name: 'Nov', current: 4500, previous: 4000 },
  { name: 'Dec', current: 3500, previous: 3200 },
];

export const Analytics = () => {
    return (
        <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Performance Analysis</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Performance Ratio</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">84.2%</h3>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-blue-600">
                             <span className="material-symbols-outlined">monitoring</span>
                        </div>
                    </div>
                    <div className="text-xs text-green-600 font-bold mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                        +1.2% vs last month
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Plant Health</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">96/100</h3>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg text-green-600">
                             <span className="material-symbols-outlined">health_metrics</span>
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">Ranked Top 5%</div>
                </Card>

                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Degradation Rate</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">-0.45%</h3>
                        </div>
                         <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg text-purple-600">
                             <span className="material-symbols-outlined">trending_down</span>
                        </div>
                    </div>
                    <div className="text-xs text-green-600 font-bold mt-2">Within warranty spec</div>
                </Card>

                <Card className="p-6">
                     <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Loss Factors</p>
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">124 kWh</h3>
                        </div>
                        <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg text-orange-600">
                             <span className="material-symbols-outlined">bolt</span>
                        </div>
                    </div>
                    <div className="text-xs text-red-600 font-bold mt-2 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                        12% vs max
                    </div>
                </Card>
            </div>

            <Card className="p-6">
                 <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">Generation Comparison</h3>
                    <div className="flex gap-4 text-sm">
                        <div className="flex items-center gap-2">
                             <span className="w-3 h-3 rounded-full bg-primary"></span>
                             <span className="font-medium text-gray-700 dark:text-gray-300">2023 (Current)</span>
                        </div>
                        <div className="flex items-center gap-2">
                             <span className="w-3 h-3 rounded-full bg-slate-300"></span>
                             <span className="font-medium text-gray-500">2022 (Previous)</span>
                        </div>
                    </div>
                 </div>
                 <div className="h-[320px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                           <defs>
                              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                                 <stop offset="5%" stopColor="#f26c0d" stopOpacity={0.2}/>
                                 <stop offset="95%" stopColor="#f26c0d" stopOpacity={0}/>
                              </linearGradient>
                           </defs>
                           <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                           <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                           <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                           <Area type="monotone" dataKey="previous" stroke="#cbd5e1" strokeDasharray="5 5" fill="transparent" strokeWidth={2} />
                           <Area type="monotone" dataKey="current" stroke="#f26c0d" fillOpacity={1} fill="url(#colorCurrent)" strokeWidth={3} activeDot={{ r: 6, fill: 'white', stroke: '#f26c0d', strokeWidth: 2 }} />
                        </AreaChart>
                     </ResponsiveContainer>
                 </div>
            </Card>
        </div>
    )
}
