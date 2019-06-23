import React, { Component } from 'react';
import UserService from "../services/UserService";

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
      state: ''
    };

    this.userService = UserService.getInstance();
    let thisComponent = this;
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
          state: currentUser.state
        });
      }
    })
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
    this.userService.logout();
    this.props.history.push({pathname: '/'});
  }

  render() {
    return (
      <div>
        <h1 className="pb-3" >Profile</h1>
        <div>
            <div className="row pb-2">
                <div className="col-6">
                    <label htmlFor="first-name">First name</label>
                    <input 
                        id="first-name" 
                        className="form-control"
                        value={this.state.firstName}
                        onChange={(event) => this.onChange("firstName", event)}/>
                </div>
                <div className="col-6">
                    <label htmlFor="last-name">Last name</label>
                    <input 
                        id="last-name" 
                        className="form-control"
                        value={this.state.lastName}
                        onChange={(event) => this.onChange("lastName", event)}/>
                </div>
            </div>
            <div className="row pb-2">
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
                        onChange={(event) => this.onChange("username", event)}/>
                </div>
            </div>
            <div className="row pb-2">
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
            <div className="row pb-2">
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
                        onChange={(event) => this.onChange("redditUsername", event)}/>
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-12">
                    <button className="btn btn-primary btn-block">
                        Save
                    </button>
                </div>
            </div>
            <div className="row pt-3">
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