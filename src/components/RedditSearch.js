import React, { Component } from 'react';
import RedditService from '../services/RedditService'
import ThreadRow from './ThreadRow'

export default class RedditSearch extends Component {

    constructor(props) {
        super(props);

        this.redditService = RedditService.getInstance();
        this.state = {
            threads: []
        };

    }

    componentDidMount() {
        let currentComponent = this;
        this.redditService.findThreads().then(function(threads) {
            console.log(threads.data.children);
            currentComponent.setState({
                threads: threads.data.children
            })
        });
    }

    render() {
        return (
            <div>
                <h4>Search</h4>
                <table className="table table-hover">
                    <thead className="thead-light">
                        <tr>
                        <th>Title</th>
                        <th>Upvotes</th>
                        <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.threads.map((thread, key) =>
                          <ThreadRow thread={thread} key={key}/>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}