import profilePic from '../assets/me.jpg'
import styles from './Card.module.css'
function Card(){

    return (
        <div className={styles.card}>
            <img src={profilePic} alt="prfile pic" />
            <h2>Osama Alkhatib</h2>
            <p>He is just Here </p>
        </div>
    )
}

export default Card;