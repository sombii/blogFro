import React, {useEffect, useState} from "react";
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
        <div className={'container articleContainer'}>
            <button onClick={backHandler}>Go back</button>
            {post.hasOwnProperty("author") &&
            <article>
                <h1>{post.title}</h1>
                <small>Author: {post.author.username}</small>
                <small>Published: {post.createdAt}</small>
                <p>{post.body}</p>
            </article>
            }
        </div>
    )
}

export default Article;