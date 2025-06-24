import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQ = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem("siteTheme") === "dark" || false);
  const [vlibrasActive, setVlibrasActive] = useState(localStorage.getItem("vlibrasAtivo") === "true" || false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");
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

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleMouseOver = (value) => {
    setHoverRating(value);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback enviado:", { rating, feedback });
    alert("Obrigado pelo seu feedback!");
    setRating(0);
    setFeedback("");
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
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
          <div className="configuracoes mt-4">
            <a href="#" onClick={toggleConfig} className="text-white hover:bg-gray-800 px-4 py-2 rounded transition flex justify-between items-center">
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
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-500"></div>
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
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-pink-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className={`fixed top-0 w-full p-2 z-30 ${darkTheme ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container-fluid flex justify-between items-center">
          <div className="flex items-center">
            <div className="cursor-pointer mr-4" onClick={toggleSidebar}>
              <img src="../assets/IMAGENS/lista.png" alt="Menu" className="w-10" />
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

          <a href="/login" className="mr-4">
            <img 
              src={darkTheme ? 
                "../assets/IMAGENS/perfil.png" : 
                "../assets/IMAGENS/perfil_preto.png"} 
              alt="Perfil" 
              className="w-10" 
            />
          </a>
        </div>
      </nav>

      {/* Conteúdo Principal */}
      <main className="flex-grow pt-16 pb-16 flex justify-center items-center">
        <div className={`p-8 rounded-lg shadow-lg bg-white w-full max-w-md mx-4`}>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Seu Feedback é importante para nós!</h2>
          
          <form onSubmit={handleFeedbackSubmit} className="space-y-6">
            <div className="text-center">
              <p className="mb-3 text-gray-600">Como você avalia sua experiência?</p>
              <div className="flex justify-center space-x-2 mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    type="button"
                    key={value}
                    className={`text-3xl cursor-pointer transition-colors ${
                      (hoverRating || rating) >= value ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    onClick={() => handleRatingChange(value)}
                    onMouseOver={() => handleMouseOver(value)}
                    onMouseLeave={handleMouseLeave}
                  >
                    ★
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500">
                {rating === 0 ? 'Selecione uma nota' : `Você avaliou com ${rating} estrela${rating > 1 ? 's' : ''}`}
              </p>
            </div>

            <div>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Deixe seu Feedback aqui..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={5}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg transition-colors font-medium shadow-md"
            >
              Enviar Feedback
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className={`py-4 text-center ${darkTheme ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-800'}`}>
        <p>© 2025 Connect Gamers. Todos os direitos reservados.</p>
        <p className="mt-1">Desenvolvido por: Ana Gonçalves, Jessica Brito, Mariana Albano, Neemias Silva, Vinícius Gonzales.</p>
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

export default FAQ;
