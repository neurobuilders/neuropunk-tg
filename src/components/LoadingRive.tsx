"use client";

import RiveComponent from "@rive-app/react-canvas";

export const LoadingRive = () => (
  <RiveComponent
    src="/rives/loading.riv"
    stateMachines={"State Machine 1"}
    artboard={"Artboard"}
  />
);
