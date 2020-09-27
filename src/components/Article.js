import React, {useEffect, useState} from "react";
import styles from './Article.module.css'
import {getSingleArticle} from "../services/request";
import {useHistory, useParams} from "react-router";


const Article = () => {

    const {slug} = useParams();

    const history = useHistory();

    const [post, setPost] = useState({});

    useEffect(() => {
        getSingleArticle(slug)
            .then(data => {
                setPost(data);
            });
    }, [slug]);

    const backHandler = () => {
        history.goBack();
    }

    return (
        <div className={`container ${styles.articleContainer}`}>
            <button onClick={backHandler}>Go back</button>
            {post.hasOwnProperty("author")
                ? (<article>
                    <h1>{post.title}</h1>
                    <small>Author: {post.author.username}</small>
                    <small>Published: {post.createdAt.slice(0, 10)}</small>
                    <p>{post.body}</p>
                </article>)
                : (<div className={styles.loaderContainer}><div className="lds-dual-ring"></div></div>)
            }
        </div>
    )
}

export default Article;