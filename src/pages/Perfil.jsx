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
    <div className={`min-h-screen flex flex-col ${darkTheme ? 'bg-black text-white' : 'bg-white text-gray-900'}`}>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${sidebarOpen ? 'block' : 'hidden'}`} 
        onClick={closeSidebar}
      ></div>

      {/* Sidebar */}
      <div className={`fixed h-full w-0 top-0 left-0 bg-black overflow-x-hidden transition-all duration-300 pt-16 z-50 ${sidebarOpen ? 'w-64' : ''}`}>
        <div className="flex flex-col space-y-2 p-4">
          <a href="/" className="text-white hover:bg-gray-800 px-4 py-2 rounded transition">Home</a>
          <a href="/eventos" className="text-white hover:bg-gray-800 px-4 py-2 rounded transition">Jogos e Eventos</a>
          <a href="/cadastro" className="text-white hover:bg-gray-800 px-4 py-2 rounded transition">Inscreva-se</a>
          <a href="/rankings" className="text-white hover:bg-gray-800 px-4 py-2 rounded transition">Rankings</a>
          <a href="/faq" className="text-white hover:bg-gray-800 px-4 py-2 rounded transition">FAQ</a>
          <a href="/pesquisa" className="text-white hover:bg-gray-800 px-4 py-2 rounded transition">Saiba mais</a>

          {/* Configurações com submenu */}
          <div className="mt-4">
            <a 
              href="#" 
              onClick={toggleConfig} 
              className="text-white hover:bg-gray-800 px-4 py-2 rounded transition flex justify-between items-center"
            >
              Configurações
              <span className={`transform transition-transform ${configOpen ? 'rotate-90' : ''}`}>›</span>
            </a>
            <div className={`ml-4 mt-2 space-y-2 ${configOpen ? 'block' : 'hidden'}`}>
              <div className="flex items-center justify-between px-4 py-2">
                <span className="text-white">{darkTheme ? "Tema Escuro" : "Tema Claro"}</span>
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
                <span className="text-white">Libras</span>
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
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full p-2 z-30 ${darkTheme ? 'bg-black' : 'bg-gray-100'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div 
              className="cursor-pointer mr-4" 
              onClick={toggleSidebar}
            >
              <img 
                src="../assets/IMAGENS/lista.png" 
                alt="Menu" 
                className="w-10" 
              />
            </div>
            <a className="navbar-brand" href="/">
              <img 
                src={darkTheme ? 
                  "../assets/IMAGENS/Connect_Gamers_logo_OFICIAL-removebg-preview.png" : 
                  "../assets/IMAGENS/logo - tema claro.png"} 
                alt="logo" 
                className="w-48 ml-4" 
              />
            </a>
          </div>
        </div>
      </nav>

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
              className="absolute bottom-3 right-3 bg-[rgb(253,77,121)] text-white px-3 py-1 rounded-full text-sm flex items-center cursor-pointer hover:bg-[rgb(220,60,100)] transition"
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
            <h1 className="text-2xl font-bold">Nome do Usuário</h1>
            <p className={`mt-1 ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>user@conectgamers.com</p>
            <div className="inline-block bg-[rgb(253,77,121)] text-white px-4 py-1 rounded-full text-sm mt-2">
              Ranking: Ouro
            </div>
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Seção de Eventos */}
          <section className="mb-12">
            <h2 className={`text-xl font-semibold mb-6 pb-2 border-b border-[rgb(253,77,121)] flex justify-center items-center ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
              <i className="fas fa-calendar-alt mr-2"></i> Meus Eventos
            </h2>
            <div className="space-y-4">
              <div className={`p-4 border rounded-lg ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className="font-medium">Torneio de Valorant</h3>
                <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>25/05/2025 - Online</p>
              </div>
              <div className={`p-4 border rounded-lg ${darkTheme ? 'border-gray-700' : 'border-gray-200'}`}>
                <h3 className="font-medium">Campeonato de League of Legends</h3>
                <p className={`text-sm ${darkTheme ? 'text-gray-400' : 'text-gray-600'}`}>02/06/2025 - Online</p>
              </div>
            </div>
          </section>

          {/* Seção de Senha */}
          <section className={`p-6 rounded-lg border border-[rgb(253,77,121)] ${darkTheme ? 'bg-gray-800 bg-opacity-50' : 'bg-gray-100'}`}>
            <h2 className={`text-xl font-semibold mb-6 pb-2 border-b border-[rgb(253,77,121)] flex justify-center items-center ${darkTheme ? 'text-white' : 'text-gray-900'}`}>
              <i className="fas fa-lock mr-2"></i> Alterar Senha
            </h2>
            <form onSubmit={handlePasswordSubmit}>
              <div className="mb-4">
                <label className={`block mb-2 font-medium ${darkTheme ? 'text-white' : 'text-gray-900'}`}>Senha Atual</label>
                <input 
                  type="password" 
                  className={`w-full p-3 rounded focus:outline-none ${darkTheme ? 'bg-gray-700 border-gray-600 text-white focus:border-[rgb(253,77,121)]' : 'bg-white border-gray-300 text-gray-900 focus:border-[rgb(253,77,121)]'} border`}
                  placeholder="Digite sua senha atual"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className={`block mb-2 font-medium ${darkTheme ? 'text-white' : 'text-gray-900'}`}>Nova Senha</label>
                <input 
                  type="password" 
                  className={`w-full p-3 rounded focus:outline-none ${darkTheme ? 'bg-gray-700 border-gray-600 text-white focus:border-[rgb(253,77,121)]' : 'bg-white border-gray-300 text-gray-900 focus:border-[rgb(253,77,121)]'} border`}
                  placeholder="Digite a nova senha"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label className={`block mb-2 font-medium ${darkTheme ? 'text-white' : 'text-gray-900'}`}>Confirmar Nova Senha</label>
                <input 
                  type="password" 
                  className={`w-full p-3 rounded focus:outline-none ${darkTheme ? 'bg-gray-700 border-gray-600 text-white focus:border-[rgb(253,77,121)]' : 'bg-white border-gray-300 text-gray-900 focus:border-[rgb(253,77,121)]'} border`}
                  placeholder="Confirme a nova senha"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button 
                type="submit" 
                className="w-full bg-[rgb(253,77,121)] hover:bg-[rgb(220,60,100)] text-white py-3 px-4 rounded font-medium transition"
              >
                Atualizar Senha
              </button>
            </form>
          </section>
        </div>
      </div>

      {/* Footer */}
      <footer className={`py-4 text-center ${darkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} border-t-2 border-[rgb(253,77,121)] shadow-inner`}>
        <p>© 2025 Connect Gamers. Todos os direitos reservados.</p>
        <p>Desenvolvido por: Ana Gonçalves, Jessica Brito, Mariana Albano, Neemias Silva, Vinícius Gonzales.</p>
      </footer>

      {/* Widget VLibras */}
      {vlibrasActive && (
        <div id="vlibras">
          <div vw className="enabled">
            <div vw-access-button className="active"></div>
            <div vw-plugin-wrapper>
              <div className="vw-plugin-top-wrapper"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;