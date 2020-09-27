import axios from 'axios';

const baseUrl = `http://localhost:8765/api/`;

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

export const login = async (request) => {
    // console.log(request)

    try {
        const response = await axios.post(`${baseUrl}users/login`,
            request);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            return error.response.data;
        } else if (error.request) {
            return {
                "Network Error": "Check Internet Connection"
            }
        } else {
            console.log(error.message)
        }
    }

}

export const isLoggedIn = async (request) => {

    try {
        const response = await axios.get(`${baseUrl}user`,
            {
                headers: request
            });
        if (response.status === 200) {
            console.log("hahaha")
            // console.log(response.data)
            return response;
        }

    } catch (error) {
        console.log("haha")
        if (error.response.status === 401) {
            console.log(error.response)
            return error.response
        }
    }
}

// export {getArticles, getSingleArticle};