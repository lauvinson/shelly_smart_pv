import React from 'react';
import { Card } from '../components/Card';

export const Reports = () => {
    return (
        <div className="flex flex-col gap-6">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                   <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Reports & Export</h2>
                   <p className="text-gray-500 text-sm">Generate performance reports and schedule delivery.</p>
                </div>
                <div className="flex gap-3">
                   <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#2a1d15] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200">
                       <span className="material-symbols-outlined">history</span> History
                   </button>
                   <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-hover shadow-sm shadow-orange-200">
                       <span className="material-symbols-outlined">download</span> Export All
                   </button>
                </div>
             </div>

             <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[600px]">
                 <div className="xl:col-span-3 flex flex-col gap-4">
                     <Card className="flex flex-col h-full overflow-hidden">
                         <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                             <h3 className="font-bold text-gray-900 dark:text-white">Templates</h3>
                         </div>
                         <div className="p-3 space-y-2 flex-1">
                              {['Daily Generation', 'Monthly Device Health', 'Annual Alarm Stats', 'Financial Report'].map((t, i) => (
                                  <div key={i} className={`p-3 rounded-lg flex items-center gap-3 cursor-pointer transition-colors ${i === 0 ? 'bg-primary/5 border border-primary/20' : 'hover:bg-gray-50 dark:hover:bg-gray-800 border border-transparent'}`}>
                                      <div className={`p-2 rounded-md ${i === 0 ? 'bg-white dark:bg-gray-800 text-primary border border-primary/10' : 'bg-gray-100 dark:bg-gray-700 text-gray-500'}`}>
                                          <span className="material-symbols-outlined text-[20px]">{i === 0 ? 'solar_power' : 'description'}</span>
                                      </div>
                                      <div>
                                          <div className="font-bold text-sm text-gray-900 dark:text-white">{t}</div>
                                          <div className="text-xs text-gray-500">Report Template</div>
                                      </div>
                                  </div>
                              ))}
                         </div>
                     </Card>
                 </div>

                 <div className="xl:col-span-6">
                      <Card className="h-full flex flex-col relative">
                          <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex justify-between">
                              <h3 className="font-bold text-gray-900 dark:text-white">Preview: Daily Generation</h3>
                              <div className="flex gap-2 text-gray-400">
                                  <span className="material-symbols-outlined cursor-pointer hover:text-primary">zoom_in</span>
                                  <span className="material-symbols-outlined cursor-pointer hover:text-primary">fullscreen</span>
                              </div>
                          </div>
                          <div className="flex-1 overflow-auto p-6 bg-white dark:bg-[#2a1d15] relative">
                              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
                                  <span className="text-6xl font-black transform -rotate-12 dark:text-white">PREVIEW</span>
                              </div>
                              <table className="w-full text-sm text-left">
                                  <thead>
                                      <tr className="border-b border-gray-100 dark:border-gray-800">
                                          <th className="py-2 text-gray-500 font-medium">Timestamp</th>
                                          <th className="py-2 text-gray-500 font-medium">Yield</th>
                                          <th className="py-2 text-gray-500 font-medium text-right">Efficiency</th>
                                      </tr>
                                  </thead>
                                  <tbody>
                                      {[...Array(8)].map((_, i) => (
                                          <tr key={i} className="border-b border-gray-50 dark:border-gray-800">
                                              <td className="py-3 text-gray-900 dark:text-gray-300">2023-10-24 0{8+i}:00</td>
                                              <td className="py-3 text-gray-600 dark:text-gray-400">{40 + i*5}.2 kWh</td>
                                              <td className="py-3 text-right text-green-600">98.{2+i%3}%</td>
                                          </tr>
                                      ))}
                                  </tbody>
                              </table>
                          </div>
                      </Card>
                 </div>

                 <div className="xl:col-span-3">
                      <Card className="h-full flex flex-col p-5">
                          <h3 className="font-bold text-gray-900 dark:text-white mb-4">Export Settings</h3>
                          <div className="space-y-4 flex-1">
                              <div>
                                  <label className="text-xs font-bold text-gray-500 uppercase">Format</label>
                                  <div className="grid grid-cols-3 gap-2 mt-2">
                                      {['Excel', 'PDF', 'Word'].map(f => (
                                          <div key={f} className={`p-3 rounded-lg border flex flex-col items-center justify-center cursor-pointer transition-colors ${f === 'Excel' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
                                              <span className="material-symbols-outlined text-[20px] mb-1">description</span>
                                              <span className="text-xs font-semibold">{f}</span>
                                          </div>
                                      ))}
                                  </div>
                              </div>
                          </div>
                          <button className="w-full py-3 bg-primary text-white rounded-lg font-bold shadow-lg shadow-orange-200 hover:bg-primary-hover flex justify-center gap-2">
                              <span className="material-symbols-outlined">send</span> Generate & Send
                          </button>
                      </Card>
                 </div>
             </div>
        </div>
    )
}
