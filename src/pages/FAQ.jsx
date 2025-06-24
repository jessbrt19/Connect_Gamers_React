import React, { useState } from 'react';

const FAQ = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedback, setFeedback] = useState("");

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
    alert("Obrigado pelo seu feedback!");
    setRating(0);
    setFeedback("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <nav className="w-full p-2 bg-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a className="navbar-brand" href="/">
              <img 
                src="../assets/IMAGENS/logo - tema claro.png" 
                alt="logo" 
                className="w-48 ml-4" 
              />
            </a>
          </div>
          <a href="/login" className="mr-4">
            <img 
              src="../assets/IMAGENS/perfil_preto.png" 
              alt="Perfil" 
              className="w-10" 
            />
          </a>
        </div>
      </nav>

      {/* Container Principal */}
      <main className="flex-grow flex justify-center items-center p-4">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
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
              className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-4 rounded-lg transition-colors font-medium"
            >
              Enviar Feedback
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 text-center bg-gray-100 text-gray-800">
        <p>© 2025 Connect Gamers. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default FAQ;
