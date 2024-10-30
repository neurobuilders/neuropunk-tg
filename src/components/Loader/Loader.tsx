import { PrefetchKind } from "next/dist/client/components/router-reducer/router-reducer-types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const Loader = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/reactor", { kind: PrefetchKind.FULL });
    router.prefetch("/pass", { kind: PrefetchKind.FULL });
    router.prefetch("/settings", { kind: PrefetchKind.FULL });
  }, [router]);

  return (
    <div className="root__loading flex flex-col gap-7">
      <span className="loader"></span>
      <p className="leading-6 text-xl text-white mt-[20%]">Loading</p>
    </div>
  );
};
