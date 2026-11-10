import React, { useState } from "react";
import { CATEGORIES } from "../../../data/mockData";

export const AddServiceModal = ({ isOpen, onClose, onAddService }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("electrical");
  const [newRate, setNewRate] = useState("45");
  const [newHours, setNewHours] = useState("1-2 hours");
  const [newDesc, setNewDesc] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    onAddService({
      title: newTitle,
      category: newCategory,
      rate: Number(newRate),
      estimatedHours: newHours,
      description: newDesc
    });
    setNewTitle("");
    setNewDesc("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
        <h3 className="text-lg font-black text-slate-900 mb-1">
          Add New Service Offering
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Define the service title, category, and standard hourly billing rate.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Service Title
            </label>
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. EV Home Charger Wallbox Installation"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Hourly Rate ($)
              </label>
              <input
                type="number"
                required
                value={newRate}
                onChange={(e) => setNewRate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Estimated Duration
            </label>
            <input
              type="text"
              value={newHours}
              onChange={(e) => setNewHours(e.target.value)}
              placeholder="e.g. 2-3 hours"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Scope Description
            </label>
            <textarea
              rows="3"
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Describe equipment used, testing protocols, and warranty..."
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs cursor-pointer"
            >
              Publish Offering
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
