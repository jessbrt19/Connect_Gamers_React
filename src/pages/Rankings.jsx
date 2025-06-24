import React, { useState } from 'react';

const Rankings = () => {
  const [mostrarCompetitivos, setMostrarCompetitivos] = useState(false);
  const [jogadorAtivo, setJogadorAtivo] = useState(null); // Para controlar o jogador aberto

  const listaJogadores = [
    { nome: "Ana", pontos: 1200, competitivo: true },
    { nome: "Carlos", pontos: 850, competitivo: false },
    { nome: "João", pontos: 950, competitivo: true },
    { nome: "Lúcia", pontos: 700, competitivo: false },
  ];

  const jogadoresExibidos = mostrarCompetitivos
    ? listaJogadores.filter(jogador => jogador.competitivo)
    : listaJogadores;

  const alternarJogador = (index) => {
    setJogadorAtivo(jogadorAtivo === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-xl">
      {/* Título principal */}
      <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">
        🏆 Painel de Ranking - Connect Gamers
      </h1>

      {/* Toggle com estilo */}
      <div className="flex justify-center items-center mb-6">
        <button
          onClick={() => setMostrarCompetitivos(prev => !prev)}
          className={`px-6 py-2 text-white font-semibold rounded-full shadow transition duration-300 ${
            mostrarCompetitivos ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-500 hover:bg-gray-600'
          }`}
        >
          {mostrarCompetitivos
            ? 'Exibindo: Apenas Competitivos'
            : 'Exibindo: Todos os Jogadores'}
        </button>
      </div>

      {/* Lista de jogadores */}
      <ul className="space-y-4">
        {jogadoresExibidos.map((jogador, index) => (
          <li
            key={index}
            className="border border-gray-300 rounded-lg p-4 shadow-md hover:shadow-lg transition duration-200 bg-gray-50"
          >
            <button
              className="text-indigo-800 font-bold text-lg hover:underline w-full text-left"
              onClick={() => alternarJogador(index)}
            >
              {jogador.nome}
            </button>

            {/* Container com os pontos (toggle) */}
            {jogadorAtivo === index && (
              <div className="mt-2 text-gray-700">
                Pontuação: <span className="font-semibold">{jogador.pontos}</span>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Tabela Verdade para lógica binária */}
      <div className="mt-10 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
        <h2 className="text-lg font-bold text-indigo-800 mb-2">📊 Tabela Verdade – Filtro Competitivo</h2>
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-indigo-100 text-indigo-900">
              <th className="p-2 border border-indigo-200">mostrarCompetitivos</th>
              <th className="p-2 border border-indigo-200">Comportamento</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-indigo-200 text-center">0 (false)</td>
              <td className="p-2 border border-indigo-200">Exibe todos os jogadores</td>
            </tr>
            <tr>
              <td className="p-2 border border-indigo-200 text-center">1 (true)</td>
              <td className="p-2 border border-indigo-200">Exibe apenas jogadores competitivos</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Rankings;

