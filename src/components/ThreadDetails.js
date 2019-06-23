import React, { Component } from 'react';
import RedditThreadService from '../services/RedditThreadService'
import RedditUserService from '../services/RedditUserService'

import {Link} from 'react-router-dom'

export default class ThreadDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			thread: undefined,
			author: undefined,
			commenters: undefined
		}

		const pathname = window.location.pathname;
    const paths = pathname.split('/');
    const subreddit = paths[3];
    const id = paths[4];

    this.redditThreadService = RedditThreadService.getInstance();
    this.redditUserService = RedditUserService.getInstance();
    this.createThread = this.createThread.bind(this);
    this.addCommenters = this.addCommenters.bind(this);
    this.addCommenter = this.addCommenter.bind(this);

    let currentComponent = this;
    this.redditThreadService.findThread(id).then(function(thread) {
    		if (thread.id) {
    				var author = thread.author;
    				delete thread.author;
    				var commenters = thread.commenters;
    				delete thread.commenters;
    				currentComponent.setState({
		            thread: thread,
		            author: author,
		            commenters: commenters
		        })
    		} else {
    			currentComponent.createThread(subreddit, id);
    		}
    });
	}

	createThread(subreddit, id) {
		let currentComponent = this;
		currentComponent.redditThreadService.fetchThread(subreddit, id).then(function(response) {
			if (response[0] && response[0].data.children[0]) {
				var thread = response[0].data.children[0];
				currentComponent.redditUserService.fetchUser(thread.data.author).then(function(user){
					var author = {
						username: user.data.name,
						linkKarma: user.data.link_karma,
						commentKarma: user.data.comment_karma
					};
					currentComponent.redditUserService.createUser(author).then(function(resp){
						var newThread = {
  						id: thread.data.id,
  						subreddit: thread.data.subreddit,
  						title: thread.data.title.substring(0,250), 
  						date: (new Date(thread.data.created_utc * 1000)).toLocaleDateString("en-US"),
  						upvotes: thread.data.ups,
  						comments: thread.data.num_comments,
  						permalink: thread.data.permalink,
  						thumbnail: thread.data.thumbnail,
  						text: thread.data.selftext.substring(0,250),
  						author: author
  					}
  					currentComponent.redditThreadService.createThread(newThread).then(function(thread) {
  						var author = thread.author;
  						delete thread.author;
  						currentComponent.setState({
		            thread: thread,
		            author: author
		        	});
		        	if (response[1] && response[1].data.children) {
								currentComponent.addCommenters(response[1].data.children);
							}
						});
					})
				})
			}
		});
	}

	addCommenters(commenters) {
		for (var i = 0; i < Math.min(5, commenters.length); i = i + 1) {
			var username = commenters[i].data.author;
			this.addCommenter(username);
		}
	}

	addCommenter(username) {
		let component = this;
		this.redditUserService.findUser(username).then(function(user){
			console.log(username);
			if (user.username) {
				component.redditThreadService.addCommenter(component.state.thread.id, user.username).then(function(returnThread){
					var author = returnThread.author;
  				delete returnThread.author;
  				var commenters = returnThread.commenters;
  				delete returnThread.commenters;
  				component.setState({
	            thread: returnThread,
	            author: author,
	            commenters: commenters
	        })
				})
			} else {
				component.redditUserService.fetchUser(username).then(function(user){
					var author = {
						username: user.data.name,
						linkKarma: user.data.link_karma,
						commentKarma: user.data.comment_karma
					};
					component.redditUserService.createUser(author).then(function(returnUser){
						component.redditThreadService.addCommenter(component.state.thread.id, returnUser.username).then(function(returnThread){
							var author = returnThread.author;
	    				delete returnThread.author;
	    				var commenters = returnThread.commenters;
	    				delete returnThread.commenters;
	    				component.setState({
			            thread: returnThread,
			            author: author,
			            commenters: commenters
			        })
						})
					})
				})
			}
		})
	}

	render() {
      return (
          <div className="pt-3">
              <h4>{this.state.thread ? this.state.thread.title : ""}</h4>

              <div className={this.state.thread && this.state.thread.thumbnail ? "pb-2" : ""}>
              	{this.state.thread ? "Posted by " : ""}
              	<Link to={this.state.author ? "/details/u/" + this.state.author.username : "/"}>{this.state.author ? this.state.author.username : ""}</Link> 
              </div>

              {this.state.thread && this.state.thread.thumbnail_height ? <img alt="thumbnail" src={this.state.thread.thumbnail} />  : ""}
              
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
				                      <td> {this.state.thread ? this.state.thread.date : ""} </td>
				                      <td> {this.state.thread ? this.state.thread.upvotes : ""} </td>
				                      <td> {this.state.thread ? this.state.thread.comments : ""} </td>
				                      <td> {this.state.thread ? <a href={"https://www.reddit.com" + this.state.thread.permalink}> {this.state.thread.permalink} </a> 
				                      									 			: ""} </td>
		                      </tr>
		                  </tbody>
		              </table>
		              <div className={this.state.thread && this.state.thread.text ? "" : "d-none"}>
			              	<b className="pb-2"> Text </b>
			              	<p> {this.state.thread ? this.state.thread.text : ""} </p>
			            </div>
			            <div className={this.state.commenters && this.state.commenters.length > 0 ? "" : "d-none"}>
			            		<b className="pb-2"> Commenters </b>
			              	{this.state.commenters ? this.state.commenters.map(commenter => <div><Link to={"/details/u/" + commenter.username}>{commenter.username}</Link></div>) : ""}
			            </div>
	            </div>
          </div>
      )
  }

}