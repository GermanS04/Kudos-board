import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import '../styles/Cards.css'


const Cards = ({cardData, updateCards}) => {
    const card = cardData;
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const deleteCardURL = API_URL + `/cards/${card.id}`;
    const [imgSrc, setImgSrc] = useState(card.gifURL)

    const onDelete = () => {
        axios.delete(deleteCardURL)
        .then((response) => {updateCards()})
        .catch((error) => {console.log(error)})
    }

    return(
        <div className='board-container'>
            <div className='board-image-container'>
                <img className='board-image' src={imgSrc} alt='Card Picture' onError={() => setImgSrc('/default_image.jpg')}/>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className='board-buttons-container'>
                <button>Upcount</button>
                <button className='board-delete-button' onClick={onDelete}>Delete Board</button>
            </div>
        </div>
    )
}

export default Cards;
