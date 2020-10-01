import React, {useEffect, useState} from "react";
import {getArticles} from "../services/request";
import {NavLink, useHistory, useParams} from "react-router-dom";
import styles from './Article.module.css'

const ArticleList = () => {

    const [posts, setPosts] = useState({"article": [], error: false});
    let {tag, username} = useParams();

    useEffect(() => {
        let urlSuffix = tag ? `articles?tag=${tag}&limit=20&offset=0` : username ? `articles?author=${username}&limit=20&offset=0` :'articles?limit=20&offset=0'


        getArticles(urlSuffix).then((data) => {
            // console.log("myyyy", data)
            if (data.hasOwnProperty('error')) {
                setPosts({...posts, error: true})
            } else {
                setPosts({article: data, error: false});
            }
            // console.log(data)
        });
    }, [])


    return (
        <>
            <h4>Showing post for: {tag ? tag : username ? username : 'All'}</h4>
            <div className={styles.articlesContainer}>
                {posts.article.length === 0 && !posts.error
                    ? (<div className={styles.loaderContainer}>
                        <div className="lds-dual-ring"></div>
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
        </>
    )
}

export default ArticleList;