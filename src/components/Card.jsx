function Card({id, name, image, onClick}){
    return (
        <>
            <div onClick={() => onClick(id)}>
                <h4>{name}</h4>
                <img src={image} alt={name + " image"} />
            </div>
        </>
    );
}

export default Card