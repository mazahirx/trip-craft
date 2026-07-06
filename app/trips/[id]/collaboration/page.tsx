"use client";

import { SidebarLayout } from "@/components/layout/sidebar-layout";

const members = [
  { name: "Julian V.", email: "julian@tripcraft.app", role: "Owner", status: "Active Now", online: true, isOwner: true },
  { name: "Sarah Chen", email: "sarah.c@email.com", role: "Editor", status: "Online", online: true },
  { name: "Anonymous Explorer", email: "Guest · Joined via public link", role: "Guest", status: "Last seen 2h ago", online: false, guest: true },
];

export default function CollaborationPage() {
  return (
    <SidebarLayout title="Share & Collaborate">
      <div className="space-y-12">
        {/* Access Links */}
        <section>
          <div className="flex items-center justify-between mb-spacing-gap-md">
            <h3 className="text-headline-md text-primary">Access Links</h3>
            <span className="text-label-md text-text-secondary">2 Active Links</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-spacing-gap-md">
            {/* Editor Link */}
            <div className="p-spacing-gap-md border border-border-subtle hover:border-text-main transition-colors group relative overflow-hidden">
              <div className="flex items-center justify-between mb-spacing-gap-sm">
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-text-secondary">edit</span>
                  <span className="text-label-md uppercase tracking-wider">Editor Link</span>
                </div>
                <span className="h-2 w-2 rounded-full bg-status-success" />
              </div>
              <p className="text-body-md text-text-secondary mb-spacing-gap-md">Full permission to add, move, or delete itinerary blocks.</p>
              <div className="flex items-center gap-xs">
                <code className="bg-surface px-3 py-2 flex-1 text-code text-text-secondary truncate">tripcraft.io/s/ed-92kxl-0</code>
                <button type="button" className="p-2 border border-border-subtle hover:bg-hover-fill transition-colors" title="Copy link">
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>
            </div>
            {/* Viewer Link */}
            <div className="p-spacing-gap-md border border-border-subtle hover:border-text-main transition-colors group relative overflow-hidden">
              <div className="flex items-center justify-between mb-spacing-gap-sm">
                <div className="flex items-center gap-xs">
                  <span className="material-symbols-outlined text-text-secondary">visibility</span>
                  <span className="text-label-md uppercase tracking-wider">Viewer Link</span>
                </div>
              </div>
              <p className="text-body-md text-text-secondary mb-spacing-gap-md">Read-only access for family or friends to follow the journey.</p>
              <div className="flex items-center gap-xs">
                <code className="bg-surface px-3 py-2 flex-1 text-code text-text-secondary truncate">tripcraft.io/s/vw-41pqr-8</code>
                <button type="button" className="p-2 border border-border-subtle hover:bg-hover-fill transition-colors" title="Copy link">
                  <span className="material-symbols-outlined text-sm">content_copy</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Travel Companions */}
        <section>
          <div className="flex items-center justify-between mb-spacing-gap-md">
            <h3 className="text-headline-md text-primary">Travel Companions</h3>
            <button type="button" className="text-label-md text-primary hover:underline flex items-center gap-xs">
              <span className="material-symbols-outlined text-sm">person_add</span>
              Invite Member
            </button>
          </div>
          <div className="border border-border-subtle divide-y divide-border-subtle">
            {members.map((m) => (
              <div key={m.email} className="flex items-center justify-between p-spacing-gap-md hover:bg-surface transition-colors">
                <div className="flex items-center gap-spacing-gap-md">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-on-primary font-bold overflow-hidden">
                    {m.online ? (
                      <span className="text-sm">{m.name.charAt(0)}</span>
                    ) : (
                      <div className="w-full h-full bg-hover-fill flex items-center justify-center text-text-secondary border-2 border-dashed border-border-muted">
                        <span className="material-symbols-outlined text-sm">person</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-body-md font-semibold">{m.name}</p>
                    <p className="text-label-md text-text-secondary">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-spacing-gap-sm">
                  {m.isOwner ? (
                    <span className="text-label-md text-text-secondary">Owner</span>
                  ) : m.guest ? (
                    <span className="text-label-md text-text-secondary">{m.status}</span>
                  ) : (
                    <select className="bg-transparent border-none text-label-md text-text-secondary focus:ring-0 p-0 pr-6 cursor-pointer">
                      <option>Can Edit</option>
                      <option>Can View</option>
                      <option className="text-error">Remove</option>
                    </select>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Settings */}
        <section>
          <h3 className="text-headline-md text-primary mb-spacing-gap-md">Settings</h3>
          <div className="space-y-spacing-gap-md">
            {[
              { title: "Require Registration", desc: "If enabled, guests must sign in to TripCraft before they can view or edit this itinerary. Prevents anonymous access.", checked: false },
              { title: "Live Cursor Presence", desc: "See exactly where your companions are working in real-time. Helpful for large, multi-day coordination.", checked: true },
              { title: "Change Notifications", desc: "Receive an email summary when companions make major adjustments to the travel timeline or budget.", checked: false },
            ].map((setting) => (
              <div key={setting.title} className="flex items-start justify-between p-spacing-gap-md border border-border-subtle">
                <div className="flex-1 pr-spacing-gap-lg">
                  <p className="text-body-md font-semibold text-primary">{setting.title}</p>
                  <p className="text-body-md text-text-secondary mt-1">{setting.desc}</p>
                </div>
                <div className="flex items-center h-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked={setting.checked} className="sr-only peer" />
                    <div className="w-11 h-6 bg-surface-container border border-border-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary" />
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Danger Zone */}
        <section className="pt-spacing-gap-lg border-t border-border-subtle">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-body-md font-semibold text-error">Revoke All Access</p>
              <p className="text-body-md text-text-secondary mt-1">Immediately disable all shared links and remove all companions except yourself.</p>
            </div>
            <button type="button" className="px-4 py-2 border border-error text-error hover:bg-error-container/10 transition-colors text-label-md">
              Revoke Access
            </button>
          </div>
        </section>
      </div>
    </SidebarLayout>
  );
}
