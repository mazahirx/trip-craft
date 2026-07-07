export function AbstractDots({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="20" cy="20" r="3" fill="#38BDF8" fillOpacity="0.4" />
      <circle cx="40" cy="20" r="2.5" fill="#FACC15" fillOpacity="0.5" />
      <circle cx="60" cy="20" r="3" fill="#4ADE80" fillOpacity="0.4" />
      <circle cx="80" cy="20" r="2.5" fill="#FB923C" fillOpacity="0.5" />
      <circle cx="100" cy="20" r="3" fill="#38BDF8" fillOpacity="0.4" />
      <circle cx="120" cy="20" r="2.5" fill="#FACC15" fillOpacity="0.5" />
      <circle cx="140" cy="20" r="3" fill="#4ADE80" fillOpacity="0.4" />
      <circle cx="160" cy="20" r="2.5" fill="#FB923C" fillOpacity="0.5" />
      <circle cx="180" cy="20" r="3" fill="#38BDF8" fillOpacity="0.4" />
      <circle cx="20" cy="100" r="2.5" fill="#FB923C" fillOpacity="0.5" />
      <circle cx="40" cy="100" r="3" fill="#38BDF8" fillOpacity="0.4" />
      <circle cx="60" cy="100" r="2.5" fill="#FACC15" fillOpacity="0.5" />
      <circle cx="80" cy="100" r="3" fill="#4ADE80" fillOpacity="0.4" />
      <circle cx="100" cy="100" r="2.5" fill="#FB923C" fillOpacity="0.5" />
      <circle cx="120" cy="100" r="3" fill="#38BDF8" fillOpacity="0.4" />
      <circle cx="140" cy="100" r="2.5" fill="#FACC15" fillOpacity="0.5" />
      <circle cx="160" cy="100" r="3" fill="#4ADE80" fillOpacity="0.4" />
      <circle cx="180" cy="100" r="2.5" fill="#FB923C" fillOpacity="0.5" />
      <path d="M30 60 Q50 38 70 60 T110 60 T150 60 T190 60" stroke="#4ADE80" strokeWidth="2" fill="none" strokeLinecap="round" strokeOpacity="0.5" />
      <circle cx="50" cy="49" r="3.5" fill="#FACC15" />
      <circle cx="90" cy="63" r="3" fill="#38BDF8" />
      <circle cx="130" cy="49" r="3.5" fill="#FB923C" />
      <circle cx="170" cy="63" r="3" fill="#4ADE80" />
    </svg>
  );
}
