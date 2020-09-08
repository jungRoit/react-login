import React from 'react';
import Button from '../../ components/Button';
import FormInput from '../../ components/FormInput';
import { userIcon, emailIcon, lockIcon } from '../../config/image';
import { validatePassword } from '../../utils/validators';
import * as ApiService from '../../services/api';
import { emailValidation, signUp } from '../../config/url';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      errorMessage: '',
      success: false,
    };
  }

  validateInputs = () => {
    if (!this.state.email) {
      this.setState({ errorMessage: 'Email cannot be empty', password:'' });
      this.clearText()
      return false;
    }

    if (!this.state.password) {
      this.setState({ errorMessage: 'password cannot be empty', password:'' });
      this.clearText()
      return false;
    }
    return true;
  };

  signupHandler = async (e) => {
    e.preventDefault();
    const isValid = this.validateInputs();
    if (isValid) {
      const passwordValidation = validatePassword(this.state.password);
      if (!passwordValidation.isValid) {
        this.setState({ errorMessage: passwordValidation.message, password:'' });
        this.clearText()
        return;
      }

      //api call
      try {
        const campaignUuid = '46aa3270-d2ee-11ea-a9f0-e9a68ccff42a';
        const emailValidationBody = {
          campaignUuid,
          data: {
            email: this.state.email,
          },
        };
        const emailValidationResponse = await ApiService.post(
          emailValidation,
          emailValidationBody
        );
        if (emailValidationResponse.data.data.status === 'EXISTS') {
          this.setState({
            errorMessage: 'Email Already exists. Please use a new Email.',
            password:''
          });
          this.clearText()
          return;
        }

        const signUpBody = {
          campaignUuid,
          data: {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
          },
        };
        const response = await ApiService.post(signUp, signUpBody);
        this.setState({ success: true });
        this.clearText()
      } catch (error) {
        console.log('err', error, error.response);
        if (error.response.data.errors[0]) {
          this.setState({ errorMessage: error.response.data.errors[0].detail, password:'' });
        } else {
          this.setState({
            errorMessage: 'Error Registering User. Please try again.',
            password:''
          });
        }
      }
    }
  };

  clearText = () => {
    setTimeout(()=>{
      this.setState({errorMessage:'', success:false})
    },3000)
  }

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
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
                {this.state.errorMessage && (
                  <p className="error-message">{this.state.errorMessage}</p>
                )}
                {this.state.success && (
                  <p className="success-message">
                    {'Succesfully Registered Account. Thank You for Registering with us.'}
                  </p>
                )}
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
