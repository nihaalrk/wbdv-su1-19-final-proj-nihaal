import React, { Component } from 'react';
import UserService from "../services/UserService";

export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      state: '',
      redditUsername: '',
      error: false
    };

    this.userService = UserService.getInstance();
    this.onChange = this.onChange.bind(this);
    this.register = this.register.bind(this);

  }

  onChange(field, event) {
    this.setState({
      error: false,
      [field]: event.target.value
    })
  }

  register() {
    if (this.state.firstName === '' || this.state.lastName === ''
      || this.state.email === '' || this.state.password === ''
      || this.state.state === '' || this.state.username === '') {
      this.setState({
        error: true
      })
    } else {
      if (this.state.redditUsername === '') {
        var user = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          state: this.state.state
        };
        let thisComponent = this;
        this.userService.register(user).then(function(response){
          if (response.status === 400) {
            thisComponent.setState({ error: true });
          } else {
            thisComponent.props.history.push({pathname: '/profile'});
          }
        });
      } else {
        var user = {
          username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          redditUsername: this.state.redditUsername,
          state: this.state.state
        };
        let thisComponent = this;
        this.userService.registerReddit(user).then(function(response){
          if (response.status === 400) {
            thisComponent.setState({ error: true });
          } else {
            thisComponent.props.history.push({pathname: '/profile'});
          }
        });
      }
      
    }
  }

  render() {
    return (
      <div>
        <h1 className="pb-3" >Create your account</h1>
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
            <div className="row pb-2">
                <div className="col-12">
                    <label htmlFor="redditUsername">Reddit Username (Optional)</label>
                    <input 
                        id="redditUsername" 
                        className="form-control"
                        type="text"
                        value={this.state.redditUsername}
                        onChange={(event) => this.onChange("redditUsername", event)}/>
                </div>
            </div>
            {this.state.error && <div className="alert alert-danger">All fields except reddit username required</div>}
            <div className="row pt-3">
                <div className="col-12">
                    <button className="btn btn-primary btn-block" onClick={() => this.register()}>
                        Create Account
                    </button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}