import { useState } from 'react';
import { updateCard } from '../services/memoServices';

function CardUpdateForm({ card, onUpdate }) {
  const [question, setQuestion] = useState(card.question);
  const [answer, setAnswer] = useState(card.answer);

  function handleQuestionChange(event) {
    setQuestion(event.target.value);
  }

  function handleAnswerChange(event) {
    setAnswer(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const updatedCard = {
      ...card,
      question,
      answer,
    };
    updateCard(updatedCard).then(() => {
      onUpdate(updatedCard);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="question">Question </label>
        <input
          type="text"
          id="question"
          value={question}
          onChange={handleQuestionChange}
        />
      </div>
      <div>
        <label htmlFor="answer">Réponse </label>
        <input
          type="text"
          id="answer"
          value={answer}
          onChange={handleAnswerChange}
        />
      </div>
      <button className='btn btn-outline-success' type="submit">Enregistrer</button>
    </form>
  );
}

export default CardUpdateForm;
