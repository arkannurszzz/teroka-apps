// src/app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-r from-yellow-400 via-amber-400 to-orange-500 flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-md rounded-2xl p-12 shadow-2xl">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          TAILWIND v4 JALAN!
        </h1>
        <p className="mt-4 text-xl text-white/90">
          Gradient kuning aktif!
        </p>
      </div>
    </div>
  );
}