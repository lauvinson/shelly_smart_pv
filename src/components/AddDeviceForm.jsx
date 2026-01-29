import React, { useState } from 'react';
import { useShelly } from '../context/ShellyContext';

export const AddDeviceForm = ({ onClose }) => {
  const { addDevice } = useShelly();
  const [formData, setFormData] = useState({
    name: '',
    type: 'Shelly Pro 3EM',
    ip: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.ip) return;

    addDevice(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
       <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Device Name</label>
           <input
             type="text"
             required
             className="w-full px-3 py-2 bg-white dark:bg-[#33241b] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
             placeholder="e.g. Kitchen Monitor"
             value={formData.name}
             onChange={e => setFormData({...formData, name: e.target.value})}
           />
       </div>

       <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Device Type</label>
           <select
             className="w-full px-3 py-2 bg-white dark:bg-[#33241b] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
             value={formData.type}
             onChange={e => setFormData({...formData, type: e.target.value})}
           >
              <option>Shelly Pro 3EM</option>
              <option>Shelly Plus 1PM</option>
              <option>Shelly H&T Gen3</option>
              <option>Shelly Motion 2</option>
              <option>Huawei Sun2000</option>
           </select>
       </div>

       <div>
           <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">IP Address</label>
           <input
             type="text"
             required
             className="w-full px-3 py-2 bg-white dark:bg-[#33241b] border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
             placeholder="e.g. 192.168.1.50"
             value={formData.ip}
             onChange={e => setFormData({...formData, ip: e.target.value})}
           />
       </div>

       <div className="flex gap-3 mt-4">
          <button type="button" onClick={onClose} className="flex-1 py-2.5 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              Cancel
          </button>
          <button type="submit" className="flex-1 py-2.5 bg-primary text-white rounded-lg font-bold hover:bg-primary-hover shadow-md shadow-orange-200 transition-colors">
              Add Device
          </button>
       </div>
    </form>
  );
};
