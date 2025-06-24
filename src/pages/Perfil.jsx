import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem("siteTheme") === "dark" || false);
  const [vlibrasActive, setVlibrasActive] = useState(localStorage.getItem("vlibrasAtivo") === "true" || false);
  const [profileImage, setProfileImage] = useState("https://via.placeholder.com/150");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("dark-theme", darkTheme);
    document.body.classList.toggle("light-theme", !darkTheme);
    localStorage.setItem("siteTheme", darkTheme ? "dark" : "light");
  }, [darkTheme]);

  useEffect(() => {
    if (vlibrasActive && window.VLibras) {
      new window.VLibras.Widget('https://vlibras.gov.br/app');
    }
    localStorage.setItem("vlibrasAtivo", vlibrasActive);
  }, [vlibrasActive]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleConfig = () => {
    setConfigOpen(!configOpen);
  };

  const handleThemeToggle = () => {
    setDarkTheme(!darkTheme);
  };

  const handleVlibrasToggle = () => {
    setVlibrasActive(!vlibrasActive);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    alert("Senha alterada com sucesso!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${darkTheme ? 'text-white' : 'text-gray-900'}`}
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
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={closeSidebar}
      ></div>
      
      {/* Configurações com submenu */}
      <div className="mt-4">
        <a
          href="#"
          onClick={toggleConfig}
          className={`hover:bg-opacity-20 px-4 py-2 rounded transition flex justify-between items-center ${
            darkTheme ? 'text-white hover:bg-white' : 'text-gray-900 hover:bg-gray-800'
          }`}
        >
          Configurações
          <span className={`transform transition-transform ${configOpen ? 'rotate-90' : ''}`}>›</span>
        </a>
        <div className={`ml-4 mt-2 space-y-2 ${configOpen ? 'block' : 'hidden'}`}>
          <div className="flex items-center justify-between px-4 py-2">
            <span className={darkTheme ? "text-white" : "text-gray-900"}>{darkTheme ? "Tema Escuro" : "Tema Claro"}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkTheme}
                onChange={handleThemeToggle}
              />
              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[rgb(253,77,121)]"></div>
            </label>
          </div>
          <div className="flex items-center justify-between px-4 py-2">
            <span className={darkTheme ? "text-white" : "text-gray-900"}>Libras</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={vlibrasActive}
                onChange={handleVlibrasToggle}
              />
              <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[rgb(253,77,121)]"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Conteúdo do Perfil */}
      <div className={`container mx-auto px-4 pt-24 pb-16 max-w-4xl ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
        {/* Cabeçalho do Perfil */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <img
              src={profileImage}
              alt="Foto do perfil"
              className="w-44 h-44 rounded-full border-4 border-[rgb(253,77,121)] object-cover shadow-lg mx-auto"
            />
            <label
              htmlFor="profilePictureInput"
              className="absolute bottom-3 right-3 bg-[rgb(253,77,121)] text-white px-3 py-1 rounded-full text-sm flex items-center cursor-pointer hover:bg-[rgb(220,60,100)] transition shadow-md"
            >
              <i className="fas fa-camera mr-1"></i> Alterar
            </label>
            <input
              type="file"
              id="profilePictureInput"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="mt-6">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgb(253,77,121)] to-[rgb(255,160,0)]">
              Nome do Usuário
            </h1>
            <p className={`mt-2 text-lg ${darkTheme ? 'text-gray-300' : 'text-gray-700'}`}>user@conectgamers.com</p>
            <div className="inline-block bg-gradient-to-r from-[rgb(253,77,121)] to-[rgb(255,160,0)] text-white px-6 py-2 rounded-full text-sm mt-3 shadow-lg">
              Ranking: Ouro
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          {/* Seção de Eventos */}
          <section className="mb-12">
            <h2 className={`text-2xl font-bold mb-6 pb-2 border-b-2 border-[rgb(253,77,121)] flex justify-center items-center ${
              darkTheme ? 'text-white' : 'text-gray-900'
            }`}>
              <i className="fas fa-calendar-alt mr-3 text-[rgb(253,77,121)]"></i> Meus Eventos
            </h2>
            <div className="space-y-4">
              <div className={`p-5 rounded-lg shadow-md transition-all hover:shadow-lg ${
                darkTheme 
                  ? 'bg-gray-800 bg-opacity-80 hover:bg-gray-700' 
                  : 'bg-white bg-opacity-90 hover:bg-gray-50'
              }`}>
                <h3 className="font-bold text-lg">Torneio de Valorant</h3>
                <div className="flex items-center mt-2">
                  <i className={`fas fa-calendar-day mr-2 ${
                    darkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}></i>
                  <p className={`text-sm ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>25/05/2025 - Online</p>
                </div>
                <div className="mt-3 flex justify-end">
                  <span className="bg-[rgb(253,77,121)] bg-opacity-20 text-[rgb(253,77,121)] px-3 py-1 rounded-full text-xs font-medium">
                    Inscrito
                  </span>
                </div>
              </div>
              <div className={`p-5 rounded-lg shadow-md transition-all hover:shadow-lg ${
                darkTheme 
                  ? 'bg-gray-800 bg-opacity-80 hover:bg-gray-700' 
                  : 'bg-white bg-opacity-90 hover:bg-gray-50'
              }`}>
                <h3 className="font-bold text-lg">Campeonato de League of Legends</h3>
                <div className="flex items-center mt-2">
                  <i className={`fas fa-calendar-day mr-2 ${
                    darkTheme ? 'text-gray-400' : 'text-gray-600'
                  }`}></i>
                  <p className={`text-sm ${darkTheme ? 'text-gray-300' : 'text-gray-600'}`}>02/06/2025 - Online</p>
                </div>
                <div className="mt-3 flex justify-end">
                  <span className="bg-[rgb(253,77,121)] bg-opacity-20 text-[rgb(253,77,121)] px-3 py-1 rounded-full text-xs font-medium">
                    Inscrito
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Seção de Senha */}
          <section className={`p-8 rounded-xl shadow-lg ${
            darkTheme 
              ? 'bg-gray-800 bg-opacity-80 border border-gray-700' 
              : 'bg-white bg-opacity-95 border border-gray-200'
          }`}>
            <h2 className={`text-2xl font-bold mb-6 pb-2 border-b-2 border-[rgb(253,77,121)] flex justify-center items-center ${
              darkTheme ? 'text-white' : 'text-gray-900'
            }`}>
              <i className="fas fa-lock mr-3 text-[rgb(253,77,121)]"></i> Alterar Senha
            </h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-5">
                <label className={`block mb-3 font-semibold ${
                  darkTheme ? 'text-gray-300' : 'text-gray-700'
                }`}>Senha Atual</label>
                <input
                  type="password"
                  className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(253,77,121)] ${
                    darkTheme 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border`}
                  placeholder="Digite sua senha atual"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label className={`block mb-3 font-semibold ${
                  darkTheme ? 'text-gray-300' : 'text-gray-700'
                }`}>Nova Senha</label>
                <input
                  type="password"
                  className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(253,77,121)] ${
                    darkTheme 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border`}
                  placeholder="Digite a nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className={`block mb-3 font-semibold ${
                  darkTheme ? 'text-gray-300' : 'text-gray-700'
                }`}>Confirmar Nova Senha</label>
                <input
                  type="password"
                  className={`w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(253,77,121)] ${
                    darkTheme 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  } border`}
                  placeholder="Confirme a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[rgb(253,77,121)] to-[rgb(255,160,0)] hover:from-[rgb(220,60,100)] hover:to-[rgb(230,140,0)] text-white py-3 px-4 rounded-lg font-bold transition-all shadow-md hover:shadow-lg"
              >
                Atualizar Senha
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
