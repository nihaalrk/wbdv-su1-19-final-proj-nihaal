import React from 'react'
import RedditSearch from "./RedditSearch";

import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

export default class RedditSearcher extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <h1>Reddit Searcher</h1>
                <Router>
                    <div>
                        <Link to="/search">Search</Link>

                        <Route path="/search" exact
                               render={() => <RedditSearch/>}/>
                    </div>
                </Router>
            </div>
        )
    }
}