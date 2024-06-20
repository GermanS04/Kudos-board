import { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/CommentsModal.css'


const CommentsModal = ({openModal, card}) => {
    console.log(card)
    const [imgSrc, setImgSrc] = useState(card.gifURL);
    const [owner, setOwner] = useState(card.owner);

    const checkOwner = () => {
        if(card.owner === ""){
            setOwner("Anonymous")
        }
    }

    useEffect(() => {
        checkOwner();
    }, [owner])

    return(
        <div className='comments-modal-container'>
            <div className="comments-modal-overlay" onClick={openModal}>
            </div>
            <div className='comments-modal-content'>
                <div className='comments-modal-image-container'>
                    <img className='comments-modal-image' src={imgSrc} alt='Card Picture' onError={() => setImgSrc('/default_image.jpg')}/>
                </div>
                <div className='comments-modal-info-container'>
                    <div className='comments-modal-info'>
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <p>Owner: {owner}</p>
                    </div>
                    <div className='comments-modal-comment-container'>
                        a
                    </div>
                    <div className='comments-modal-post-comment-container'>
                        a
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CommentsModal;
