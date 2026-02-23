"use client";
import React, { useEffect, useState } from "react";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";
import Image from 'next/image';
import Link from 'next/link'; // Import Link untuk navigasi

export default function MessagesPage() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const response = await directus.request(readItems('rooms'));
        setRooms(response);
      } catch (error) {
        console.error("Gagal ambil data rooms:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRooms();
  }, []);

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="p-6">
        <h2 className="mb-4 text-xl font-bold text-black dark:text-white">Inbox Chat</h2>

        {loading ? (
          <p>Sedang memuat ruangan...</p>
        ) : (
          <div className="flex flex-col">
            {rooms.length > 0 ? (
              rooms.map((room) => {
                const imageUrl = room.image
                  ? `http://127.0.0.1:8055/assets/${room.image}`
                  : null;

                return (
                  <Link
                    href={`/messages/${room.id}`} // Navigasi ke detail chat
                    key={room.id}
                    className="flex items-center gap-4 cursor-pointer p-4 hover:bg-gray-2 dark:hover:bg-strokedark transition border-b border-stroke dark:border-strokedark last:border-0"
                  >
                    {/* Avatar Container */}
                    <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary flex items-center justify-center text-white font-bold flex-shrink-0">
                      {imageUrl ? (
                        <Image
                          src={imageUrl}
                          alt={room.name || "Room Image"}
                          fill
                          className="object-cover"
                          sizes="48px" // Karena h-12 = 48px, ini lebih efisien
                        />
                      ) : (
                        <span>{room.name ? room.name.charAt(0).toUpperCase() : "R"}</span>
                      )}
                    </div>

                    {/* Room Info */}
                    <div className="flex flex-col overflow-hidden">
                      <h4 className="font-bold text-black dark:text-white truncate">
                        {room.name || "Untitled Room"}
                      </h4>
                      <p className="text-sm text-gray-500 truncate max-w-[300px]">
                        Klik untuk melihat percakapan
                      </p>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p>Tidak ada ruangan chat ditemukan.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}