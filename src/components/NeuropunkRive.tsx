"use client";

// @ts-ignore
import riveWASMResource from "@rive-app/canvas/rive.wasm";
import Rive, { RuntimeLoader } from "@rive-app/react-canvas";

RuntimeLoader.setWasmUrl(riveWASMResource);

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
