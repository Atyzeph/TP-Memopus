import './App.scss';
import Term from './components/Term';
import Card from './components/Card';
import { useEffect, useRef, useState } from 'react';
import { getTerms, getCards, deleteCard, createCard, updateCard } from './services/memoServices';
import FormCard from './components/FormCard';
import CardUpdateForm from './components/CardUpdateForm';

function App() {

  // Création du state
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const inputQuestion = useRef(null);
  const inputAnswer = useRef(null);
  const [terms, setTerms] = useState([]);
  const [cards, setCards] = useState([]);
  const [showUpdateCardForm, setShowUpdateCardForm] = useState(false);
  const [cardToUpdate, setCardToUpdate] = useState(null);
  const [clicked_term, setClickedTerm] = useState(null);

  useEffect(() => {
    (
      async function () {

        const terms_api = await getTerms();
        console.log('terms ', terms_api);

        const cards_api = await getCards();
        console.log('cards ', cards_api);
        // const cardsDelete_api = await deleteCard();
        // console.log('cards ', cardsDelete_api);

        setTerms(terms_api)
        setCards(cards_api)
      })()

  }, []);

  const handleClickTerm = (e, tid) => {
    console.log('dans le handleClickTerm', tid);
    setShowAddCardForm(true);
    setClickedTerm(tid);
  }

  const handleClickDeleteCard = (e, id) => {
    e.preventDefault();
    const newCards = cards.filter((card) => {
      if (card.id === id) {
        deleteCard(id);
        return false;
      }
      return true;
    });
    setCards(newCards);
  };

  const handleSubmitAddCard = (e, idTerm) => {
    e.preventDefault();
    console.log(inputQuestion.current.value);
    console.log(inputAnswer.current.value);
    console.log(`Dans handleSubmitAddCard, term : ` + idTerm);
    // Création d'une card
    const new_card = {
      id: Math.random() * 1000,
      question: inputQuestion.current.value,
      answer: inputAnswer.current.value,
      tid: 0,
      cid: 0
    }
    if (idTerm !== undefined) {
      new_card.tid = idTerm;
    }
    // Ajout de la card au state cards
    setCards([...cards, new_card]);
    // Reset de la value du formulaire
    inputQuestion.current.value = null;
    inputAnswer.current.value = null;
    createCard(new_card);
  }

  function handleClickUpdate(e, id) {
    e.preventDefault();
    const cardToUpdate = cards.find((card) => card.id === id);
    setCardToUpdate(cardToUpdate);
    setShowUpdateCardForm(true);
  }

  function updateStateCard(updatedCard) {
    const updatedCards = cards.map((card) => {
      if (card.id === updatedCard.id) {
        return updatedCard;
      }
      return card;
    });
    handleSubmitUpdateCard();
    setCards(updatedCards);
  }

  const handleSubmitUpdateCard = (e) => {
    e.preventDefault();
    const updatedCard = {
      id: cardToUpdate.id,
      question: inputQuestion.current.value,
      answer: inputAnswer.current.value,
      tid: cardToUpdate.tid,
      cid: cardToUpdate.cid,
    };
    console.log(updatedCard);
    updateStateCard(updatedCard);
    updateCard(updatedCard);
    // Masquer le formulaire
    showUpdateCardForm(false);
  };


// OK
  return (
    <div className="App container">
      <header>
        <h1 className='text-center'>Memopus</h1>
      </header>
      {terms.map(term => {
        return <Term onClickTerm={handleClickTerm} key={term.title} title={term.title} id={term.id} />
      })}
      {showAddCardForm && (
        <FormCard inputAnswer={inputAnswer} inputQuestion={inputQuestion} onSubmitAddCard={(e) => handleSubmitAddCard(e, clicked_term)} />
      )}
      <div className="row">
      <div className="col-3">
        <h2 className="text-center">A apprendre</h2>
        {cards
          .filter((card) => {
            if (card.tid !== undefined || null) {
              return card.tid === parseInt(clicked_term);
            } else {
              return false;
            }
          })
          .filter((card) => card.cid === 1)
          .map((card) => {
            if (cardToUpdate !== null && cardToUpdate.id === card.id) {
              return (
                <div key={card.id}>
                  <CardUpdateForm card={cardToUpdate} onUpdate={(updatedCard) => updateStateCard(updatedCard, setCards)} />
                </div>
              );
            } else {
              return (
                <div className='mb-2'>
                  <Card
                    onClickCard={(e) => handleClickDeleteCard(e, card.id)}
                    onUpdateClick={(e) => handleClickUpdate(e, card.id)}
                    key={card.id}
                    question={card.question}
                    answer={card.answer}
                  />
                </div>
              );
            }
          })}
      </div>
      <div className="col-3">
        <h2 className="text-center">Je sais un peu</h2>
        {cards
          .filter((card) => {
            if (card.tid !== undefined || null) {
              return card.tid === parseInt(clicked_term);
            } else {
              return false;
            }
          })
          .filter((card) => card.cid === 2)
          .map((card) => {
            if (cardToUpdate !== null && cardToUpdate.id === card.id) {
              return (
                <div key={card.id}>
                  <CardUpdateForm card={cardToUpdate} onUpdate={(updatedCard) => updateStateCard(updatedCard, setCards)} />
                </div>
              );
            } else {
              return (
                <div className='mb-2'>
                  <Card
                    onClickCard={(e) => handleClickDeleteCard(e, card.id)}
                    onUpdateClick={(e) => handleClickUpdate(e, card.id)}
                    key={card.id}
                    question={card.question}
                    answer={card.answer}
                  />
                </div>
              );
            }
          })}
      </div>
      <div className="col-3">
        <h2 className="text-center">Je sais bien</h2>
        {cards
          .filter((card) => {
            if (card.tid !== undefined || null) {
              return card.tid === parseInt(clicked_term);
            } else {
              return false;
            }
          })
          .filter((card) => card.cid === 3)
          .map((card) => {
            if (cardToUpdate !== null && cardToUpdate.id === card.id) {
              return (
                <div key={card.id}>
                  <CardUpdateForm card={cardToUpdate} onUpdate={(updatedCard) => updateStateCard(updatedCard, setCards)} />
                </div>
              );
            } else {
              return (
                <div className='mb-2'>
                  <Card
                    onClickCard={(e) => handleClickDeleteCard(e, card.id)}
                    onUpdateClick={(e) => handleClickUpdate(e, card.id)}
                    key={card.id}
                    question={card.question}
                    answer={card.answer}
                  />
                </div>
              );
            }
          })}
      </div>
      <div className="col-3">
        <h2 className="text-center">Je sais parfaitement</h2>
        {cards
          .filter((card) => {
            if (card.tid !== undefined || null) {
              return card.tid === parseInt(clicked_term);
            } else {
              return false;
            }
          })
          .filter((card) => card.cid === 4)
          .map((card) => {
            if (cardToUpdate !== null && cardToUpdate.id === card.id) {
              return (
                <div key={card.id}>
                  <CardUpdateForm card={cardToUpdate} onUpdate={(updatedCard) => updateStateCard(updatedCard, setCards)} />
                </div>
              );
            } else {
              return (
                <div className='mb-2'>
                  <Card
                    onClickCard={(e) => handleClickDeleteCard(e, card.id)}
                    onUpdateClick={(e) => handleClickUpdate(e, card.id)}
                    key={card.id}
                    question={card.question}
                    answer={card.answer}
                  />
                </div>
              );
            }
          })}
      </div>
      </div>
    </div>
  );

}

export default App;
