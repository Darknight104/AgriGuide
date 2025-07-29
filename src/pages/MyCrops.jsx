import React, { useState, useEffect } from 'react';
import AddCropForm from '../components/AddCropForm';
import { FiPlus, FiEdit, FiTrash, FiSearch } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';

const getBadgeColor = (value) => {
  const map = {
    Organic: 'bg-green-100 text-green-700',
    Conventional: 'bg-yellow-100 text-yellow-700',
    Natural: 'bg-purple-100 text-purple-700',
    Hydroponic: 'bg-blue-100 text-blue-700',
    Canal: 'bg-blue-100 text-blue-700',
    Well: 'bg-teal-100 text-teal-700',
    'Rain-fed': 'bg-indigo-100 text-indigo-700',
    'Drip Irrigation': 'bg-cyan-100 text-cyan-700',
  };
  return map[value] || 'bg-gray-100 text-gray-700';
};

const MyCrops = () => {
  const [crops, setCrops] = useState(() => {
    const saved = localStorage.getItem('myCrops');
    return saved ? JSON.parse(saved) : [];
  });
  const [showForm, setShowForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    localStorage.setItem('myCrops', JSON.stringify(crops));
  }, [crops]);

  const handleAddCrop = (data) => {
    if (editIndex !== null) {
      const updated = [...crops];
      updated[editIndex] = data;
      setCrops(updated);
      toast.success('Crop updated!');
      setEditIndex(null);
    } else {
      setCrops([...crops, data]);
      toast.success('Crop added!');
    }
    setShowForm(false);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    const deletedCrop = crops[index];
    setCrops((prev) => prev.filter((_, i) => i !== index));
    toast.error(`Deleted ${deletedCrop.name}`);
  };

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.soilType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-700">🌾 My Crops</h2>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
          onClick={() => {
            setEditIndex(null);
            setShowForm(true);
          }}
        >
          <FiPlus /> Add Crop
        </button>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <FiSearch className="text-gray-400" />
        <motion.input
          type="text"
          placeholder="Search crops or soil..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-10 w-full max-w-xl"
            >
              <AddCropForm
                onSave={handleAddCrop}
                onCancel={() => setShowForm(false)}
                initialData={editIndex !== null ? crops[editIndex] : null}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.ul
        className="mt-6 grid md:grid-cols-2 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        <AnimatePresence>
          {filteredCrops.map((crop, index) => (
            <motion.li
              key={crop.name + index}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-green-100 border border-gray-200 rounded-xl p-5 shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-semibold text-green-700 capitalize">{crop.name}</h4>
                <span className={`text-sm px-2 py-1 rounded-full font-medium ${getBadgeColor(crop.farmingType)}`}>{crop.farmingType}</span>
              </div>

              <div className="text-sm text-gray-700 space-y-1 mt-2">
                <p><span className="font-semibold">🌱 Month:</span> {crop.month}</p>
                <p><span className="font-semibold">📅 Date:</span> {crop.date}</p>
                <p><span className="font-semibold">🌾 Acre:</span> {crop.acre}</p>
                <p><span className="font-semibold">🌍 Soil Type:</span> <span className="inline-block px-2 py-1 text-xs rounded-full bg-red-100 text-red-700">{crop.soilType}</span></p>
                <p>
                  <span className="font-semibold">💧 Water:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getBadgeColor(crop.waterSource)}`}>{crop.waterSource}</span>
                </p>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={() => handleEdit(index)}
                  className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 flex items-center gap-1"
                >
                  <FiEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600 flex items-center gap-1"
                >
                  <FiTrash /> Delete
                </button>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
};

export default MyCrops;