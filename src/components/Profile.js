import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import styles from './Profile.module.css'
import {getProfile} from "../services/request";
import {Link} from "react-router-dom";
import ArticleList from "./ArticleList";

export const Profile = () => {

    let {username} = useParams();

    const [profile, setProfile] = useState({});

    useEffect(() => {
        getProfile(username).then(data => {
            setProfile(data)
        })
    },[]);

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCardContainer}>
                <div className={styles.profileCardTop}> </div>
                <div className={styles.profileCardBottom}>
                    <div className={styles.profileImageContainer}>
                        <img src="https://www.nextnepal.com/assets/front/img/members/1599545972.jpg" alt=""/>
                    </div>
                    <p>
                        <span><Link to={`/profile/${username}`}>@{username}</Link></span><br/>
                        <span>{profile.bio ? profile.bio : "lonely me"}</span>
                    </p>
                    <button className={'accent-button'}>{profile.following ? 'unfollow' : 'follow'}</button>
                </div>
            </div>

            <div className={styles.profileArticles}>
                <ArticleList/>
            </div>
        </div>
    )
}