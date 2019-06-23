import React from 'react'
import RedditSearch from "./RedditSearch";
import ThreadDetails from "./ThreadDetails"
import UserDetails from "./UserDetails"

import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

export default class RedditSearcher extends React.Component {
    render() {
        return (
            <div className="container">
                <h1>Reddit Searcher</h1>
                <Router>
                    <div>

                        <Link to="/">Home</Link> | <Link to="/search">Search</Link>

                        <Route path="/search" exact
                               render={() => <RedditSearch/>}/>
                        <Route path="/search/:subreddit/:keyword" exact
                               render={() => <RedditSearch/>}/>
                        <Route path="/details/t/:subreddit/:id"
                               render={() => <ThreadDetails/>}/>
                        <Route path="/details/u/:username"
                               render={() => <UserDetails/>}/>
                    </div>
                </Router>
            </div>
        )
    }
}