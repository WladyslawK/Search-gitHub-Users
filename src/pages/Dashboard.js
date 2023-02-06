import React from 'react';
import {Info, Repos, User, SearchUser, Navbar} from '../components';
import loadingImage from '../images/preloader.gif';
import {GithubContext} from '../context/context';

const Dashboard = () => {

    const {isLoading} = React.useContext(GithubContext)

    return (
        <main>
            <Navbar></Navbar>
            <SearchUser/>
            {
                isLoading ? <img src={loadingImage} alt="loading" className='loading-img'/> :
                    <>
                        <Info/>
                        <User/>
                        <Repos/>
                    </>
            }
        </main>
    );
};

export default Dashboard;
