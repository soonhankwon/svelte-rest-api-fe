import { writable, get } from "svelte/store";
import { getApi, putApi, delApi, postApi } from "../service/api.js";
import { router } from 'tinro'

function setCurrentArticlesPage(){}
function setArticles(){}
function setLoadingArticle(){}
function setArticleContent(){}
function setComments(){}
function setAuth(){
    let initValues = {
        id: '',
        emai: '',
        Authorization: "",
    }

    const { subscribe, set, update } = writable({...initValues})

    const refresh = async () => {
        try {
            const authenticationUser = await postApi({path: '/auth/refresh'})
            set(authenticationUser)
            isRefresh.set(true)
        }
        catch(err) {
            auth.resetUserInfo()
            isRefresh.set(false)
        }
    }
    
    const resetUserInfo = () => {
        set({...initValues})
    }

    const login = async (email, password) => {
        try {
            const options = {
                path: '/auth/login',
                data: {
                    email: email,
                    password: password
                }
            }

            const result = await postApi(options)
            set(result)
            isRefresh.set(true)
            router.goto('/articles');
        }
        catch(error) {
            alert('오류가 발생했습니다. 로인을 다시 시도해 주세요.');
        }
    }

    const logout = async () => {
        try {
            const options = {
                path: 'auth/logout',
            }

            await delApi(options);
            set({...initValues})
            isRefresh.set(false)
            router.goto('/')
        }
        catch(error) {
            alert('오류가 발생했습니다. 다시 시도해 주세요.')
        }
    }

    const register = async () => {
        try {
            const options = {
                path: '/auth/register',
                data: {
                    email: email,
                    password: password
                }
            }
            await postApi(options);
            alert('가입이 완료되었습니다.');
            router.goto('/login');
        } catch(error) {
            alert('오류가 발생했습니다. 다시 시도해 주세요.')
        }
    }

    return {
        subscribe,
        refresh,
        login,
        logout,
        resetUserInfo,
        register
    }
}

function setArticlesMode(){}
function setIsLogin(){}

export const currentArticlesPage = setCurrentArticlesPage()
export const articles = setArticles()
export const loadingArticle = setLoadingArticle()
export const articleContent = setArticleContent()
export const comments = setComments()
export const auth = setAuth()
export const articlesMode = setArticlesMode()
export const isLogin = setIsLogin()
export const isRefresh = writable(false)