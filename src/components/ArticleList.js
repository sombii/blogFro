import React, {useEffect, useState} from "react";
import {getArticles} from "../services/request";
import {NavLink} from "react-router-dom";
import styles from './Article.module.css'

const ArticleList = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getArticles().then((data) => {
            setPosts(data);
        });
    }, [])

    return (
        <div className={styles.articlesContainer}>
            {posts.length === 0
                ? (<div className={styles.loaderContainer}><div className="lds-dual-ring"></div></div>)
                : posts.map(post => (
                    <NavLink className={styles.articleCardLink} to={`/${post.slug}`} key={`/${post.slug}`}>
                        <article className={styles.articleCard}>
                            <div>
                                <h3>{post.title}</h3>
                                <p>{`${post.description.slice(0,100)}...`}</p>
                            </div>
                            <div>
                                <small>Author: {post.author.username}</small>
                                <small>Published: {post.createdAt.slice(0, 10)}</small>
                                {/*{console.log(post.createdAt)}*/}
                            </div>
                        </article>
                    </NavLink>
                ))}
        </div>
    )
}

export default ArticleList;