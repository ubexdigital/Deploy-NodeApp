import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Alert, Button, FormGroup, InputGroup, Input, InputGroupText } from 'reactstrap';
import Widget from '../../../components/Widget';
import { authError, resetPassword } from '../../../actions/auth';

class Reset extends React.Component {
    static propTypes = {
        dispatch: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);

      this.state = {
        password: '',
        confirmPassword: ''
      };

        this.changePassword = this.changePassword.bind(this);
        this.changeConfirmPassword = this.changeConfirmPassword.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.isPasswordValid = this.isPasswordValid.bind(this);
        this.doReset = this.doReset.bind(this);
    }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  changeConfirmPassword(event) {
    this.setState({confirmPassword: event.target.value});
  }

  checkPassword() {
    if (!this.isPasswordValid()) {
      if (!this.state.password) {
        this.props.dispatch(authError("Password field is empty"));
      } else {
        this.props.dispatch(authError("Passwords are not equal"));
      }
      setTimeout(() => {
        this.props.dispatch(authError());
      }, 3 * 1000)
    }
  }

  isPasswordValid() {
    return this.state.password && this.state.password === this.state.confirmPassword;
  }

  doReset(e) {
    e.preventDefault();

    const params = new URLSearchParams(this.props.location.search);
    const token = params.get('token');
    if (!token) {
      authError("There are no token")
    }

    if (!this.isPasswordValid()) {
      this.checkPassword();
    } else {
      this.props.dispatch(resetPassword(token, this.state.password));
    }
  }

    render() {
      return (
        <div className="auth-page">
          <Container>
            <Widget className="widget-auth mx-auto" title={<h3 className="mt-0">Reset password</h3>}>
              <p className="widget-auth-info">
                Please fill all fields below
              </p>
              <form className="mt" onSubmit={this.doReset}>
                {
                  this.props.errorMessage && (
                    <Alert className="alert-sm" color="danger">
                      {this.props.errorMessage}
                    </Alert>
                  )
                }
                <FormGroup>
                    <InputGroup className="input-group-no-border">

                        <InputGroupText>
                            <i className="la la-lock text-white"/>
                        </InputGroupText>

                        <Input id="password" className="input-transparent ps-3" value={this.state.password}
                                onChange={this.changePassword} type="password"
                                required name="password" placeholder="Password"/>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup className="input-group-no-border">

                        <InputGroupText>
                            <i className="la la-lock text-white"/>
                        </InputGroupText>

                        <Input id="password" className="input-transparent ps-3" value={this.state.confirmPassword}
                                onChange={this.changeConfirmPassword} onBlur={this.checkPassword} type="password"
                                required name="confirmPassword" placeholder="Confirm Password"/>
                    </InputGroup>
                </FormGroup>
                <Button type="submit" color="inverse" className="auth-btn mb-3"
                        size="sm">{this.props.isFetching ? 'Loading...' : 'Reset'}</Button>
              </form>
              <p className="widget-auth-info">
                or
              </p>
              <Link className="d-block text-center" to="login">Enter the account</Link>
            </Widget>
          </Container>
          <footer className="auth-footer">
            {new Date().getFullYear()} &copy; Light Blue - React Admin Dashboard Template. Made by <a href="https://flatlogic.com" rel="noopener noreferrer" target="_blank">Flatlogic LLC</a>
          </footer>
        </div>
      );
    }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Reset));

