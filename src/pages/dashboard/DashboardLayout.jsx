import React from "react";
import { Link, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      <header className='bg-blue-300 p-3 text-3xl text-white'>Header</header>
      <div className='flex gap-10 min-h-screen'>
        <aside className='border-r p-5 flex flex-col gap-4 text-slate-900'>
          <Link to='/dashboard'>Dashboard</Link>
          <Link to='profile'>Profile</Link>
        </aside>
        <main className='p-5'>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
