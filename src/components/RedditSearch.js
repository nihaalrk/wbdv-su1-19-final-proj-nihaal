import React, { Component } from 'react';
import RedditThreadService from '../services/RedditThreadService'
import ThreadRow from './ThreadRow'

import {Link} from 'react-router-dom'

export default class RedditSearch extends Component {

    constructor(props) {
        super(props);

        this.redditService = RedditThreadService.getInstance();
        this.state = {
            threads: [],
            subreddit: '',
            keyword: ''
        };
        this.subredditChanged = this.subredditChanged.bind(this);
        this.keywordChanged = this.keywordChanged.bind(this);
        this.executeSearch = this.executeSearch.bind(this);

        const pathname = window.location.pathname;
        const paths = pathname.split('/');
        if (paths[2] && paths[3]) {
            this.state = {
                threads: [],
                subreddit: paths[2],
                keyword: paths[3]
            };
            this.executeSearch();
        }
    }

    subredditChanged(event) {
        this.setState({
          subreddit: event.target.value
        })
    }

    keywordChanged(event) {
        this.setState({
          keyword: event.target.value
        })
    }

    executeSearch() {
        console.log("searching...");
        let currentComponent = this;
        this.redditService.findThreads(this.state.subreddit, this.state.keyword).then(function(threads) {
            if (threads.data && threads.data.children.length > 0) {
                currentComponent.setState({
                    threads: threads.data.children
                })
            } else {
                currentComponent.setState({
                    threads: []
                })
            }
        });
    }

    render() {
        return (
            <div className="pt-2">
                <h4>Search</h4>
                <form>
                    <div className="form-group row">
                        <div className="col-6">
                            <input type="text" className="form-control" id="input-subreddit" placeholder="Subreddit (e.g. news)" onChange={this.subredditChanged} value={this.state.subreddit}/>
                        </div>
                        <div className="col-5">
                            <input type="text"className="form-control" id="input-keyword" placeholder="Keyword (e.g. america)" onChange={this.keywordChanged} value={this.state.keyword}/>
                        </div>
                        <div className="col-1" onClick={() => this.executeSearch()}>
                            <Link to={this.state.subreddit && this.state.keyword ? "/search/"+this.state.subreddit+"/"+this.state.keyword : "/search"}>
                                <i id="search-icon" className="fa fa-search fa-2x"></i>
                            </Link>
                        </div>
                    </div>
                </form>
                <table className="table table-hover">
                    <thead className="thead-light">
                        <tr>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Upvotes</th>
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