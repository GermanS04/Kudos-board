import { useState } from 'react';
import axios from 'axios'
import '../styles/CreateBoardModal.css'
import '../styles/CreateCardModal.css'
import copy from "copy-to-clipboard";

const CreateCardModal = ({openModal}) => {
    const [copyText, setCopyText] = useState("");
    const [searchGIF, setSearchGIF] = useState("");

    const handleCopyText = (e) => {
        setCopyText(e.target.value);
    };

    const copyToClipboard = (e) => {
        e.preventDefault();
        copy(copyText);
    };

    const handleSearchText = (e) => {
        setSearchGIF(e.target.value);
    }


    return (
        <div className='modal-container'>
            <div className="modal-overlay" onClick={openModal}>
            </div>
            <div className='card-modal-content'>
                <div className='modal-close-button-container'>
                    <button className='modal-close-button' onClick={openModal}>X</button>
                </div>
                <div>
                    <h2 className='title-modal'>Create a New Card</h2>
                </div>
                <div>
                    <form className='card-modal-form'>
                        <input className='modal-form-input' type='text' placeholder='Enter Card Title' />
                        <input className='modal-form-input' type='text' placeholder='Enter Card Description' />
                        <input className='modal-form-input' type='text' value={searchGIF} onChange={handleSearchText} placeholder='Search GIFs...' />
                        <button>Search</button>
                        <input className='modal-form-input' type='text' value={copyText} onChange={handleCopyText} placeholder='Enter GIF URL' />
                        <button onClick={copyToClipboard}>Copy GIF URL</button>
                        <input className='modal-form-input' type='text' placeholder='Enter Owner (Optional)' />
                        <button type='submit'>Create Card</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCardModal
