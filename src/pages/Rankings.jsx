import React, { useState } from 'react';

const Rankings = () => {
  // Estado booleano: 0 = falso (mostrar todos), 1 = verdadeiro (somente competitivos)
  const [mostrarCompetitivos, setMostrarCompetitivos] = useState(false);

  // Lista de jogadores simulada
  const listaJogadores = [
    { nome: "Ana", pontos: 1200, competitivo: true },
    { nome: "Carlos", pontos: 850, competitivo: false },
    { nome: "João", pontos: 950, competitivo: true },
    { nome: "Lúcia", pontos: 700, competitivo: false },
  ];

  // Filtra com base no valor booleano
  const jogadoresExibidos = mostrarCompetitivos
    ? listaJogadores.filter(jogador => jogador.competitivo)
    : listaJogadores;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Ranking de Jogadores</h1>

      {/* Switch booleano */}
      <div className="flex items-center justify-center mb-6">
        <label className="flex items-center space-x-2 text-lg">
          <input
            type="checkbox"
            checked={mostrarCompetitivos}
            onChange={() => setMostrarCompetitivos(prev => !prev)}
            className="w-5 h-5"
          />
          <span>Mostrar apenas jogadores competitivos</span>
        </label>
      </div>

      {/* Lista de jogadores */}
      <ul className="space-y-4">
        {jogadoresExibidos.map((jogador, index) => (
          <li
            key={index}
            className="p-4 border rounded-lg shadow flex justify-between items-center"
          >
            <span className="font-medium">{jogador.nome}</span>
            <span className="text-gray-600">{jogador.pontos} pontos</span>
          </li>
        ))}
      </ul>

      {/* Simulação de Tabela-Verdade */}
      <div className="mt-10 p-4 bg-gray-100 border rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Tabela Verdade – Decisão Binária</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">mostrarCompetitivos</th>
              <th className="p-2 border">Resultado</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border text-center">0 (false)</td>
              <td className="p-2 border">Exibe todos os jogadores</td>
            </tr>
            <tr>
              <td className="p-2 border text-center">1 (true)</td>
              <td className="p-2 border">Exibe apenas jogadores competitivos</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings;
