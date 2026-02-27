"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import directus from "@/lib/directus";
import { readItems } from "@directus/sdk";

export default function ChatRoomPage() {
  const params = useParams();
  const roomId = params.id;
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await directus.request(
          readItems('messages', {
            filter: { room: { _eq: roomId } },
            sort: ['date_created'],
            fields: ['*', 'user_created.first_name'],
          })
        );
        setMessages(response);
      } catch (error) {
        console.error("Gagal load chat:", error);
      } finally {
        setLoading(false);
      }
    }
    if (roomId) fetchMessages();
  }, [roomId]);

  const getInitial = (name: string) => (name ? name.charAt(0).toUpperCase() : "U");

  return (
    <div className="flex flex-col h-[calc(100vh-150px)] bg-white dark:bg-boxdark rounded-sm border border-stroke dark:border-strokedark shadow-default relative overflow-hidden">
      
      {/* Header */}
      <div className="flex-none py-3 px-6 border-b border-stroke dark:border-strokedark bg-gray-2 dark:bg-meta-4">
        <h3 className="font-medium text-black dark:text-white text-sm">Detail Percakapan</h3>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-black/20 custom-scrollbar">
        {loading ? (
          <div className="flex justify-center items-center h-full text-black dark:text-white text-sm">
            <p>Memuat pesan...</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3">
              {/* Initial Profile */}
              <div className="flex-none h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold">
                {getInitial(msg.user_created?.first_name)}
              </div>

              {/* Chat Bubble - Width Fit Content (WhatsApp Style) */}
              <div className="max-w-[80%]">
                <div className="bg-white dark:bg-strokedark p-2.5 px-4 rounded-2xl rounded-tl-none border border-stroke dark:border-strokedark shadow-sm inline-block">
                  <p className="text-[11px] font-bold text-primary mb-1">
                    {msg.user_created?.first_name || "Admin"}
                  </p>
                  
                  {/* Thumbnail */}
                  {msg.attachment && (
                    <div 
                      className="mb-2 max-w-[200px] overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-all"
                      onClick={() => setSelectedImage(`http://127.0.0.1:8055/assets/${msg.attachment}`)}
                    >
                      <img 
                        src={`http://127.0.0.1:8055/assets/${msg.attachment}?width=400`} 
                        alt="attachment" 
                        className="w-full h-auto block" 
                      />
                    </div>
                  )}

                  <div className="flex flex-col min-w-[50px]">
                    <p className="text-black dark:text-white text-[13px] leading-snug">
                      {msg.text}
                    </p>
                    <p className="text-[9px] text-gray-400 mt-1 self-end italic">
                      {new Date(msg.date_created).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area - Tombol Dibuat Kontras & Tegas */}
      <div className="flex-none p-4 border-t border-stroke dark:border-strokedark bg-white dark:bg-boxdark">
        <div className="flex items-center gap-3 w-full">
          <input 
            type="text" 
            disabled
            placeholder="Ketik pesan..."
            className="flex-1 min-w-0 rounded-full border-[1.5px] border-stroke bg-gray-2 py-2 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
          
          {/* Tombol Kirim dengan Warna Biru Primary TailAdmin */}
          <button 
            type="button"
            className="flex-none bg-primary text-white font-bold h-10 px-8 rounded-full hover:bg-opacity-90 transition shadow-md flex items-center justify-center min-w-[100px]"
            style={{ backgroundColor: '#3C50E0', color: '#FFFFFF' }} // Paksa warna biru Primary TailAdmin & teks putih
          >
            Kirim
          </button>
        </div>
      </div>

      {/* MODAL LIGHTBOX - High Z-Index & Full Blur */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setSelectedImage(null)}
        >
           <button className="absolute top-6 right-6 text-white text-3xl font-light hover:scale-125 transition">&times;</button>
           <img 
             src={selectedImage} 
             className="max-w-full max-h-full object-contain rounded shadow-2xl"
             alt="Full size" 
           />
        </div>
      )}
    </div>
  );
}