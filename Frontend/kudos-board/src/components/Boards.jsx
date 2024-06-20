import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import '../styles/Boards.css'
import { Link } from 'react-router-dom'


const Boards = ({boardData, updateBoards}) => {
    const board = boardData;
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const deleteBoardURL = API_URL + `/boards/${board.id}`;

    const [imgSrc, setImgSrc] = useState(boardData.imageURL);

    const onDelete = () => {
        axios.delete(deleteBoardURL)
        .then((response) => {updateBoards()})
        .catch((error) => {console.log(error)})
    }

    return(
        <div className='board-container'>
            <div className='board-image-container'>
                <img className='board-image' src={imgSrc} alt='Board Picture' onError={() => setImgSrc('/default_image.jpg')}/>
            </div>
            <h3>{board.title}</h3>
            <p>{board.category}</p>
            <div className='board-buttons-container'>
                <Link to={`/board/${boardData.id}`}>
                    <button className='board-view-button'>View Board</button>
                </Link>
                <button className='board-delete-button' onClick={onDelete}>Delete Board</button>
            </div>
        </div>
    )
}

export default Boards;
