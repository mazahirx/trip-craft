import type { BudgetItem, Checkpoint, Companion, Note, Stay, Trip } from "@/lib/db/schema";

export interface TripWithRelations extends Trip {
  companions: Companion[];
  checkpoints: (Checkpoint & { stays: Stay[] })[];
  budgetItems: BudgetItem[];
  notes: Note[];
}

export function computeTotalDays(
  startDate: Date | string | null,
  endDate: Date | string | null
): number {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

export function computeTotalBudget(items: Pick<BudgetItem, "amount">[]): number {
  return items.reduce((sum, item) => sum + Number(item.amount), 0);
}

export function computePerPerson(totalBudget: number, companionCount: number): number {
  const people = Math.max(1, companionCount + 1);
  return totalBudget / people;
}

export function computeTripSummary(trip: TripWithRelations) {
  const totalDays = computeTotalDays(trip.startDate, trip.endDate);
  const totalBudget = computeTotalBudget(trip.budgetItems);
  const perPerson = computePerPerson(totalBudget, trip.companions.length);

  return { totalDays, totalBudget, perPerson };
}
