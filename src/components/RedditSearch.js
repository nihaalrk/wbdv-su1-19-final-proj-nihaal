import React, { Component } from 'react';
import RedditService from '../services/RedditService'
import ThreadRow from './ThreadRow'

export default class RedditSearch extends Component {

    constructor(props) {
        super(props);

        this.redditService = RedditService.getInstance();
        this.state = {
            threads: [],
            subreddit: '',
            keyword: ''
        };

        this.subredditChanged = this.subredditChanged.bind(this);
        this.keywordChanged = this.keywordChanged.bind(this);
        this.executeSearch = this.executeSearch.bind(this);
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
        let currentComponent = this;
        this.redditService.findThreads(this.state.subreddit, this.state.keyword).then(function(threads) {
            currentComponent.setState({
                threads: threads.data.children
            })
        });
    }


    componentDidMount() {
        let currentComponent = this;
        this.redditService.findThreads("leagueoflegends", "Qiyana").then(function(threads) {
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
                <form>
                    <div className="form-group row">
                        <div className="col-6">
                            <input type="text" className="form-control" id="input-subreddit" placeholder="Subreddit" onChange={this.subredditChanged} value={this.state.subreddit}/>
                        </div>
                        <div className="col-5">
                            <input type="text"className="form-control" id="input-keyword" placeholder="Keyword" onChange={this.keywordChanged} value={this.state.keyword}/>
                        </div>
                        <div className="col-1" onClick={() => this.executeSearch()}>
                            <i id="search-icon" className="fa fa-search fa-2x"></i>
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