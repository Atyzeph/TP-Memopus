const Term = (props) => {
    return (
        <button 
            // On récupères les propriétés de la balise (component) avec les props
            onClick={(e)=>{props.onClickTerm(e, props.id)}} 
            className="btn btn-secondary">{props.title}
        </button>
    );
}

export default Term;