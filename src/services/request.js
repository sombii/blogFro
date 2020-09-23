import axios from 'axios';

const baseUrl = `http://localhost:8000/api/`;

const get = async (url) => {

    const response = await axios(`${baseUrl}${url}`)

    if (response.status === 200)
        // console.log(response.data.articles)
        return response.data;
}

export const getArticles = async () => {
    const response = await get(`articles?&limit=20`)
    return response.articles;
}

export const getSingleArticle = async (slug) => {
    const response = await get(`articles/${slug}`)
    return response.article;
}


// export {getArticles, getSingleArticle};