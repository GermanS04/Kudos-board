
import '../styles/Comments.css'
import { FaUser } from "react-icons/fa";

const Comments = ({commentData}) => {

    return (
        <div className='comment-main-container'>
            <div className='comment-user-container'>
                <div className='comment-user-icon-container'>
                    <FaUser />
                </div>
            </div>
            <div className='comment-text-container'>
                <p>{commentData.content}</p>
            </div>
        </div>
    )

}


export default Comments;
