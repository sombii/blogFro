import React, {useEffect, useState} from "react";
import {getArticles} from "../services/request";
import {NavLink} from "react-router-dom";
import styles from './Article.module.css'

const ArticleList = () => {

    const [posts, setPosts] = useState({"article": [], error: false});

    useEffect(() => {
        getArticles().then((data) => {
            console.log("myyyy", data)
            if (data.hasOwnProperty('error')) {
                setPosts({...posts, error: true})
            } else {
                setPosts({article: data, error: false});
            }
            // console.log(data)
        });
    }, [])

    return (
        <div className={styles.articlesContainer}>
            {posts.article.length === 0 && !posts.error
                ? (<div className={styles.loaderContainer}>
                    <div className="lds-dual-ring"> </div>
                </div>)
                : posts.error
                    ? <div>Something went wrong. Check Your internet connection.</div>
                    : posts.article.map(post => (
                        <NavLink className={styles.articleCardLink} to={`/${post.slug}`} key={`/${post.slug}`}>
                            <article className={styles.articleCard}>
                                <div>
                                    <h3>{post.title}</h3>
                                    <p>{`${post.description.slice(0, 100)}...`}</p>
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