import React from 'react';
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import CreateCardModal from '../components/CreateCardModal';
import Cards from '../components/Cards';
import '../styles/App.css'
import '../styles/BoardPage.css'
import CommentsModal from '../components/CommentsModal';
import { IoIosArrowBack } from "react-icons/io";


const BoardPage = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams();

    const [boardInfo, setBoardInfo] = useState(null);
    const [cards, setCards] = useState(null);
    const [modalOpenCreateCard, setModalOpenCreateCard] = useState(false);
    const [modalOpenCommentsCard, setModalOpenCommentsCard] = useState(false);
    const [modalCard, setModalCard] = useState(null);

    const openModalCreateCard = () => {
        if (modalOpenCreateCard){
            setModalOpenCreateCard(false);
        } else {
            setModalOpenCreateCard(true);
        }
    }

    const openModalCommentsCard = () => {
        if(modalOpenCommentsCard){
            setModalOpenCommentsCard(false);
        } else {
            setModalOpenCommentsCard(true);
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
            <Link className='back-icon-container' to={'/'}>
                <IoIosArrowBack className='back-icon' />
            </Link>
            <header className='header-container'>
                <img src={'/kudoboard_logo.png'} className="kudoboard-logo" alt="Kudoboard logo" />
            </header>
            <main className='main-container'>
                <div className='board-title-container'>
                    Welcome to {boardInfo?.title}
                </div>
                <div className='filters-container'>
                    <button className='filter-button' onClick={openModalCreateCard}>
                        Create Card
                    </button>
                </div>
                <div className='boards-container'>
                    {cards?.map((card) => {
                        return(
                            <Cards key={card.id} cardData={card} updateCards={() => getCards()} openModal={openModalCommentsCard} modalCard={(card) => setModalCard(card)}/>
                        )
                    })}
                </div>
            </main>
            <footer className='footer-container'>
                <p>
                    © 2024 Kudoboard
                </p>
            </footer>
            {modalOpenCreateCard && <CreateCardModal openModal={openModalCreateCard} boardId={id} updateCards={() => getCards()}/>}
            {modalOpenCommentsCard && <CommentsModal openModal={openModalCommentsCard} card={modalCard}/>}
        </div>
    )
}

export default BoardPage;
