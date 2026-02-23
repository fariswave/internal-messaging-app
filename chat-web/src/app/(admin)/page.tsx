import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Internal Chat BPN | Dashboard",
  description: "Aplikasi Pesan Internal BPN",
};

export default function ChatDashboard() {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex h-[450px] flex-col items-center justify-center p-4 text-center sm:h-[550px] xl:h-[650px]">
        <div className="max-w-[450px]">
          <h2 className="mb-3 text-2xl font-bold text-black dark:text-white">
            Selamat Datang di Chat BPN
          </h2>
          <p className="font-medium">
            Silakan pilih menu <span className="text-primary font-bold">Inbox Chat</span> di sidebar untuk melihat pesan atau mulai percakapan baru.
          </p>
        </div>
      </div>
    </div>
  );
}