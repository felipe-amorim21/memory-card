function Card({name, image}){
    return (
        <>
            <div>
                <h4>{name}</h4>
                <img src={image} alt={name + " image"} />
            </div>
        </>
    );
}

export default Card