import React, { Component } from 'react';
import UserService from "../services/UserService";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      error: false
    };

    this.userService = UserService.getInstance();
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);

  }

  onChange(field, event) {
    this.setState({
      [field]: event.target.value
    })
  }

  login() {
    var user = {
      username: this.state.username,
      password: this.state.password,
      email: '',
      firstName: '',
      lastName: '',
      state: ''
    };
    let thisComponent = this;
    this.userService.login(user).then(function(user){
      if (!user.username) {
        thisComponent.setState({ error: true });
      } else {
        thisComponent.props.history.push({pathname: '/profile'});
      }
    });
  }

  render() {
    return (
      <div>
        <h1 className="pb-3" >Sign in</h1>
        <div>
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
            {this.state.error && <div className="alert alert-danger">Bad Credentials</div>}
            <div className="row pt-3">
                <div className="col-12">
                    <button className="btn btn-primary btn-block" onClick={() => this.login()}>
                        Login
                    </button>
                </div>
            </div>
        </div>
      </div>
    )
  }
}