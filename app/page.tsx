import { AppShell } from "@/components/layout/app-shell";
import { PlanTripButton } from "@/components/auth/plan-trip-button";
import { HeroIllustration } from "@/components/svg/hero-illustration";
import { AbstractDots } from "@/components/svg/abstract-dots";
import Link from "next/link";
export default function HomePage() {
  return (
    <AppShell>
      <section className="relative max-w-max-width-content mx-auto px-margin-mobile md:px-margin-page pt-24 md:pt-32 pb-gap-lg">
        <AbstractDots className="absolute top-8 right-4 w-32 h-20 opacity-60 hidden md:block" />
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-headline-lg md:text-display leading-tight tracking-tight text-primary max-w-2xl animate-in-up">
              Let&apos;s make a plan and cancel it together.
            </h1>
            <p className="text-body-lg text-text-secondary max-w-lg mt-4 animate-in-up" style={{ animationDelay: "100ms" }}>
              Remember, when last time did you actually turned a plan into trip. Let&apos;s create another trip plan but with a system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 gap-gap-sm mt-gap-md justify-center md:justify-start animate-in-up" style={{ animationDelay: "200ms" }}>
              <PlanTripButton />
              <Link
                href="#features"
                className="bg-accent-orange text-white px-7 md:px-10 py-3 md:py-4 rounded-lg text-headline-md hover:opacity-90 transition-soft text-center"
              >
                View Demo
              </Link>
            </div>
          </div>
          <div className="flex-shrink-0 animate-scale-in">
            <HeroIllustration />
          </div>
        </div>
      </section>

      <section id="features" className="bg-surface py-20 md:py-32">
        <div className="max-w-max-width-content mx-auto px-margin-mobile md:px-margin-page">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 animate-stagger">
            <div className="flex flex-col gap-0.5 gap-gap-sm animate-in-up">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-accent-green text-white mb-base">
                <span className="material-symbols-outlined">group</span>
              </div>
              <h3 className="text-headline-md text-primary">Add Companions</h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                Add the trip members in the planning. Authorize them to make changes in the plan and share your thoughts.
              </p>
            </div>
            <div className="flex flex-col gap-0.5 gap-gap-sm animate-in-up">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-accent-yellow text-white mb-base">
                <span className="material-symbols-outlined">payments</span>
              </div>
              <h3 className="text-headline-md text-primary">Budget Tracking</h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                Allocate a budget for the trip. Track every penny you reserved for the trip. Never go out of budget again.
              </p>
            </div>
            <div className="flex flex-col gap-0.5 gap-gap-sm animate-in-up">
              <div className="w-10 h-10 flex items-center justify-center rounded bg-accent-sky text-white mb-base">
                <span className="material-symbols-outlined">privacy</span>
              </div>
              <h3 className="text-headline-md text-primary">No Monitoring</h3>
              <p className="text-body-md text-text-secondary leading-relaxed">
                Care your trip plans. Prioritize your privacy and use local-first data storage options.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-max-width-content mx-auto px-margin-mobile md:px-margin-page">
          <div className="max-w-2xl animate-in">
            <span className="text-label-md text-text-secondary tracking-widest uppercase mb-gap-sm block">Why I built this?</span>
            <h2 className="text-headline-lg text-primary my-1 mb-gap-md">
              TripCraft is built on the belief that planning should be as enjoyable as the journey itself.
            </h2>
            <p className="text-body-lg text-text-secondary my-3 leading-relaxed mb-gap-lg">
              Stripped away the clutter of modern travel apps no ads, no tracking. Focus is pure utility, a blank canvas for your itineraries that stays out of your way until you need it.
            </p>
            <div className="pl-gap-lg relative">
              <div className="mb-gap-md py-2">
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

      <footer className="bg-bg-canvas border-t border-border-subtle py-16 md:py-20">
        <div className="max-w-max-width-content mx-auto px-margin-mobile md:px-margin-page">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12">
            <div className="flex flex-col gap-0.5 gap-gap-sm">
              <span className="text-headline-md font-bold text-primary">TripCraft</span>
              <p className="text-body-md text-text-secondary max-w-xs">Let&apos;s create and cancel a trip plan together with friends.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 md:gap-24">
              <div className="flex flex-col gap-0.5 gap-base">
                <p className="text-label-md text-primary font-bold mb-gap-sm">Product</p>
                <a className="text-body-md text-text-secondary hover:text-primary transition-soft" href="#">Home</a>
                <a className="text-body-md text-text-secondary hover:text-primary transition-soft" href="#features">Features</a>
              </div>
              <div className="flex flex-col gap-0.5 gap-base">
                <p className="text-label-md text-primary font-bold mb-gap-sm">Company</p>
                <a className="text-body-md text-text-secondary hover:text-primary transition-soft" href="#">About</a>
                <a className="text-body-md text-text-secondary hover:text-primary transition-soft" href="#">Privacy</a>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <Link href="/trips/new" className="block w-full md:w-auto bg-accent-sky text-white px-gap-lg px-3 py-2 py-gap-sm rounded-lg text-label-md hover:opacity-90 transition-soft text-center">
                Launch App
              </Link>
            </div>
          </div>
          <div className="mt-16 md:mt-20 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-gap-sm">
            <p className="text-label-md text-text-secondary">Open Sourced for anyone to contribute.
            </p>
            <a
              href="https://github.com/mazahirx/trip-craft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-label-md text-text-secondary hover:text-primary transition-soft"
            >
              <span className="material-symbols-outlined text-[16px]">star</span>
              Star on GitHub
            </a>
          </div>
        </div>
      </footer>
    </AppShell>
  );
}
