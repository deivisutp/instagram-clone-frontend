import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import Route from './Route';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Main from '../pages/Main';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Post from '../pages/Post';

const Routes = () => {
    return (
        <BrowserRouter>
            <ToastContainer
                position="top-center"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnHover
                draggable
            />

            <Switch>
                <Route exact path="/" component={Main} isPrivate />
                <Route exact path="/photo/:photo_id" component={Post} isPrivate />
                <Route exact path="/signin" component={SignIn} />
                <Route exact path="/signup" component={SignUp} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;