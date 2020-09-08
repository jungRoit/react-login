import React from 'react';
import Button from '../../ components/Button';
import FormInput from '../../ components/FormInput';
import {userIcon, emailIcon, lockIcon} from '../../config/image';
import {validatePassword} from '../../utils/validators';
import * as ApiService from '../../services/api';


class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: ''
    };
  }

  validateInputs = () => {
    if(!this.state.email) {
      this.setState({errorMessage:'Email cannot be empty'});
      return false;
    }

    if(!this.state.password) {
      this.setState({errorMessage:'password cannot be empty'});
      return false;
    }
    return true;
  }

  signupHandler = async e => {
    e.preventDefault();
    const isValid = this.validateInputs();
    if(isValid) {
      const passwordValidation = validatePassword(this.state.password);
      if(!passwordValidation.isValid) {
        this.setState({errorMessage: passwordValidation.message});
        return;
      }

      //api call
      try {
        const campaignUuid = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a';
        const emailValidationBody = {
          campaignUuid,
          data: {
            email: this.state.email
          }
         }
        const emailValidationResponse = await ApiService.post('https://api.raisely.com/v3/check-user',emailValidationBody);
        if(emailValidationResponse.data.data.status === 'EXISTS') {
          this.setState({errorMessage: 'Email Already exists. Please use a new Email.'});
          return;
        }

        const signUpBody = {
          campaignUuid,
          data: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password
          }
         }
        const response = await ApiService.post('https://api.raisely.com/v3/signup',signUpBody);
      } catch (error) {
        this.setState({errorMessage:error});
      }
    }
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
