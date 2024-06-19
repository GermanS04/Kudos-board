import { useEffect, useState } from 'react'
import axios from 'axios';
import '../styles/Boards.css'


const Boards = ({boardData, updateBoards}) => {
    const board = boardData;
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const deleteBoardURL = API_URL + `/boards/${board.id}`;

    const onDelete = () => {
        axios.delete(deleteBoardURL)
        .then((response) => {updateBoards()})
        .catch((error) => {console.log(error)})
    }

    return(
        <div className='board-container'>
            <div className='board-image-container'>
                <img className='board-image' src={`https://picsum.photos/200/300?random=${Math.random()}`} />
            </div>
            <h3>{board.title}</h3>
            <p>{board.category}</p>
            <div className='board-buttons-container'>
                <button className='board-view-button'>View Board</button>
                <button className='board-delete-button' onClick={onDelete}>Delete Board</button>
            </div>
        </div>
    )
}

export default Boards;
