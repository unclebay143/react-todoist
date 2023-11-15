import React from "react";

export const TodoLoader = () => {
  return (
    <div className='h-[48px] group flex justify-between py-3 px-2.5 rounded-lg bg-slate-50 animate-pulse'>
      <p className='hidden'>Buy bread</p>
    </div>
  );
};
