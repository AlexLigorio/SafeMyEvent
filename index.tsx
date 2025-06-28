import React from 'react';
import { Music, Filter, MessageCircle, Zap, Inbox, Star } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white overflow-hidden flex flex-col items-center px-4 py-8">
      {/* Header */}
      <header className="w-full max-w-6xl flex items-center justify-between mb-8">
        <h1 className="text-xl font-medium text-zinc-800">SaveMyEvent</h1>
        <div className="flex space-x-4">
          <button className="px-5 py-2.5 bg-white rounded-md border border-stone-500 text-zinc-800 font-mono">
            Soy artista
          </button>
          <button className="px-5 py-2.5 bg-white rounded-md border border-stone-500 text-zinc-800 font-mono">
            Soy empresa
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="w-full max-w-6xl flex flex-col items-center">
        <div className="w-full h-64 bg-zinc-100 border border-stone-500 mb-12" />
        <h2 className="text-4xl font-medium text-zinc-800 text-center leading-snug mb-16">
          La solución instantánea<br />
          para cubrir tus bajas<br />
          de última hora
        </h2>

        {/* How it Works */}
        <section className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <h3 className="text-3xl font-medium text-stone-500 text-center">
              Cómo funciona?
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <Music size={32} />
                <span className="text-xl font-medium text-zinc-800">
                  Encuentra artistas disponibles
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Filter size={32} />
                <span className="text-xl font-medium text-zinc-800">
                  Filtra según tus necesidades
                </span>
              </li>
              <li className="flex items-center gap-4">
                <MessageCircle size={32} />
                <span className="text-xl font-medium text-zinc-800">
                  Contacta al instante
                </span>
              </li>
            </ul>
          </div>

          {/* Artist Flow */}
          <div className="space-y-4">
            <ul className="space-y-4">
              <li className="flex items-center gap-4">
                <Zap size={32} />
                <span className="text-xl font-medium text-zinc-800">
                  Actívate
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Inbox size={32} />
                <span className="text-xl font-medium text-zinc-800">
                  Recibe solicitudes
                </span>
              </li>
              <li className="flex items-center gap-4">
                <Star size={32} />
                <span className="text-xl font-medium text-zinc-800">
                  Gana visibilidad y reputación
                </span>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;

