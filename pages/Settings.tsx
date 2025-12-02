
import React from 'react';

export const Settings: React.FC = () => {
  return (
    <div className="flex h-full gap-8">
      {/* Inner Sidebar */}
      <div className="w-64 flex-shrink-0 flex flex-col gap-6">
        <h2 className="text-xl font-bold text-white px-2">Settings</h2>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/20 cursor-pointer">
            <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            <p className="text-primary text-sm font-medium leading-normal">User Profile</p>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-white/60 group-hover:text-white text-xl">credit_card</span>
            <p className="text-white/60 group-hover:text-white text-sm font-medium leading-normal">Account Settings</p>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-white/60 group-hover:text-white text-xl">notifications</span>
            <p className="text-white/60 group-hover:text-white text-sm font-medium leading-normal">Notifications</p>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-white/60 group-hover:text-white text-xl">tune</span>
            <p className="text-white/60 group-hover:text-white text-sm font-medium leading-normal">General Preferences</p>
          </div>
          <div className="h-px bg-white/10 my-2 mx-3"></div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
            <span className="material-symbols-outlined text-white/60 group-hover:text-white text-xl">help</span>
            <p className="text-white/60 group-hover:text-white text-sm font-medium leading-normal">Help & Support</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-4xl overflow-y-auto pr-4">
        <div className="mb-8">
          <h1 className="text-white text-3xl font-bold tracking-tight mb-2">User Profile</h1>
          <p className="text-white/60">Manage your profile details and security settings.</p>
        </div>

        <div className="space-y-8 pb-12">
          {/* Personal Information Section */}
          <section>
            <h3 className="text-white text-lg font-bold mb-4">Personal Information</h3>
            <div className="bg-[#1c261f] p-6 rounded-xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex flex-col gap-2">
                  <span className="text-white text-sm font-medium">Full Name</span>
                  <input className="form-input w-full rounded-lg bg-[#111813] border border-white/10 text-white p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none" defaultValue="Alex Doe"/>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-white text-sm font-medium">Email Address</span>
                  <input className="form-input w-full rounded-lg bg-[#111813] border border-white/10 text-white p-3 focus:border-primary focus:ring-1 focus:ring-primary outline-none" defaultValue="alex.doe@email.com"/>
                </label>
              </div>
            </div>
          </section>

          {/* Password Section */}
          <section>
            <h3 className="text-white text-lg font-bold mb-4">Password</h3>
            <div className="bg-[#1c261f] p-6 rounded-xl border border-white/10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <label className="flex flex-col gap-2">
                  <span className="text-white text-sm font-medium">Current Password</span>
                  <div className="relative">
                    <input className="form-input w-full rounded-lg bg-[#111813] border border-white/10 text-white p-3 pr-10 focus:border-primary focus:ring-1 focus:ring-primary outline-none" type="password" value="************" readOnly/>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-white/40 cursor-pointer hover:text-white">visibility</span>
                  </div>
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-white text-sm font-medium">New Password</span>
                  <div className="relative">
                    <input className="form-input w-full rounded-lg bg-[#111813] border border-white/10 text-white p-3 pr-10 focus:border-primary focus:ring-1 focus:ring-primary outline-none" type="password" placeholder="Enter new password"/>
                    <span className="material-symbols-outlined absolute right-3 top-3 text-white/40 cursor-pointer hover:text-white">visibility_off</span>
                  </div>
                </label>
              </div>
              <button className="bg-primary/10 text-primary border border-primary/20 h-10 px-6 rounded-lg text-sm font-bold hover:bg-primary/20 transition-colors">
                Update Password
              </button>
            </div>
          </section>

          {/* 2FA Section */}
          <section>
            <h3 className="text-white text-lg font-bold mb-4">Two-Factor Authentication (2FA)</h3>
            <div className="bg-[#1c261f] p-6 rounded-xl border border-white/10 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">Enable 2FA</p>
                <p className="text-white/60 text-sm mt-1">Add an extra layer of security to your account.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-600 rounded-full peer peer-focus:ring-2 peer-focus:ring-primary/50 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </section>

          <div className="border-t border-white/10 pt-6 flex justify-end">
            <button className="bg-primary text-background-dark h-12 px-8 rounded-lg text-base font-bold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
