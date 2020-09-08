import React from 'react';
import Button from '../../ components/Button';

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

signupHandler = () => {
  alert('submitted');
}

  render() {
    return (
      <div className="container">
        <div className="sign-up-box">
          <div className="signup-box-header">
            <h1 className="sign-box-header-title">Register with Us</h1>
          </div>
          <div  className="signup-box-form">
          <form className="sign-up-form" onSubmit={this.signupHandler}>
            <div className="form-element">
              <label className="form-element-label">First Name</label>
              <input type="text"  className="form-element-submit" />
            </div>
            <div className="form-element">
              <label className="form-element-label">Last Name</label>
              <input type="text"  className="form-element-submit" />
            </div>
            <div className="form-element">
              <label className="form-element-label">Email</label>
              <input type="text"  className="form-element-submit" />
            </div>
            <div className="form-element">
              <label className="form-element-label">Password</label>
              <input type="text"  className="form-element-submit" />
            </div>
            <div className="form-buttons">
            <Button type="submit" text={"Sign up"}></Button>
            <p>Already have an Account? <a href="#" className="link"> Sign In</a></p>
            </div>
          </form>
          </div>
          
        </div>
      </div>
    )
  }
}

export default SignUp;