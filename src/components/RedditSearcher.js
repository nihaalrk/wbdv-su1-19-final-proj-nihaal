import React from 'react'
import RedditSearch from "./RedditSearch";
import ThreadDetails from "./ThreadDetails"
import RedditUserDetails from "./RedditUserDetails"
import Register from "./Register"
import Profile from "./Profile"
import Login from "./Login"
import RedditThreadService from "../services/RedditThreadService";
import UserService from "../services/UserService";

import {BrowserRouter as Router, Link, Route} from 'react-router-dom'

export default class RedditSearcher extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hideInfo: false,
            currentUser: undefined,
            users: [],
            usersOnReddit: [],
            threads: []
        }

        this.userService = UserService.getInstance();
        this.redditThreadService = RedditThreadService.getInstance();
        this.hideInfo = this.hideInfo.bind(this);

        let thisComponent = this;
        this.userService.profile().then(function(currentUser){
          if (currentUser.username) {
            thisComponent.setState({
              currentUser: currentUser
            });
          }
        })

        this.redditThreadService.getThreads().then(function(threads){
            thisComponent.setState({
              threads: threads.slice(0,5)
            });
        })

        this.userService.findUsers().then(function(users){
            thisComponent.setState({
              users: users
            });
        })

        this.userService.findUsersOnReddit().then(function(users){
            thisComponent.setState({
              usersOnReddit: users
            });
        })

    }

    hideInfo() {
        this.setState({
            hideInfo: true
        })
    }

    unHideInfo() {
        this.setState({
            hideInfo: false
        })
        let thisComponent = this;
        this.userService.profile().then(function(currentUser){
          if (currentUser.username) {
            thisComponent.setState({
              currentUser: currentUser
            });
          }
        })
    }

    render() {
        return (
            <div className="container">
                <h1>Reddit Searcher</h1>
                <Router>
                    <div>

                        <Link to="/" onClick={()=>this.unHideInfo()}>Home</Link> | <Link to="/search" onClick={()=>this.hideInfo()}>Search</Link> | <Link to="/register" onClick={()=>this.hideInfo()}>Register</Link> | <Link to="/profile" onClick={()=>this.hideInfo()}>Profile</Link> | <Link to="/login" onClick={()=>this.hideInfo()}>Login</Link>

                        <Route path="/search" exact
                               render={() => <RedditSearch hideInfo={this.hideInfo}/>}/>
                        <Route path="/register" exact
                               component={(props) => <Register {...props} hideInfo={this.hideInfo}/>}/>
                        <Route path="/profile" exact
                               component={(props) => <Profile {...props} hideInfo={this.hideInfo}/>}/>
                        <Route path="/profile/users/:id" exact
                               component={(props) => <Profile {...props} hideInfo={this.hideInfo}/>}/>
                        <Route path="/profile/usersOnReddit/:id" exact
                               component={(props) => <Profile {...props} hideInfo={this.hideInfo}/>}/>
                        <Route path="/login" exact
                               component={(props) => <Login {...props} hideInfo={this.hideInfo}/>}/>
                        <Route path="/search/:subreddit/:keyword" exact
                               render={() => <RedditSearch hideInfo={this.hideInfo}/>}/>
                        <Route path="/details/t/:subreddit/:id"
                               render={() => <ThreadDetails hideInfo={this.hideInfo}/>}/>
                        <Route path="/details/u/:username"
                               render={() => <RedditUserDetails hideInfo={this.hideInfo}/>}/>
                    </div>
                    <div className={this.state.hideInfo ? "d-none" : ""}> 
                        <div className = "row pt-3">
                            <div className={this.state.threads && this.state.threads.length > 0 ? "col-6" : "d-none"}>
                                <b className="pb-2"> Recent Threads </b>
                                {this.state.threads ? this.state.threads.map(thread => <div><Link to={"/details/t/" + thread.subreddit + "/" + thread.id} onClick={()=>this.hideInfo()}>{thread.title}</Link></div>) : ""}
                            </div>
                        </div>
                        <div className ={this.state.currentUser ? "row pt-3" : "d-none"}>
                            <div className={this.state.users && this.state.users.length > 0 ? "col-6" : "d-none"}>
                                <b className="pb-2"> Users </b>
                                {this.state.users ? this.state.users.map(user => <div><Link to={"/profile/users/" + user.id} onClick={()=>this.hideInfo()}>{user.username}</Link></div>) : ""}
                            </div>
                            <div className={this.state.usersOnReddit && this.state.usersOnReddit.length > 0 ? "col-6" : "d-none"}>
                                <b className="pb-2"> Users On Reddit </b>
                                {this.state.usersOnReddit ? this.state.usersOnReddit.map(user => <div><Link to={"/profile/usersOnReddit/" + user.id} onClick={()=>this.hideInfo()}>{user.username}</Link></div>) : ""}
                            </div>
                        </div>
                    </div>
                </Router>
            </div>
        )
    }
}