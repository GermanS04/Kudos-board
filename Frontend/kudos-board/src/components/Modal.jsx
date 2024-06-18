import { useState, useEffect } from 'react';
import '../styles/Modal.css';

const Modal = ({openModal}) => {

    // TO DO - Function to create a new board and add it to the database

    return (
        <div className='modal-container'>
            <div className="modal-overlay" onClick={openModal()}>
            </div>
            <div className='modal-content'>
                <div className='modal-close-button-container'>
                    <button className='modal-close-button' onClick={openModal()}>X</button>
                </div>
                <div>
                    <h2 className='title-modal'>Create a New Board</h2>
                </div>
                <div>
                    <form className='modal-form'>
                        <div>
                            <label htmlFor='name'> Board Name: </label><br />
                            <input type="text" id='name' placeholder='Board Name' className='modal-input-option'></input><br />
                        </div>

                        <div>
                            <label htmlFor='category'> Category: </label><br />
                            <select id='category' className='modal-select-option'>
                                <option value=''>Select a Category</option>
                            </select><br />
                        </div>

                        <div>
                            <label htmlFor='author'> Author: </label><br />
                            <input type="text" id='author' placeholder='Author Name' className='modal-input-option'></input><br />
                        </div>

                        <button className='modal-create-button' onClick={(e) => {
                            e.preventDefault();
                            openModal();
                            }}>
                            Create Board
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Modal;
