"use client";

import dynamic from "next/dynamic";

const DeferredClientEffects = dynamic(
  () => import("@/components/site/DeferredClientEffects"),
  { ssr: false },
);

export function ClientDeferredShell() {
  return <DeferredClientEffects />;
}
