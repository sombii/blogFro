import React, {useContext, useEffect, useState} from "react";
import {UserContext} from "../context/UserContext";
import styles from './Home.module.css'
import {getTags} from "../services/request";
import {Link} from "react-router-dom";

const Home = () => {

    const {loggedIn} = useContext(UserContext)
    const [tags, setTags] = useState([]);


    useEffect(() => {
        getTags().then(data => {
            setTags([...data.tags])
        })
            // console.log(tags)
    }, [])

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.contentSection}>
                    content section
                </div>
                <div className={styles.sidebarSection}>
                    <ul className={styles.tagsBar}>
                        <h4>Tags</h4>
                        {tags.map(tag => (
                            <li className={styles.tag} key={tag}>
                                <Link to={`/articles/${tag}`} tag={tag}>{tag}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Home;