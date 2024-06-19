import { useEffect, useState } from 'react'
import axios from 'axios'
import '../styles/Boards.css'

const Boards = (props) => {
    const board = props.board;

    return(
        <div className='board-container'>
            <div className='board-image-container'>
                <img className='board-image' src='https://picsum.photos/200/300' />
            </div>
            <h3>{board.title}</h3>
            <p>{board.category}</p>
            <div className='board-buttons-container'>
                <button className='board-view-button'>View Board</button>
                <button className='board-delete-button'>Delete Board</button>
            </div>
        </div>
    )
}

export default Boards;
