"use client";

import { useState } from "react";
import { SidebarLayout } from "@/components/layout/sidebar-layout";

const categories = [
  { name: "Transport", icon: "flight", amount: 1240, color: "bg-primary-container" },
  { name: "Stay", icon: "hotel", amount: 2100, color: "bg-primary-container" },
  { name: "Food", icon: "restaurant", amount: 645, color: "bg-primary-container" },
  { name: "Misc", icon: "local_activity", amount: 300, color: "bg-primary-container" },
];

const initialItems = [
  { id: "1", description: "Roundtrip Flights - NYC to Tokyo", category: "Transport", amount: 1240 },
  { id: "2", description: "Park Hyatt Shinjuku (6 Nights)", category: "Stay", amount: 2100 },
  { id: "3", description: "Omakase Dinner - Sukiyabashi Jiro", category: "Food", amount: 450 },
  { id: "4", description: "Japan Rail Pass (7 Days)", category: "Transport", amount: 195 },
  { id: "5", description: "TeamLab Borderless Tickets", category: "Misc", amount: 300 },
];

export default function BudgetPage() {
  const [items, setItems] = useState(initialItems);
  const [showModal, setShowModal] = useState(false);
  const [newDesc, setNewDesc] = useState("");
  const [newCat, setNewCat] = useState("Transport");
  const [newAmount, setNewAmount] = useState("");

  const total = items.reduce((sum, i) => sum + i.amount, 0);

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newDesc.trim() || !newAmount) return;
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        description: newDesc.trim(),
        category: newCat,
        amount: parseFloat(newAmount),
      },
    ]);
    setNewDesc("");
    setNewAmount("");
    setShowModal(false);
  }

  return (
    <SidebarLayout title="Trip Budget">
      <div className="space-y-12">
        {/* Total */}
        <section>
          <div className="flex flex-col gap-xs">
            <span className="text-label-md text-text-secondary tracking-widest uppercase">Total Estimated Expenditure</span>
            <div className="flex items-baseline gap-sm">
              <span className="text-display text-primary">${total.toFixed(2)}</span>
              <span className="text-status-success text-label-md flex items-center gap-xs">
                <span className="material-symbols-outlined text-[14px]">trending_down</span>
                12% under budget
              </span>
            </div>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-4 gap-spacing-gap-md mt-spacing-gap-lg">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="p-4 bg-surface rounded-xl border border-border-subtle hover:border-outline transition-all group"
              >
                <span className="material-symbols-outlined text-text-secondary mb-2">{cat.icon}</span>
                <div className="text-label-md text-text-secondary">{cat.name}</div>
                <div className="text-headline-md">${cat.amount}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Expense Table */}
        <section>
          <div className="flex justify-between items-end mb-spacing-gap-md">
            <div>
              <h2 className="text-headline-md text-primary">Expenses</h2>
              <p className="text-text-secondary text-body-md mt-1">Detailed breakdown of trip costs.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="flex items-center gap-xs px-4 py-2 bg-primary text-on-primary rounded text-body-md hover:opacity-90 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              Add Item
            </button>
          </div>

          <div className="overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="hairline-border text-left">
                  <th className="pb-3 pr-4 text-label-md text-text-secondary uppercase tracking-wider w-1/2">Description</th>
                  <th className="pb-3 px-4 text-label-md text-text-secondary uppercase tracking-wider">Category</th>
                  <th className="pb-3 pl-4 text-label-md text-text-secondary uppercase tracking-wider text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="hairline-border group hover:bg-hover-fill transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-sm">
                        <div className="w-2 h-2 rounded-full bg-primary-container" />
                        <span className="text-body-md">{item.description}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2 py-0.5 bg-surface-container rounded text-label-md text-secondary">{item.category}</span>
                    </td>
                    <td className="py-4 pl-4 text-right text-code">${item.amount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td className="py-6 text-right text-headline-md text-text-secondary" colSpan={2}>Estimated Total</td>
                  <td className="py-6 text-right text-headline-md text-primary">${total.toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/10 backdrop-blur-sm z-[100] flex items-center justify-center transition-opacity">
          <div className="bg-bg-canvas w-full max-w-md p-spacing-gap-lg rounded-xl shadow-2xl border border-border-subtle">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-headline-md">New Expense</h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-text-secondary hover:text-primary"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-spacing-gap-md">
              <div>
                <label className="block text-label-md text-text-secondary mb-1">Description</label>
                <input
                  type="text"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-border-subtle focus:border-primary outline-none rounded text-body-md"
                  placeholder="e.g. Flight to Tokyo"
                />
              </div>
              <div className="grid grid-cols-2 gap-spacing-gap-md">
                <div>
                  <label className="block text-label-md text-text-secondary mb-1">Category</label>
                  <select
                    value={newCat}
                    onChange={(e) => setNewCat(e.target.value)}
                    className="w-full px-3 py-2 border border-border-subtle focus:border-primary outline-none rounded text-body-md bg-bg-canvas"
                  >
                    {categories.map((c) => (
                      <option key={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-label-md text-text-secondary mb-1">Amount ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newAmount}
                    onChange={(e) => setNewAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-border-subtle focus:border-primary outline-none rounded text-body-md"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-primary text-on-primary py-3 rounded font-semibold hover:opacity-90 transition-all mt-4"
              >
                Add Expense Item
              </button>
            </form>
          </div>
        </div>
      )}
    </SidebarLayout>
  );
}
