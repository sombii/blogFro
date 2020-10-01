import React, {useContext, useState} from "react";
import styles from "./Dashboard.module.css";
import {createArticle} from "../../services/request";
import {UserContext} from "../../context/UserContext";
import {useHistory} from "react-router";

export const CreateArticle = () => {

    const {loggedIn} = useContext(UserContext);

    const [article, setArticle] = useState({article: {title: '', description: '', body: '', tagList: []}});

    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        let token = loggedIn.user.token;

        createArticle(token, article).then(data => {
            // console.log(data.data)
            if (data.status === 200) history.push(`/${data.data.article.slug}`)
        })
    }

    const inputHandler = (e) => {
        const {name, value} = e.target;
        setArticle({article: {...article.article, [name]: value}})

    }

    const tagHandler = (e) => {
        console.log([e.target.value])
    }

    return (
        <div className={styles.dashMain}>
            <form onSubmit={submitHandler}>
                <div className={styles.formHeadingDiv}>
                    <h2>Create a new article</h2>
                    <button type='submit'>Publish</button>
                </div>
                <label htmlFor="title">
                    Title
                    <input onChange={inputHandler} type="text" name='title' required/>
                </label>
                <label htmlFor="description">
                    Summary
                    <input onChange={inputHandler} type="text" name='description' required/>
                </label>
                <label htmlFor="body">
                    Body
                    <textarea onChange={inputHandler} rows={8} name='body' required/>
                </label>
                <label htmlFor="tagList">
                    Tags (separated by comma)
                    <input onChange={tagHandler} type="text" name='tagList'/>
                </label>
            </form>
        </div>
    )
}