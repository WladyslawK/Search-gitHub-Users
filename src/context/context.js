import { useState, useEffect, createContext } from 'react';
import {mockUser} from './mockData.js/mockUser';
import {mockRepos} from './mockData.js/mockRepos';
import {mockFollowers} from './mockData.js/mockFollowers';
import axios from 'axios';

const rootUrl = 'https://api.github.com';

// context
const GithubContext = createContext({});

// Provider, Consumer - GithubContext.Provider

const GithubProvider = ({children}) => {

    const [githubUser, setGithubUser] = useState(mockUser)
    const [repos, setRepos] = useState(mockRepos)
    const [followers, setFollowers] = useState(mockFollowers)

    // request loading

    const [requests, setRequests] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    //error

    const [error, setError] = useState({show: false, msg: ''})


    const searchGitHubUser = async (user) => {
        console.log(user)

        setIsLoading(true)
        const response = await axios.get(`${rootUrl}/users/${user}`).catch(err => console.log(err))

        if(response){
            setGithubUser(response.data)
            const {login, followers_url} = response.data

            await Promise.allSettled([axios.get(`${followers_url}?per_page=100`), axios.get(`${rootUrl}/users/${login}/repos?per_page=100`)])
                .then(result => {
                    console.log('Result', result)
                    const [followers, repos] = result

                    if(repos.status === 'fulfilled'){
                        setRepos(repos.value.data)
                    }

                    if(followers.status === 'fulfilled'){
                        setFollowers(followers.value.data)
                    }
                })
            //repos
            //'https://api.github.com/users/john-smilga/repos?&per_page=100'
            //followers
            //'https://api.github.com/users/john-smilga/followers'
        }else{
            toggleError(true, 'there is no user with that user name')
        }
        checkRequests()
        setIsLoading(false)





        //toggleError()
    }

    // check rate
    const checkRequests = () => {
        axios.get(`${rootUrl}/rate_limit`)
            .then(({data}) => {
                console.log(data)

                let {rate: {remaining}} = data

                setRequests(remaining)

                if(remaining === 0){
                    toggleError(true, 'you have exceeded your hourly rate limit!')
                }

            })
            .catch((err) => console.log(err))
    }

    const toggleError = (show = false, msg = '') => {
        setError({show, msg})
    }

    useEffect(() => {
        console.log('hey app loaded')
        checkRequests()
    }, [])


    return <GithubContext.Provider value={{githubUser, repos, followers, requests, error, searchGitHubUser, isLoading, setIsLoading}}>{children}</GithubContext.Provider>
}

export {GithubProvider, GithubContext}