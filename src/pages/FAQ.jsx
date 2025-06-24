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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Conteúdo do Feedback (sem container branco) */}
      <div className="w-full max-w-xl"> {/* Aumentado para max-w-xl */}
        <h2 className="text-3xl font-bold mb-8 text-center">Seu Feedback</h2>
        
        <form onSubmit={handleFeedbackSubmit} className="space-y-8">
          <div className="text-center">
            <p className="mb-4 text-xl">Como você avalia sua experiência?</p>
            <div className="flex justify-center space-x-3 mb-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  type="button"
                  key={value}
                  className={`text-4xl cursor-pointer transition-colors ${
                    (hoverRating || rating) >= value ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                  onClick={() => handleRatingChange(value)}
                  onMouseOver={() => handleMouseOver(value)}
                  onMouseLeave={handleMouseLeave}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <textarea 
            className="w-full p-4 text-lg border-0 rounded-lg focus:ring-2 focus:ring-pink-500"
            placeholder="Deixe seu comentário..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
          ></textarea>

          <button 
            type="submit" 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 px-6 rounded-lg text-lg font-medium"
          >
            ENVIAR AVALIAÇÃO
          </button>
        </form>
      </div>
    </div>
  );
};

export default FAQ;
