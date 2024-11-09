"use client";

import Rive from "@rive-app/react-canvas";

export const NeuropunkRive = () => (
  <Rive
    style={{
      minHeight: "95px",
      height: "30%",
      marginBottom: "6px",
      marginTop: "3px",
    }}
    src="/neuropunk.riv"
  />
);
