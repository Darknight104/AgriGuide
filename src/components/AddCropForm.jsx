import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { toast } from 'react-toastify';

const AddCropForm = ({ onSave, onCancel, initialData }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      name: '',
      month: '',
      date: '',
      acre: '',
      soilType: '',
      waterSource: '',
      farmingType: '',
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  const onSubmit = (data) => {
    const today = new Date();
    const inputDate = new Date(data.date);

    if (inputDate > today) {
      return toast.error("Date cannot be in the future.");
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
      return toast.error("Date must follow YYYY-MM-DD format.");
    }

    const day = inputDate.getDay();
    if (day === 0 || day === 6) {
      return toast.error("Weekends are not allowed.");
    }

    if (parseFloat(data.acre) <= 0) {
      return toast.error("Acre must be greater than 0.");
    }

    onSave(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white rounded-xl shadow-md p-5 mb-6 relative border border-gray-200"
    >
      <button
        onClick={onCancel}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
      >
        <FiX size={20} />
      </button>
      <h3 className="text-xl font-semibold text-green-700 mb-4">
        {initialData ? 'Edit Crop' : 'Add Crop'}
      </h3>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 md:grid-cols-2">
        <div>
          <input
            {...register('name', {
              required: 'Crop name is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
            })}
            placeholder="Crop Name"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <select
            {...register('month', { required: 'Sowing month is required' })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Month</option>
            {[ 'January','February','March','April','May','June','July','August','September','October','November','December' ].map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          {errors.month && <p className="text-red-500 text-sm mt-1">{errors.month.message}</p>}
        </div>

        <div>
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            min="2000-01-01"
            {...register('date', { required: 'Date is required' })}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>}
        </div>

        <div>
          <input
            type="number"
            step="0.01"
            {...register('acre', {
              required: 'Acre is required',
              min: { value: 0.01, message: 'Acre must be greater than 0' },
            })}
            placeholder="Acre"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.acre && <p className="text-red-500 text-sm mt-1">{errors.acre.message}</p>}
        </div>

        <div>
          <input
            {...register('soilType', {
              required: 'Soil type is required',
              minLength: { value: 2, message: 'Minimum 2 characters' },
            })}
            placeholder="Soil Type"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          {errors.soilType && <p className="text-red-500 text-sm mt-1">{errors.soilType.message}</p>}
        </div>

        <div>
          <select
            {...register('waterSource', { required: 'Water source is required' })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Water Source</option>
            <option value="Well">Well</option>
            <option value="Canal">Canal</option>
            <option value="Rain-fed">Rain-fed</option>
            <option value="Drip Irrigation">Drip Irrigation</option>
          </select>
          {errors.waterSource && <p className="text-red-500 text-sm mt-1">{errors.waterSource.message}</p>}
        </div>

        <div>
          <select
            {...register('farmingType', { required: 'Farming type is required' })}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">Select Farming Type</option>
            <option value="Organic">Organic</option>
            <option value="Conventional">Conventional</option>
            <option value="Natural">Natural</option>
            <option value="Hydroponic">Hydroponic</option>
          </select>
          {errors.farmingType && <p className="text-red-500 text-sm mt-1">{errors.farmingType.message}</p>}
        </div>

        <div className="col-span-2 flex justify-end gap-4 mt-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {initialData ? 'Update' : 'Save'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddCropForm;
