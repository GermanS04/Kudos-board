import { useState, useEffect } from 'react';
import axios from 'axios'
import '../styles/CommentsModal.css'
import Comments from './Comments';


const CommentsModal = ({openModal, card}) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const postCommentURL = API_URL + '/comments';
    const getCommentURL = API_URL + `/comments/${card.id}`

    const [imgSrc, setImgSrc] = useState(card.gifURL);
    const [owner, setOwner] = useState(card.owner);
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState(null);

    const checkOwner = () => {
        if(card.owner === ""){
            setOwner("Anonymous")
        }
    }

    useEffect(() => {
        checkOwner();
    }, [owner])

    const onChangeCommentText = (e) => {
        setCommentText(e.target.value);
    }

    const getComments = () => {
        axios.get(getCommentURL)
        .then((response) => {setComments(response.data)})
        .catch((error) => {console.log(error)});
    }

    const onSubmitComment = (e) => {
        e.preventDefault();
        const content = commentText;
        const cardId = parseInt(card.id);

        axios.post(postCommentURL, {
            content: content,
            cardId: cardId
        }).then((response) => {getComments()})
        .catch((error) => {console.log(error)})

        setCommentText('');
    }

    useEffect(() => {
        getComments();
    }, [])

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
                    <div className='comments-modal-comment-container-container'>
                        <div className='comments-modal-comment-container'>
                        { comments?.map((comment) => {
                            return(
                                <Comments key={card.id} commentData={comment} />
                            )
                        })}
                        </div>
                    </div>
                    <div className='comments-modal-post-comment-container'>
                        <form className='comments-modal-form' onSubmit={onSubmitComment}>
                            <textarea className='comments-modal-form-comment' required type='text' id='comment' value={commentText} onChange={onChangeCommentText} />
                            <button className='comments-modal-form-submit' type='submit'>Submit</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CommentsModal;
