import axios from 'axios'
import '../styles/CreateBoardModal.css';

const CreateBoardModal = ({openModal, updateBoards}) => {
    const API_URL = import.meta.env.VITE_API_BASE_URL;
    const postBoardURL = `${API_URL}/boards`

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        const category = e.target.elements.category.value;
        const author = e.target.elements.author.value;
        let image = e.target.elements.image.value;

        if(!image || image.trim().length === 0){
            image = `https://picsum.photos/200/300?random=${Math.random()}`;
        }

        axios.post(postBoardURL, {
            title: name,
            category: category,
            author: author,
            imageURL: image
        }).then((response) => {updateBoards()})
        .catch((error) => {console.log(error)})

        openModal();
    }

    return (
        <div className='modal-container'>
            <div className="modal-overlay" onClick={openModal}>
            </div>
            <div className='modal-content'>
                <div className='modal-close-button-container'>
                    <button className='modal-close-button' onClick={openModal}>X</button>
                </div>
                <div>
                    <h2 className='title-modal'>Create a New Board</h2>
                </div>
                <div>
                    <form className='modal-form' onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor='name'> Board Name: </label><br />
                            <input required type="text" id='name' placeholder='Board Name' className='modal-input-option'></input><br />
                        </div>

                        <div>
                            <label htmlFor='category'> Category: </label><br />
                            <select defaultValue='' required id='category' className='modal-select-option'>
                                <option value='' disabled>Select a Category</option>
                                <option value='Celebration'>Celebration</option>
                                <option value='Thank you'>Thank you</option>
                                <option value='Inspiration'>Inspiration</option>
                            </select><br />
                        </div>

                        <div>
                            <label htmlFor='author'> Author: (Optional) </label><br />
                            <input type="text" id='author' placeholder='Author Name' className='modal-input-option'></input><br />
                        </div>

                        <div>
                            <label htmlFor='image'> Image Address: (Optional) </label><br />
                            <input type="text" id='image' placeholder='Image URL' className='modal-input-option'></input><br />
                        </div>

                        <button className='modal-create-button' type='submit' >
                            Create Board
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateBoardModal;
