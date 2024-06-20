import React from 'react';
import { useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import CreateCardModal from '../components/CreateCardModal';
import '../styles/App.css'
import '../styles/BoardPage.css'

const BoardPage = () => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const {id} = useParams();

    const [boardInfo, setBoardInfo] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        if (modalOpen){
            setModalOpen(false);
        } else {
            setModalOpen(true);
        }
        }

    useEffect(() => {
        axios.get(API_URL + `/boards/${id}`).then((response) => {
            setBoardInfo(response.data)
        })
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
                <div>

                </div>
            </main>
            <footer className='footer-container'>
                © 2024 Kudoboard
            </footer>
            {modalOpen && <CreateCardModal openModal={openModal} />}
        </div>
    )
}

export default BoardPage;
