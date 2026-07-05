import { create } from "zustand";
import type { BudgetItem, Checkpoint, Companion, Note, Stay, Trip } from "@/lib/db/schema";
import {
  computeTotalBudget,
  computeTotalDays,
  computePerPerson,
} from "@/lib/trip-utils";

export interface CheckpointWithStays extends Checkpoint {
  stays: Stay[];
}

interface TripState {
  trip: Trip | null;
  companions: Companion[];
  checkpoints: CheckpointWithStays[];
  budgetItems: BudgetItem[];
  notes: Note[];
  isDirty: boolean;

  setTrip: (trip: Trip) => void;
  setCompanions: (companions: Companion[]) => void;
  setCheckpoints: (checkpoints: CheckpointWithStays[]) => void;
  setBudgetItems: (items: BudgetItem[]) => void;
  setNotes: (notes: Note[]) => void;
  addCheckpoint: (checkpoint: CheckpointWithStays) => void;
  updateCheckpoint: (id: string, data: Partial<Checkpoint>) => void;
  removeCheckpoint: (id: string) => void;
  addBudgetItem: (item: BudgetItem) => void;
  addCompanion: (companion: Companion) => void;
  markClean: () => void;
  reset: () => void;
}

export const useTripStore = create<TripState>((set, get) => ({
  trip: null,
  companions: [],
  checkpoints: [],
  budgetItems: [],
  notes: [],
  isDirty: false,

  setTrip: (trip) => set({ trip }),
  setCompanions: (companions) => set({ companions }),
  setCheckpoints: (checkpoints) => set({ checkpoints }),
  setBudgetItems: (items) => set({ budgetItems: items }),
  setNotes: (notes) => set({ notes }),

  addCheckpoint: (checkpoint) =>
    set((state) => ({
      checkpoints: [...state.checkpoints, checkpoint],
      isDirty: true,
    })),

  updateCheckpoint: (id, data) =>
    set((state) => ({
      checkpoints: state.checkpoints.map((cp) =>
        cp.id === id ? { ...cp, ...data } : cp
      ),
      isDirty: true,
    })),

  removeCheckpoint: (id) =>
    set((state) => ({
      checkpoints: state.checkpoints.filter((cp) => cp.id !== id),
      isDirty: true,
    })),

  addBudgetItem: (item) =>
    set((state) => ({
      budgetItems: [...state.budgetItems, item],
      isDirty: true,
    })),

  addCompanion: (companion) =>
    set((state) => ({
      companions: [...state.companions, companion],
      isDirty: true,
    })),

  markClean: () => set({ isDirty: false }),
  reset: () =>
    set({
      trip: null,
      companions: [],
      checkpoints: [],
      budgetItems: [],
      notes: [],
      isDirty: false,
    }),
}));

export function useTripSummary() {
  const trip = useTripStore((s) => s.trip);
  const companions = useTripStore((s) => s.companions);
  const budgetItems = useTripStore((s) => s.budgetItems);

  const totalDays = computeTotalDays(trip?.startDate ?? null, trip?.endDate ?? null);
  const totalBudget = computeTotalBudget(budgetItems);
  const perPerson = computePerPerson(totalBudget, companions.length);

  return { totalDays, totalBudget, perPerson };
}
