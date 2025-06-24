import React, { useState } from 'react';

const Rankings = () => {
  const [mostrarCompetitivos, setMostrarCompetitivos] = useState(false);
  const [jogadorAtivo, setJogadorAtivo] = useState(null);

  const listaJogadores = [
    { nome: "Ana", pontos: 1200, competitivo: true },
    { nome: "Carlos", pontos: 850, competitivo: false },
    { nome: "João", pontos: 950, competitivo: true },
    { nome: "Lúcia", pontos: 700, competitivo: false },
  ];

  const jogadoresExibidos = mostrarCompetitivos
    ? listaJogadores.filter(j => j.competitivo)
    : listaJogadores;

  const alternarJogador = (index) => {
    setJogadorAtivo(jogadorAtivo === index ? null : index);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Título principal */}
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Ranking de Jogadores
      </h1>

      {/* Botão de exibir competitivos */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setMostrarCompetitivos(prev => !prev)}
          className={`px-6 py-2 font-semibold rounded-full transition duration-300 text-sm ${
            mostrarCompetitivos
              ? 'bg-gray-800 text-white hover:bg-gray-700'
              : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
          }`}
        >
          {mostrarCompetitivos
            ? 'Exibindo: Apenas Competitivos'
            : 'Exibindo: Todos os Jogadores'}
        </button>
      </div>

      {/* Lista de jogadores */}
      <ul className="space-y-3">
        {jogadoresExibidos.map((jogador, index) => (
          <li
            key={index}
            className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-100 hover:bg-gray-200 transition duration-150"
          >
            <button
              className="w-full text-left text-gray-800 font-medium text-lg hover:underline"
              onClick={() => alternarJogador(index)}
            >
              {jogador.nome}
            </button>

            {jogadorAtivo === index && (
              <div className="mt-1 text-gray-600 text-sm">
                Pontuação: <span className="font-semibold">{jogador.pontos}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Rankings;
