import React from "react";

export const Loader = () => {
  return (
    <div className="root__loading flex flex-col gap-7">
      <span className="loader"></span>
      <p className="leading-6 text-xl text-white mt-[20%]">Loading</p>
    </div>
  );
};
