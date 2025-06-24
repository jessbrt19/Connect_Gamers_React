// src/pages/Home.jsx
import { useTheme } from "../theme/ThemeContext";

export default function Rankings() {
  const { theme } = useTheme();
  return (
    <div className={`text-center mt-10 ${theme === "dark" ? "text-white" : "text-black"}`}>
      <h1 className="text-3xl font-bold">Página Rankings</h1>
    </div>
  );
}
import React, { useState } from 'react';

const Rankings = () => {
  const [modoCompetitivo, setModoCompetitivo] = useState(false);

  // Lista de jogadores simulada
  const jogadores = [
    { nome: "Ana", pontos: 1200, competitivo: true },
    { nome: "Carlos", pontos: 850, competitivo: false },
    { nome: "João", pontos: 950, competitivo: true },
    { nome: "Lúcia", pontos: 700, competitivo: false },
  ];

  // Filtro com base em decisão binária
  const jogadoresFiltrados = modoCompetitivo
    ? jogadores.filter(jogador => jogador.competitivo)
    : jogadores;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Ranking de Jogadores</h2>

      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={modoCompetitivo}
          onChange={() => setModoCompetitivo(!modoCompetitivo)}
          className="mr-2"
        />
        Mostrar apenas jogadores em modo competitivo
      </label>

      <ul className="space-y-2">
        {jogadoresFiltrados.map((jogador, index) => (
          <li key={index} className="border p-2 rounded shadow">
            {jogador.nome} - {jogador.pontos} pontos
          </li>
        ))}
      </ul>

      {/* Tabela Verdade (exibição de decisão lógica) */}
      <div className="mt-6 p-4 border rounded bg-gray-100">
        <h4 className="font-semibold">Tabela Verdade:</h4>
        <p>
          {modoCompetitivo
            ? "modoCompetitivo = 1 ➜ Mostrar só jogadores competitivos"
            : "modoCompetitivo = 0 ➜ Mostrar todos os jogadores"}
        </p>
      </div>
    </div>
  );
};

export default Rankings;
