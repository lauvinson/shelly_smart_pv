import React from 'react';
import { useShelly } from '../context/ShellyContext';
import { Card } from '../components/Card';
import { StatusBadge } from '../components/StatusBadge';

export const Scripts = () => {
    const { scripts, toggleScript } = useShelly();

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2">
               <div className="space-y-1">
                 <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Automation & Scripts</h1>
                 <p className="text-gray-500 font-medium">Manage and monitor your Shelly scripts logic in real-time</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Active Scripts List */}
                <aside className="lg:col-span-3 flex flex-col gap-5">
                   <div className="flex items-center justify-between px-1">
                      <h3 className="text-gray-900 dark:text-white text-sm font-bold uppercase tracking-wider">Active Scripts</h3>
                      <button className="text-primary text-sm font-bold flex items-center gap-1 bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors">
                          <span className="material-symbols-outlined text-[18px]">add</span> New
                      </button>
                   </div>
                   {scripts.map(script => (
                       <Card key={script.id} className="p-5 cursor-pointer relative overflow-hidden ring-1 ring-transparent hover:ring-2 hover:ring-primary/10 group">
                           <div className="flex justify-between items-start mb-4">
                               <div className="flex items-center gap-3">
                                   <div className={`p-2.5 rounded-2xl shadow-sm bg-gray-100 text-gray-600`}>
                                       <span className="material-symbols-outlined text-[24px]">{script.icon}</span>
                                   </div>
                                   <div>
                                       <h4 className="text-gray-900 dark:text-white font-bold text-sm">{script.name}</h4>
                                       <p className="text-xs text-gray-500 font-medium">ID: #{script.id}</p>
                                   </div>
                               </div>
                               <div className="relative inline-flex items-center cursor-pointer">
                                  <input type="checkbox" className="sr-only peer" checked={script.status === 'Running'} onChange={() => toggleScript(script.id)} />
                                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success shadow-inner-soft"></div>
                               </div>
                           </div>
                           <div className="flex items-center gap-2 mb-4">
                               <StatusBadge status={script.status} />
                           </div>
                           <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-gray-800">
                               <div className="flex items-center gap-2">
                                   <span className="text-[10px] uppercase font-bold text-gray-500 w-8">CPU</span>
                                   <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                       <div className="h-full bg-blue-500 rounded-full" style={{ width: `${script.cpu}%` }}></div>
                                   </div>
                                   <span className="text-[10px] font-mono text-gray-900 dark:text-gray-100 w-8 text-right">{script.cpu}%</span>
                               </div>
                           </div>
                       </Card>
                   ))}
                </aside>

                {/* Console & Logic Flow */}
                <section className="lg:col-span-6 flex flex-col gap-6">
                    <Card className="flex flex-col min-h-[400px]">
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                             <div className="flex items-center gap-2">
                                 <span className="material-symbols-outlined text-[18px] text-gray-500">terminal</span>
                                 <span className="text-sm font-bold text-gray-900 dark:text-white">Live Console</span>
                                 <span className="text-xs font-mono text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">Grid Export Limit</span>
                             </div>
                        </div>
                        <div className="flex-1 p-6 font-mono text-sm overflow-y-auto bg-gray-50/30 dark:bg-gray-900/30 space-y-2">
                             <div className="flex gap-4 opacity-50"><span className="text-gray-400">[14:01:55]</span><span className="text-gray-700 dark:text-gray-300">Initializing script environment...</span></div>
                             <div className="flex gap-4 opacity-50"><span className="text-gray-400">[14:01:56]</span><span className="text-gray-700 dark:text-gray-300">Connecting to Shelly Pro 3EM... <span className="text-green-600 font-bold">Connected</span></span></div>
                             <div className="h-px bg-gray-200 border-dashed my-2"></div>
                             <div className="flex gap-4"><span className="text-gray-400">[14:02:05]</span><span className="text-blue-600 font-bold">INFO</span><span className="text-gray-800 dark:text-gray-200">Reading PV Output... 5.2kW measured.</span></div>
                             <div className="flex gap-4"><span className="text-gray-400">[14:02:05]</span><span className="text-warning font-bold">WARN</span><span className="text-gray-800 dark:text-gray-200">Grid Export limit (5kW) exceeded by 0.2kW.</span></div>
                             <div className="flex gap-4"><span className="text-gray-400">[14:02:05]</span><span className="text-purple-600 font-bold">EXEC</span><span className="text-gray-800 dark:text-gray-200">Triggering Relay 1 (Water Heater).</span></div>
                             <div className="flex gap-4 bg-green-50/50 -mx-4 px-4 py-2 border-l-4 border-green-500"><span className="text-gray-400">[14:02:06]</span><span className="text-green-600 font-bold">SUCCESS</span><span className="text-gray-800 dark:text-gray-200">Load increased. Export dropped to 4.8kW.</span></div>
                        </div>
                    </Card>

                    <Card className="p-8 flex flex-col items-center">
                         <h3 className="w-full text-left text-gray-900 dark:text-white text-sm font-bold uppercase tracking-wider mb-8 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">account_tree</span> Logic Flow Visualization
                         </h3>
                         {/* Simple CSS Flowchart */}
                         <div className="flex flex-col items-center w-full max-w-lg">
                             <div className="w-full p-4 rounded-2xl bg-white dark:bg-[#33241b] border-2 border-slate-100 dark:border-gray-700 text-center shadow-sm z-10 relative">
                                <span className="absolute -left-3 top-1/2 -translate-y-1/2 size-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full border border-white text-[10px] font-bold">1</span>
                                <p className="text-xs font-mono font-bold text-gray-400 uppercase mb-1">Input Source</p>
                                <p className="text-sm font-bold text-gray-900 dark:text-white">Read PV Output (Shelly Pro 3EM)</p>
                             </div>
                             <div className="w-0.5 h-8 bg-slate-300"></div>
                             <div className="relative size-28 rotate-45 bg-gray-50 dark:bg-gray-800 border-2 border-primary shadow-lg flex items-center justify-center z-10 rounded-2xl">
                                <div className="-rotate-45 text-center">
                                    <p className="text-[10px] font-mono text-primary font-bold mb-1">CONDITION</p>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Export<br/>&gt; 5kW?</p>
                                </div>
                             </div>

                             <div className="grid grid-cols-2 w-full gap-12 mt-8">
                                <div className="flex flex-col items-center relative">
                                    <div className="absolute -top-8 left-1/2 h-8 w-px border-l-2 border-dashed border-slate-200"></div>
                                    <div className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 text-center opacity-60 grayscale">
                                        <p className="text-xs font-mono text-slate-400 mb-1">ELSE</p>
                                        <p className="text-sm font-bold text-slate-600 dark:text-slate-400">Do Nothing</p>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center relative">
                                    <div className="absolute -top-8 left-1/2 h-8 w-0.5 bg-green-400"></div>
                                    <div className="w-full p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center shadow-lg shadow-green-100 dark:shadow-none relative">
                                        <p className="text-xs font-mono font-bold text-green-600 mb-1">ACTION</p>
                                        <p className="text-sm font-bold text-green-900 dark:text-green-100">Trigger Relay 1</p>
                                    </div>
                                </div>
                             </div>
                         </div>
                    </Card>
                </section>

                {/* Insights */}
                <aside className="lg:col-span-3 flex flex-col gap-6">
                    <Card className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-xs font-bold text-gray-500 uppercase mb-1">Total Executions</p>
                            <h4 className="text-3xl font-extrabold text-gray-900 dark:text-white">142</h4>
                        </div>
                         <div className="size-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shadow-sm">
                            <span className="material-symbols-outlined text-[28px]">touch_app</span>
                        </div>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
