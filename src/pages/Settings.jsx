import React from 'react';
import { Card } from '../components/Card';

export const Settings = () => {
    return (
        <div className="flex flex-col gap-6">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
                <div>
                   <h2 className="text-3xl font-bold text-gray-900 dark:text-white">System Management</h2>
                   <p className="text-gray-500 text-sm">Configure user roles, manage tenant access, and review system audit logs.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-4 py-2 bg-white dark:bg-[#2a1d15] border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">domain</span> Manage Tenants
                    </button>
                    <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-hover shadow-sm shadow-orange-200 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px]">person_add</span> Invite User
                    </button>
                </div>
             </div>

             <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-[600px]">
                  {/* User Table */}
                  <div className="xl:col-span-8">
                      <Card className="h-full flex flex-col overflow-hidden">
                           <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
                               <input type="text" placeholder="Search users..." className="pl-3 pr-3 py-2 bg-white dark:bg-[#2a1d15] border border-gray-200 dark:border-gray-700 rounded-lg text-sm w-64 text-gray-900 dark:text-white placeholder-gray-400" />
                               <div className="flex gap-2">
                                   <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500"><span className="material-symbols-outlined text-[20px]">filter_list</span></button>
                                   <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded text-gray-500"><span className="material-symbols-outlined text-[20px]">download</span></button>
                               </div>
                           </div>
                           <table className="w-full text-left">
                               <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                                   <tr>
                                       <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
                                       <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Role</th>
                                       <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                                       <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">Action</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                   <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                       <td className="px-6 py-4 flex items-center gap-3">
                                           <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">JD</div>
                                           <div>
                                               <div className="font-bold text-gray-900 dark:text-white">John Doe</div>
                                               <div className="text-xs text-gray-500">john.doe@shelly.cloud</div>
                                           </div>
                                       </td>
                                       <td className="px-6 py-4"><span className="bg-orange-100 text-orange-800 text-xs px-2.5 py-0.5 rounded-full font-medium">Admin</span></td>
                                       <td className="px-6 py-4"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-green-100 text-green-700"><span className="size-1.5 rounded-full bg-green-600"></span> Active</span></td>
                                       <td className="px-6 py-4 text-right text-gray-400">
                                           <span className="material-symbols-outlined cursor-pointer hover:text-primary mr-2">edit</span>
                                           <span className="material-symbols-outlined cursor-pointer hover:text-red-500">delete</span>
                                       </td>
                                   </tr>
                                   <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                       <td className="px-6 py-4 flex items-center gap-3">
                                           <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">AS</div>
                                           <div>
                                               <div className="font-bold text-gray-900 dark:text-white">Alice Smith</div>
                                               <div className="text-xs text-gray-500">alice.s@shelly.cloud</div>
                                           </div>
                                       </td>
                                       <td className="px-6 py-4"><span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-medium">Manager</span></td>
                                       <td className="px-6 py-4"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-green-100 text-green-700"><span className="size-1.5 rounded-full bg-green-600"></span> Active</span></td>
                                       <td className="px-6 py-4 text-right text-gray-400">
                                           <span className="material-symbols-outlined cursor-pointer hover:text-primary mr-2">edit</span>
                                           <span className="material-symbols-outlined cursor-pointer hover:text-red-500">delete</span>
                                       </td>
                                   </tr>
                                   <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                       <td className="px-6 py-4 flex items-center gap-3">
                                           <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-bold text-sm">MW</div>
                                           <div>
                                               <div className="font-bold text-gray-900 dark:text-white">Mark Wilson</div>
                                               <div className="text-xs text-gray-500">m.wilson@partner.com</div>
                                           </div>
                                       </td>
                                       <td className="px-6 py-4"><span className="bg-gray-100 text-gray-600 text-xs px-2.5 py-0.5 rounded-full font-medium">Guest</span></td>
                                       <td className="px-6 py-4"><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-yellow-100 text-yellow-700"><span className="size-1.5 rounded-full bg-yellow-600"></span> Pending</span></td>
                                       <td className="px-6 py-4 text-right text-gray-400">
                                            <button className="text-primary text-xs font-bold hover:underline">Resend</button>
                                       </td>
                                   </tr>
                               </tbody>
                           </table>
                      </Card>
                  </div>

                  {/* Audit Log */}
                  <div className="xl:col-span-4">
                      <Card className="h-full flex flex-col">
                           <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 flex items-center gap-2">
                               <span className="material-symbols-outlined text-primary">history_edu</span>
                               <h3 className="font-bold text-gray-900 dark:text-white">System Audit Log</h3>
                           </div>
                           <div className="p-6 flex-1 overflow-y-auto">
                               <div className="relative pl-4 border-l border-gray-200 dark:border-gray-700 space-y-8">
                                   <div className="relative group">
                                       <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-primary border-2 border-white dark:border-[#2a1d15] shadow-sm group-hover:scale-125 transition-transform"></div>
                                       <div className="text-xs text-gray-400 font-medium">Just now</div>
                                       <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1"><span className="text-primary">Admin</span> updated Export Limit on <span className="font-bold">Inverter - East Wing</span>.</div>
                                       <div className="mt-1 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs text-gray-500 font-mono border border-gray-100 dark:border-gray-700">Value changed: 5.0kW → 4.5kW</div>
                                   </div>
                                   <div className="relative group">
                                       <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-blue-500 border-2 border-white dark:border-[#2a1d15] shadow-sm"></div>
                                       <div className="text-xs text-gray-400 font-medium">42 mins ago</div>
                                       <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1"><span className="font-bold">Alice Smith</span> invited a new user.</div>
                                   </div>
                                   <div className="relative group">
                                       <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-gray-400 border-2 border-white dark:border-[#2a1d15] shadow-sm"></div>
                                       <div className="text-xs text-gray-400 font-medium">Yesterday</div>
                                       <div className="text-sm font-semibold text-gray-900 dark:text-white mt-1">System firmware update applied.</div>
                                   </div>
                               </div>
                           </div>
                      </Card>
                  </div>
             </div>
        </div>
    )
}
