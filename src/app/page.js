"use client";

import C14Panel from "@/components/page/c14panel";

export default async function HomePage() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] min-h-screen p-4 pb-20 sm:p-10 font-[family-name:var(--font-geist-sans)]">
      <C14Panel />
    </div>
  );
}
