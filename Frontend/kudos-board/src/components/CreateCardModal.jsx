import { useState } from 'react';
import axios from 'axios'
import '../styles/CreateBoardModal.css'
import '../styles/CreateCardModal.css'
import copy from "copy-to-clipboard";

const CreateCardModal = ({openModal, boardId, updateCards}) => {
    const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const postCardURL = `${API_URL}/cards`

    const [copyText, setCopyText] = useState("");
    const [searchGIF, setSearchGIF] = useState("");
    const [gifs, setGifs] = useState([]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.elements.cardTitle.value;
        const description = e.target.elements.cardDescription.value;
        const owner = e.target.elements.cardOwner.value;
        const boardID = parseInt(boardId);
        const gifURL = e.target.elements.cardGIF_URL.value;

        axios.post(postCardURL, {
            title: title,
            description: description,
            owner: owner,
            boardId: boardID,
            gifURL: gifURL
        }).then((response) => {updateCards()})
        .catch((error) => {console.log(error)})

        openModal();
    }

    const searchGIFs = (e) => {
        e.preventDefault();
        axios.get(`https://api.giphy.com/v1/gifs/search?q=${searchGIF}&api_key=${GIPHY_API_KEY}&limit=6`)
        .then((response) => {
            setGifs(response.data);
        })
        .catch((error) => {console.log(error)})
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
                    <form className='card-modal-form' onSubmit={handleSubmit}>
                        <input required className='modal-form-input' id='cardTitle' type='text' placeholder='Enter Card Title' />
                        <input required className='modal-form-input' id='cardDescription' type='text' placeholder='Enter Card Description' />
                        <input className='modal-form-input' id='cardSearch-GIF' type='text' value={searchGIF} onChange={handleSearchText} placeholder='Search GIFs...' />
                        <button onClick={searchGIFs}>Search</button>
                        {gifs && (
                            <div className='gif-grid'>
                                {gifs.data?.map((gif) => (
                                    <img className='gif-grid-img' src={gif.images.downsized.url} key={gif.id} alt={gif.title} onClick={() => setCopyText(gif.images.downsized.url)}/>
                                ))}
                            </div>
                        )}
                        <input required className='modal-form-input' id='cardGIF_URL' type='text' value={copyText} onChange={handleCopyText} placeholder='Enter GIF URL' />
                        <button onClick={copyToClipboard}>Copy GIF URL</button>
                        <input className='modal-form-input' id='cardOwner' type='text' placeholder='Enter Owner (Optional)' />
                        <button type='submit'>Create Card</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCardModal
