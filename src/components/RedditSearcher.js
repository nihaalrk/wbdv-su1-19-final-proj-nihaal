import React from 'react'
import RedditSearch from "./RedditSearch";
import ThreadDetails from "./ThreadDetails"
import RedditUserDetails from "./RedditUserDetails"
import Register from "./Register"
import Profile from "./Profile"
import Login from "./Login"

import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

export default class RedditSearcher extends React.Component {

    render() {
        return (
            <div className="container">
                <h1>Reddit Searcher</h1>
                <Router>
                    <div>

                        <Link to="/">Home</Link> | <Link to="/search">Search</Link> | <Link to="/register">Register</Link> | <Link to="/profile">Profile</Link> | <Link to="/login">Login</Link>

                        <Route path="/search" exact
                               render={() => <RedditSearch/>}/>
                        <Route path="/register" exact
                               component={Register}/>
                        <Route path="/profile" exact
                               component={Profile}/>
                        <Route path="/profile/users/:id" exact
                               component={Profile}/>
                        <Route path="/profile/usersOnReddit/:id" exact
                               component={Profile}/>
                        <Route path="/login" exact
                               component={Login}/>
                        <Route path="/search/:subreddit/:keyword" exact
                               render={() => <RedditSearch/>}/>
                        <Route path="/details/t/:subreddit/:id"
                               render={() => <ThreadDetails/>}/>
                        <Route path="/details/u/:username"
                               render={() => <RedditUserDetails/>}/>
                    </div>
                </Router>
            </div>
        )
    }
}