"use client";

import { useState, useRef, useEffect } from "react";
import { searchLocations, type GeocodeResult } from "@/lib/api/trips";

interface LocationSearchProps {
  onSelect?: (location: GeocodeResult) => void;
  placeholder?: string;
}

export function LocationSearch({ onSelect, placeholder = "Search for a destination…" }: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleInput(value: string) {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (value.trim().length < 2) { setResults([]); setIsOpen(false); return; }
    timerRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await searchLocations(value);
        setResults(data);
        setIsOpen(data.length > 0);
      } catch { setResults([]); } finally { setLoading(false); }
    }, 300);
  }

  function handleSelect(location: GeocodeResult) {
    setQuery(location.displayName);
    setIsOpen(false);
    onSelect?.(location);
  }

  return (
    <div ref={ref} className="relative">
      <label className="block text-label-md text-text-secondary mb-1">Destination</label>
      <input type="text" value={query} onChange={(e) => handleInput(e.target.value)} onFocus={() => results.length > 0 && setIsOpen(true)} placeholder={placeholder}
        className="w-full px-3 py-2 border border-border-subtle rounded text-body-md text-primary bg-bg-canvas focus:border-primary focus:outline-none transition-soft" />
      {loading && <span className="absolute right-3 top-1/2 -translate-y-1/2"><svg className="animate-spin h-4 w-4 text-accent-sky" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg></span>}
      {isOpen && results.length > 0 && (
        <ul className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded-lg border border-border-subtle bg-bg-canvas shadow-lg">
          {results.map((r, i) => (
            <li key={i} onClick={() => handleSelect(r)} className="cursor-pointer px-3 py-2 text-body-md text-text-secondary hover:bg-hover-fill transition-colors">{r.displayName}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
