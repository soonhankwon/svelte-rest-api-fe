import { writable, get } from "svelte/store";
import { getApi, putApi, delApi, postApi } from "../service/api.js";
import { router } from 'tinro'

function setCurrentArticlesPage(){}
function setArticles(){}
function setLoadingArticle(){}
function setArticleContent(){}
function setComments(){}
function setAuth(){}
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