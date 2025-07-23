import React, { useState } from 'react';

const AddCropForm = ({ onSave, onCancel, initialData }) => {
  const [formData, setFormData] = useState(
    initialData || {
      name: '',
      month: '',
      date: '',
      acre: '',
      soilType: '',
      waterSource: '',
      farmingType: ''
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <div className="grid gap-4">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Crop Name" className="border p-2 rounded" required />

        <input name="date" type="date" value={formData.date} onChange={handleChange} className="border p-2 rounded" required />
        <input name="acre" type="number" value={formData.acre} onChange={handleChange} placeholder="Acre(s)" className="border p-2 rounded" required />

        <select name="soilType" value={formData.soilType} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Soil Type</option>
          <option value="Sandy">Sandy</option>
          <option value="Loamy">Loamy</option>
          <option value="Clay">Clay</option>
        </select>

        <select name="waterSource" value={formData.waterSource} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Water Source</option>
          <option value="Rain">Rain</option>
          <option value="Canal">Canal</option>
          <option value="Borewell">Borewell</option>
        </select>

        <select name="farmingType" value={formData.farmingType} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Farming Type</option>
          <option value="Organic">Organic</option>
          <option value="Conventional">Conventional</option>
        </select>
      </div>

      <div className="flex gap-4 mt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Save</button>
        <button type="button" className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default AddCropForm;
