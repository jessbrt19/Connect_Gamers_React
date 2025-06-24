import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  // ... (o resto do código permanece igual até o return)

  return (
    <div
      className={`min-h-screen flex flex-col ${darkTheme ? 'text-gray-200' : 'text-gray-800'}`}
      style={{
        backgroundImage: darkTheme
          ? "url('/assets/IMAGENS/bg-dark.jpg')"
          : "url('/assets/IMAGENS/bg-light.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s'
      }}
    >
      {/* Overlay e Configurações permanecem iguais */}

      {/* Container principal - Cinza escuro transparente */}
      <div className={`container mx-auto px-4 pt-24 pb-16 max-w-4xl 
        bg-gray-800 bg-opacity-70  // Cinza escuro com 70% de opacidade
        rounded-xl shadow-2xl my-8 border 
        ${darkTheme ? 'border-gray-600' : 'border-gray-500'}
        backdrop-blur-sm  // Efeito de desfoque suave
      `}>
        
        {/* Cabeçalho do Perfil */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="w-44 h-44 rounded-full border-4 border-[rgb(253,77,121)] shadow-lg mx-auto flex items-center justify-center overflow-hidden" 
                 style={{ backgroundColor: 'rgba(58, 58, 74, 0.7)' }}>  {/* Cinza escuro transparente */}
              <img
                src={profileImage}
                alt="Foto do perfil"
                className="w-full h-full object-cover"
              />
            </div>
            {/* ... resto do cabeçalho permanece igual */}
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Seção de Eventos */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 pb-2 border-b-2 border-[rgb(253,77,121)] flex justify-center items-center text-gray-100`}>
              <i className="fas fa-calendar-alt mr-3 text-[rgb(253,77,121)]"></i> Meus Eventos
            </h2>
            <div className="space-y-4">
              <div className={`p-5 rounded-lg shadow-md transition-all hover:shadow-lg 
                bg-gray-700 bg-opacity-60 hover:bg-gray-700`}>
                <h3 className="font-bold text-lg text-gray-100">Torneio de Valorant</h3>
                {/* ... conteúdo do evento */}
              </div>
              {/* ... outros eventos */}
            </div>
          </section>

          {/* Seção de Senha */}
          <section className={`p-8 rounded-xl shadow-lg 
            bg-gray-700 bg-opacity-60 border border-gray-600`}>
            <h2 className={`text-2xl font-bold mb-6 pb-2 border-b-2 border-[rgb(253,77,121)] flex justify-center items-center text-gray-100`}>
              <i className="fas fa-lock mr-3 text-[rgb(253,77,121)]"></i> Alterar Senha
            </h2>
            {/* ... formulário de senha */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
