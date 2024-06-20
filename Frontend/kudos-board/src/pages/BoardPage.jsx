import React from 'react';
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import CreateCardModal from '../components/CreateCardModal';
import Cards from '../components/Cards';
import '../styles/App.css'
import '../styles/BoardPage.css'

const BoardPage = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams();

    const [boardInfo, setBoardInfo] = useState(null);
    const [cards, setCards] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        if (modalOpen){
            setModalOpen(false);
        } else {
            setModalOpen(true);
        }
    }

    const getCards = () => {
        axios.get(API_URL + `/cards/${id}`).then((response) => {
            setCards(response.data);
        })
    }

    useEffect(() => {
        axios.get(API_URL + `/boards/${id}`).then((response) => {
            setBoardInfo(response.data);
        })
        getCards();
    }, [])

    return (
        <div className='app'>
            <header className='header-container'>
                <img src={'/kudoboard_logo.png'} className="kudoboard-logo" alt="Kudoboard logo" />
            </header>
            <main className='main-container'>
                <div className='board-title-container'>
                    Welcome to {boardInfo?.title}
                </div>
                <div className='filters-container'>
                    <button className='filter-button' onClick={openModal}>
                        Create Card
                    </button>
                </div>
                <div className='boards-container'>
                    {cards?.map((card) => {
                        return(
                            <Cards key={card.id} cardData={card} updateCards={() => getCards()}/>
                        )
                    })}
                </div>
            </main>
            <footer className='footer-container'>
                © 2024 Kudoboard
            </footer>
            {modalOpen && <CreateCardModal openModal={openModal} boardId={id} updateCards={() => getCards()}/>}
        </div>
    )
}

export default BoardPage;
