import { useEffect, useState, useRef } from 'react'
import { FaHeart } from "react-icons/fa";
import { BiSolidCommentDetail } from "react-icons/bi";
import axios from 'axios';
import '../styles/Cards.css'


const Cards = ({cardData, updateCards, openModal, modalCard}) => {
    const card = cardData;
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const deleteCardURL = API_URL + `/cards/${card.id}`;
    const getLikesURL = API_URL + `/likes/${card.id}`;
    const postLikesURL = API_URL + '/likes'
    const [imgSrc, setImgSrc] = useState(card.gifURL);
    const [likes, setLikes] = useState(null);

    const onDelete = () => {
        axios.delete(deleteCardURL)
        .then((response) => {updateCards()})
        .catch((error) => {console.log(error)})
    }

    const getLikes = () => {
        axios.get(getLikesURL)
        .then((response) => {setLikes(response.data)})
        .catch((error) => {console.log(error)})
    }

    const postLike = () => {
        axios.post(postLikesURL, {
            cardId: card.id
        }).then((response) => {getLikes()})
        .catch((error) => {console.log(error)})
    }

    useEffect(() => {
        getLikes();
    }, [])

    return(
        <div className='board-container'>
            <div className='board-image-container'>
                <img className='board-image' src={imgSrc} alt='Card Picture' onError={() => setImgSrc('/default_image.jpg')}/>
            </div>
            <h3>{card.title}</h3>
            <p>{card.description}</p>
            <div className='board-buttons-container'>
                <button className='card-like-button' onClick={postLike}><FaHeart className='like-icon'/> {likes?.length}</button>
                <button className='board-delete-button' onClick={onDelete}>Delete Card</button>
                <button className='card-comment-button' onClick={() => {openModal(); modalCard(card)}}><BiSolidCommentDetail className='comment-icon'/></button>
            </div>
        </div>
    )
}

export default Cards;
