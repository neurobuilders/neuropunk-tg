"use client";

// @ts-ignore
import riveWASMResource from "@rive-app/canvas/rive.wasm";
import { useRive, RuntimeLoader } from "@rive-app/react-canvas";

RuntimeLoader.setWasmUrl(riveWASMResource);

export const NeuropunkRive = () => {
  const { RiveComponent } = useRive({
    src: "/neuropunk.riv",
    // stateMachines: "bumpy",
    useOffscreenRenderer: true,
    autoplay: true,
  });
  return (
    <RiveComponent
      style={{
        minHeight: "95px",
        height: "30%",
        marginBottom: "6px",
        marginTop: "3px",
      }}
    />
  );
};
