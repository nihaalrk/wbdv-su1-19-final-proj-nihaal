import React from 'react'
import RedditService from '../services/RedditService'

export default class RedditSearch extends React.Component {

    constructor(props) {
        super(props);

        this.redditService = RedditService.getInstance();

        this.redditService.findThreads().then(function(threads) {
            console.log(threads);
        })

    }

    render() {
        return (
            <div>
                <h4>Search</h4>
            </div>
        )
    }
}