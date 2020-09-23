import React, {useEffect, useState} from "react";
import {getArticles} from "../services/request";
import {NavLink} from "react-router-dom";

const ArticleList = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getArticles().then((data) => {
            setPosts(data);
        });
    }, [])

    return (
        <div className={'articlesContainer'}>
            {posts.map(post => (
                <NavLink to={`/${post.slug}`} key={`/${post.slug}`}>
                    <article className={'articleCard'}>
                        <div>
                            <h3>{post.title}</h3>
                            <p>{post.description}</p>
                        </div>
                        <div>
                            <small>Author: {post.author.username}</small>
                            <small>Published: {post.createdAt}</small>
                        </div>
                    </article>
                </NavLink>
            ))}
        </div>
    )
}

export default ArticleList;