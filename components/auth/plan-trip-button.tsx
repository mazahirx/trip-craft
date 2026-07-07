"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/auth-provider";

export function PlanTripButton() {
  const router = useRouter();
  const { user } = useAuth();

  function handleClick() {
    if (!user) {
      router.push("/auth/login");
    } else {
      router.push("/trips/new");
    }
  }

  return (
    <button
      onClick={handleClick}
      className="bg-accent-sky text-accent-sky-on px-8 md:px-10 py-3 md:py-4 rounded-lg text-headline-md hover:cursor-pointer hover:opacity-90 transition-soft text-center"
    >
      Plan a Trip for Free
    </button>
  );
}
