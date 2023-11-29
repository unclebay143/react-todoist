import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <header className='bg-black text-white p-4'>Header</header>
      <section className='flex min-h-screen'>
        <aside className='p-5 border-r border-black flex flex-col gap-2'>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='profile'>Profile</Link>
          <Link to='settings'>Settings</Link>
        </aside>
        <section className='p-5'>
          {/* children */}
          <Outlet />
        </section>
      </section>
    </div>
  );
};

export default DashboardLayout;
