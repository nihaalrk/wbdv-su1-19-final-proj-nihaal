import React, { Component } from 'react';
import UserService from "../services/UserService";

import {Link} from 'react-router-dom'

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      redditUsername: '',
      state: '',
      self: false
    };

    const pathname = window.location.pathname;
    const paths = pathname.split('/');
    const type = paths[2];
    const userId = paths[3];

    this.userService = UserService.getInstance();
    let thisComponent = this;

    if (type && userId) {
      if (type === "users") {
        this.userService.findUser(userId).then(function(user){
          thisComponent.setState({
            user: user,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password,
            state: user.state,
            self: false
          });
        })
      } else {
        this.userService.findUserOnReddit(userId).then(function(user){
          thisComponent.setState({
            user: user,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
            password: user.password,
            redditUsername: user.redditUsername,
            state: user.state,
            self: false
          });
        })
      }
    } else {
      this.userService.profile().then(function(currentUser){
        if (currentUser.username) {
          thisComponent.setState({
            user: currentUser,
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            username: currentUser.username,
            password: currentUser.password,
            redditUsername: currentUser.redditUsername,
            state: currentUser.state,
            self: true
          });
        }
      })
    }

    
    this.onChange = this.onChange.bind(this);
    this.logout = this.logout.bind(this);
  }

  onChange(field, event) {
    this.setState({
      error: false,
      [field]: event.target.value
    })
  }

  logout() {
    if (!this.state.self) {
      return;
    }
    this.userService.logout();
    this.props.history.push({pathname: '/', state: "logout"});
  }

  save() {
    if (!this.state.self) {
      return;
    }
    if (!this.state.redditUsername || this.state.redditUsername === '') {
      var user = {
        id: this.state.user.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        state: this.state.state
      };
      this.userService.updateUser(user);
    } else {
      var user = {
        id: this.state.user.id,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        redditUsername: this.state.redditUsername,
        state: this.state.state
      };
      this.userService.updateUserOnReddit(user);
    }
  }

  render() {
    return (
      <div>
        <h1 className="pb-3" >Profile</h1>
        <div>
            <div className="row pb-2">
                <div className="col-6">
                    <label htmlFor="first-name">First name</label>
                    {this.state.self ? <input 
                        id="first-name" 
                        className="form-control"
                        value={this.state.firstName}
                        onChange={(event) => this.onChange("firstName", event)}/>
                        :
                      <input 
                        id="first-name" 
                        className="form-control"
                        value={this.state.firstName}
                        disabled/>}
                    
                </div>
                <div className="col-6">
                    <label htmlFor="last-name">Last name</label>
                    {this.state.self ? <input 
                        id="last-name" 
                        className="form-control"
                        value={this.state.lastName}
                        onChange={(event) => this.onChange("lastName", event)}/>
                        :
                      <input 
                        id="last-name" 
                        className="form-control"
                        value={this.state.lastName}
                        disabled/>}
                </div>
            </div>
            <div className={this.state.self ? "row pb-2" : "d-none"}>
                <div className="col-12">
                    <label htmlFor="email">Email</label>
                    <input 
                        id="email" 
                        className="form-control"
                        type="email"
                        value={this.state.email}
                        onChange={(event) => this.onChange("email", event)}/>
                </div>
            </div>
            <div className="row pb-2">
                <div className="col-12">
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        className="form-control"
                        type="text"
                        value={this.state.username}
                        disabled/>
                </div>
            </div>
            <div className={this.state.self ? "row pb-2" : "d-none"}>
                <div className="col-12">
                    <label htmlFor="password">Password</label>
                    <input 
                        id="password" 
                        className="form-control"
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.onChange("password", event)}/>
                </div>
            </div>
            <div className={this.state.self ? "row pb-2" : "d-none"}>
                <div className="col-12">
                    <label htmlFor="state">State</label>
                    <input 
                        id="state" 
                        className="form-control"
                        type="text"
                        value={this.state.state}
                        onChange={(event) => this.onChange("state", event)}/>
                </div>
            </div>
            <div className={this.state.redditUsername ? "row pb-2" : "d-none"}>
                <div className="col-12">
                    <label htmlFor="redditUsername">Reddit Username</label>
                    <input 
                        id="redditUsername" 
                        className="form-control"
                        type="text"
                        value={this.state.redditUsername}
                        disabled/>
                </div>
            </div>
            <div className={this.state.user && this.state.user.likedThreads && this.state.user.likedThreads.length > 0 ? "" : "d-none"}>
                <b className="pb-2"> Threads Liked </b>
                {this.state.user && this.state.user.likedThreads ? this.state.user.likedThreads.map(thread => <div><Link to={"/details/t/" + thread.subreddit + "/" + thread.id}>{thread.title}</Link></div>) : ""}
            </div>
            <div className={this.state.self ? "row pt-3" : "d-none"}>
                <div className="col-12">
                    <button className="btn btn-primary btn-block" onClick={() => this.save()}>
                        Save
                    </button>
                </div>
            </div>
            <div className={this.state.self ? "row pt-3" : "d-none"}>
                <div className="col-12">
                    <button className="btn btn-danger btn-block" onClick={() => this.logout()}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}