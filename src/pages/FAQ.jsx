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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Container do Feedback */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Avalie sua experiência</h2>
        
        <form onSubmit={handleFeedbackSubmit} className="space-y-6">
          <div className="text-center">
            <div className="flex justify-center space-x-2 mb-2">
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
              {rating ? `Avaliado com ${rating} estrela${rating > 1 ? 's' : ''}` : 'Selecione uma nota'}
            </p>
          </div>

          <textarea 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            placeholder="Deixe seu comentário..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={4}
          ></textarea>

          <button 
            type="submit" 
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Enviar Avaliação
          </button>
        </form>
      </div>
    </div>
  );
};

export default FAQ;
