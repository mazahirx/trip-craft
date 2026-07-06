import { AppShell } from "@/components/layout/app-shell";
import Link from "next/link";

export default function HomePage() {
  return (
    <AppShell>
      <section className="max-w-max-width-content mx-auto px-spacing-margin-mobile md:px-spacing-margin-page pt-32 pb-spacing-gap-lg text-center md:text-left">
        <div className="flex flex-col gap-spacing-gap-md mb-24">
          <h1 className="text-display leading-tight tracking-tight text-primary max-w-2xl">
            Plan your next adventure with TripCraft.
          </h1>
          <p className="text-body-lg text-text-secondary max-w-lg">
            The minimal travel planner for organized explorers. Built for speed, clarity, and precision.
          </p>
          <div className="flex flex-col sm:flex-row gap-spacing-gap-sm mt-spacing-gap-md justify-center md:justify-start">
            <Link
              href="/trips/new"
              className="bg-primary text-on-primary px-10 py-4 rounded-lg text-headline-md hover:opacity-90 transition-soft text-center"
            >
              Start Planning for Free
            </Link>
            <Link
              href="#features"
              className="bg-bg-canvas border border-border-muted text-primary px-10 py-4 rounded-lg text-headline-md hover:bg-hover-fill transition-soft text-center"
            >
              View Demo
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="bg-surface py-32 border-y border-border-subtle">
        <div className="max-w-max-width-content mx-auto px-spacing-margin-mobile md:px-spacing-margin-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-spacing-gap-sm">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-primary text-on-primary mb-spacing-base">
                <span className="material-symbols-outlined">group</span>
              </div>
              <h3 className="text-headline-md text-primary">Collaborative Itineraries</h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                Invite your travel companions to edit plans in real-time. Shared links, shared vision, zero friction.
              </p>
            </div>
            <div className="flex flex-col gap-spacing-gap-sm">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-primary text-on-primary mb-spacing-base">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <h3 className="text-headline-md text-primary">Real-time Budgeting</h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                Keep track of every dollar spent and planned. Intelligent categorizations and currency conversion included.
              </p>
            </div>
            <div className="flex flex-col gap-spacing-gap-sm">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-primary text-on-primary mb-spacing-base">
                <span className="material-symbols-outlined">incognito</span>
              </div>
              <h3 className="text-headline-md text-primary">Anonymous by Default</h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                No account required to start. We prioritize your privacy and local-first data storage options.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="max-w-max-width-content mx-auto px-spacing-margin-mobile md:px-spacing-margin-page">
          <div className="max-w-2xl">
            <span className="text-label-md text-text-secondary tracking-widest uppercase mb-spacing-gap-sm block">Our Philosophy</span>
            <h2 className="text-headline-lg text-primary mb-spacing-gap-md">
              TripCraft is built on the belief that planning should be as enjoyable as the journey itself.
            </h2>
            <p className="text-body-lg text-text-secondary leading-relaxed mb-spacing-gap-lg">
              We stripped away the clutter of modern travel apps—no ads, no tracking. Our focus is pure utility: a blank canvas for your itineraries that stays out of your way until you need it.
            </p>
            <div className="itinerary-line pl-spacing-gap-lg relative">
              <div className="mb-spacing-gap-md">
                <p className="text-body-md text-primary font-semibold">Minimalist Engine</p>
                <p className="text-body-md text-text-secondary">Engineered for sub-100ms interactions and clean exports.</p>
              </div>
              <div>
                <p className="text-body-md text-primary font-semibold">Privacy First</p>
                <p className="text-body-md text-text-secondary">Your data belongs to you. Export to Markdown or PDF anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-bg-canvas border-t border-border-subtle py-20">
        <div className="max-w-max-width-content mx-auto px-spacing-margin-mobile md:px-spacing-margin-page">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="flex flex-col gap-spacing-gap-sm">
              <span className="text-headline-md font-bold text-primary">TripCraft</span>
              <p className="text-body-md text-text-secondary max-w-xs">The minimal travel planner for organized explorers.</p>
            </div>
            <div className="grid grid-cols-2 gap-12 sm:gap-24">
              <div className="flex flex-col gap-spacing-base">
                <p className="text-label-md text-primary font-bold mb-spacing-gap-sm">Product</p>
                <a className="text-body-md text-text-secondary hover:text-primary transition-soft" href="#">Home</a>
                <a className="text-body-md text-text-secondary hover:text-primary transition-soft" href="#features">Features</a>
              </div>
              <div className="flex flex-col gap-spacing-base">
                <p className="text-label-md text-primary font-bold mb-spacing-gap-sm">Company</p>
                <a className="text-body-md text-text-secondary hover:text-primary transition-soft" href="#">About</a>
                <a className="text-body-md text-text-secondary hover:text-primary transition-soft" href="#">Privacy</a>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <Link href="/trips/new" className="block w-full md:w-auto bg-primary text-on-primary px-spacing-gap-lg py-spacing-gap-sm rounded-lg text-label-md hover:opacity-90 transition-soft text-center">
                Launch App
              </Link>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-spacing-gap-sm">
            <p className="text-label-md text-text-secondary">© 2024 TripCraft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </AppShell>
  );
}
