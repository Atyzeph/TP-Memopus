const FormCard = ({inputAnswer, inputQuestion, onSubmitAddCard}) => {
    return (
        <form
        onSubmit={(e) => { onSubmitAddCard(e) }}
        action=""
        className="my-3 input-group gap-2 align-items-center">
            <label className=" form-label" htmlFor="add-card">Ajouter une carte</label>
            <input className="w-25" ref={inputQuestion} type="text" id="add-question" placeholder="Question" />
            <input className="w-25" ref={inputAnswer} type="text" id="add-answer" placeholder="Réponse" />
            <input className="btn btn-success" type="submit" value="Ajouter" />
        </form>
    );
}

export default FormCard;