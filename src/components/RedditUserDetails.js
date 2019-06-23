import React, { Component } from 'react';
import RedditThreadService from '../services/RedditThreadService'
import RedditUserService from '../services/RedditUserService'

import {Link} from 'react-router-dom'

export default class UserDetails extends Component {

	constructor(props) {
		super(props);

		this.state = {
			user: undefined,
			threads: undefined
		}

		const pathname = window.location.pathname;
    const paths = pathname.split('/');
    const username = paths[3];

    this.redditThreadService = RedditThreadService.getInstance();
    this.redditUserService = RedditUserService.getInstance();

    let currentComponent = this;
    this.redditUserService.findUser(username).then(function(user) {
    		if (user.username) {
    				currentComponent.setState({
		            user: user,
		            threads: []
		        })
		        currentComponent.redditUserService.threadsCommentedOn(user.username).then(function(threads){
		        	currentComponent.setState({
		        		threads: threads
		        	});
		        })
    		}
    });
	}

	render() {
      return (
          <div className="pt-3">
              <h4>{this.state.user ? this.state.user.username : ""}</h4>
              
              <div className="pt-3">
		              <table className="table">
		                  <thead className="thead-light">
		                      <tr>
		                      <th>Link Karma</th>
		                      <th>Comment Karma</th>
		                      </tr>
		                  </thead>
		                  <tbody>
		                  		<tr>
				                      <td> {this.state.user ? this.state.user.linkKarma : ""} </td>
				                      <td> {this.state.user ? this.state.user.commentKarma : ""} </td>
		                      </tr>
		                  </tbody>
		              </table>
	            </div>

	            <div className={this.state.threads && this.state.threads.length > 0 ? "" : "d-none"}>
	            		<b className="pb-2"> Threads Commented On </b>
	              	{this.state.threads ? this.state.threads.map(thread => <div><Link to={"/details/t/" + thread.subreddit + "/" + thread.id}>{thread.title}</Link></div>) : ""}
	            </div>

          </div>
      )
  }

}