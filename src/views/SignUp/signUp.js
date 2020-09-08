import React from 'react';
import Button from '../../ components/Button';
import FormInput from '../../ components/FormInput';
import {userIcon, emailIcon, lockIcon} from '../../config/image';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  }

  signupHandler = () => {
    alert('submitted');
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]:e.target.value });
  };

  render() {
    return (
      <div className="container">
        <div className="sign-up-box">
          <div className="signup-box-header">
            <h1 className="sign-box-header-title">Register with Us</h1>
          </div>
          <div className="signup-box-form">
            <form className="sign-up-form" onSubmit={this.signupHandler}>
              <FormInput
                onChange={this.handleOnChange}
                value={this.state.firstName}
                label="First Name"
                type="text"
                name="firstName"
                icon={userIcon}
              />
              <FormInput
                onChange={this.handleOnChange}
                value={this.state.lastName}
                label="Last Name"
                type="text"
                name="lastName"
                icon={userIcon}
              />
              <FormInput
                onChange={this.handleOnChange}
                value={this.state.email}
                label="Email"
                type="email"
                name="email"
                icon={emailIcon}
              />
              <FormInput
                onChange={this.handleOnChange}
                value={this.state.password}
                label="Password"
                type="password"
                name="password"
                icon={lockIcon}
              />
              <div className="form-buttons">
                <Button type="submit" text={'Sign up'}></Button>
                <p>
                  Already have an Account?{' '}
                  <a href="#" className="link">
                    {' '}
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
