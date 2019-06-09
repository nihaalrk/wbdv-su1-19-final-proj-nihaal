import React, { Component } from 'react';
import RedditService from '../services/RedditService'

export default class ThreadDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			thread: undefined
		}

		const pathname = window.location.pathname;
    const paths = pathname.split('/');
    const subreddit = paths[2];
    const id = paths[3];

    this.redditService = RedditService.getInstance();

    let currentComponent = this;
    this.redditService.findThread(subreddit, id).then(function(threads) {
    		if (threads[0]) {
    				currentComponent.setState({
		            thread: threads[0].data.children[0]
		        })
    		}
    });
	}

	render() {
      return (
          <div className="pt-3">
              <h4>{this.state.thread ? this.state.thread.data.title : ""}</h4>

              <div className={this.state.thread && this.state.thread.data.thumbnail_height ? "pb-2" : ""}>
              	{this.state.thread ? "Posted by " : ""} 
              	<a href={this.state.thread ? "https://www.reddit.com/u/" + this.state.thread.data.author : ""}>{this.state.thread ? this.state.thread.data.author : ""}</a>
              </div>

              {this.state.thread && this.state.thread.data.thumbnail_height ? <img alt="thumbnail" src={this.state.thread.data.thumbnail} />  : ""}
              
              <div className="pt-3">
		              <table className="table">
		                  <thead className="thead-light">
		                      <tr>
		                      <th>Date Posted</th>
		                      <th>Upvotes</th>
		                      <th>Comments</th>
		                      <th>Permalink</th>
		                      </tr>
		                  </thead>
		                  <tbody>
		                  		<tr>
				                      <td> {this.state.thread ? (new Date(this.state.thread.data.created_utc * 1000)).toLocaleDateString("en-US") : ""} </td>
				                      <td> {this.state.thread ? this.state.thread.data.ups : ""} </td>
				                      <td> {this.state.thread ? this.state.thread.data.num_comments : ""} </td>
				                      <td> {this.state.thread ? <a href={"https://www.reddit.com" + this.state.thread.data.permalink}> {this.state.thread.data.permalink} </a> 
				                      									 			: ""} </td>
		                      </tr>
		                  </tbody>
		              </table>
		              <div className={this.state.thread && this.state.thread.data.selftext ? "" : "d-none"}>
			              	<b className="pb-2"> Text </b>
			              	<p> {this.state.thread ? this.state.thread.data.selftext : ""} </p>
			            </div>
	            </div>
          </div>
      )
  }

}