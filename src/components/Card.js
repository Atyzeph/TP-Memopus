const Card = (props) => {
    return (
        <article className="border">
            <h2>{props.question}</h2>
            <p>{props.answer}</p>
            <button className="btn btn-outline-warning" onClick={(e) => { props.onUpdateClick(e, props.id) }}>Modifier</button>
            <button className="btn btn-danger" onClick={(e) => { props.onClickCard(e, props.id) }}>Supprimer</button>
        </article>
    );
}


export default Card;