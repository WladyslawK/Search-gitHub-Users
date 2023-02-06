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
    const [loading, setLoading] = useState(false)
    //error

    // check rate
    const checkRequests = () => {
        axios.get(`${rootUrl}/rate_limit`)
            .then(({data}) => {
                console.log(data)

                let {rate: {remaining}} = data

                setRequests(remaining)

                if(remaining === 0){
                    //throw an error
                }

            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        console.log('hey app loaded')
        checkRequests()
    }, [])


    return <GithubContext.Provider value={{githubUser, repos, followers, requests}}>{children}</GithubContext.Provider>
}

export {GithubProvider, GithubContext}