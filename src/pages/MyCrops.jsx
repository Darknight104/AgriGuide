import React, { useState } from 'react';
import CropForm from '../components/AddCropForm';

const MyCrops = () => {
  const [crops, setCrops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddCrop = (cropData) => {
    if (editIndex !== null) {
      const updated = [...crops];
      updated[editIndex] = cropData;
      setCrops(updated);
      setEditIndex(null);
    } else {
      setCrops([...crops, cropData]);
    }
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const filtered = crops.filter((_, i) => i !== index);
    setCrops(filtered);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">My Crops</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={() => {
            setEditIndex(null);
            setShowForm(true);
          }}
        >
          ➕ Add Crop
        </button>
      </div>

      {showForm && (
        <CropForm
          onSave={handleAddCrop}
          onCancel={() => setShowForm(false)}
          initialData={editIndex !== null ? crops[editIndex] : null}
        />
      )}

      <ul className="mt-6 grid gap-4">
        {crops.map((crop, index) => (
          <li key={index} className="border p-4 rounded shadow bg-white">
            <p><strong>Crop Name:</strong> {crop.name}</p>
            <p><strong>Sowing Month:</strong> {crop.month}</p>
            <p><strong>Date:</strong> {crop.date}</p>
            <p><strong>Acre:</strong> {crop.acre}</p>
            <p><strong>Soil Type:</strong> {crop.soilType}</p>
            <p><strong>Water Source:</strong> {crop.waterSource}</p>
            <p><strong>Farming Type:</strong> {crop.farmingType}</p>
            <div className="mt-2 flex gap-2">
              <button onClick={() => handleEdit(index)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(index)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyCrops;
