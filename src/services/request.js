import axios from 'axios';

const baseUrl = `http://localhost:8765/api/`;
// https://conduit.productionready.io/api/articles?limit=10&offset=0

const get = async (url) => {

    try {
        const response = await axios(`${baseUrl}${url}`)

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        if (error.response) {
            // console.log('nono', error.response.data)
            return error.response.data;
        } else if (error.request) {
            return {
                "error": "Check Internet Connection"
            }
        } else {
            // console.log(error.message)
        }
    }
}

export const getArticles = async () => {
    // ?&limit=20
    const response = await get(`articles`)
    // console.log(response)
    if (response.hasOwnProperty('error'))
        return response;
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
                "Network Error": "Check Internet Connssection"
            }
        } else {
            console.log(error.message)
        }
    }

}

export const register = async (request) => {
    // console.log(request)

    try {
        const response = await axios.post(`${baseUrl}users`,
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
        console.log("haha", error.request)
        if (error.request) {
            return {error: "check you intuernet"}
        }
        if (error.response.status === 401) {
            console.log(error.response)
            return error.response
        }
    }
}

// export {getArticles, getSingleArticle};