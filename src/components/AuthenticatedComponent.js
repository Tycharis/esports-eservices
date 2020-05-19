import React, {Component} from "react";
import {withRouter} from "react-router-dom";

import Header from "./Header";
import {getSelf} from "../services/auth-service";

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    }

    this.modifyChildren = this.modifyChildren.bind(this);
  }

  componentDidMount() {
    getSelf((err, user) => {
      if (err) {
        this.props.updateTitle('Login');
        this.props.history.push('/login');
      }

      this.setState(prevState => ({
        ...prevState,
        user: user
      }));
    });
  }

  modifyChildren(child) {
    const className = child.props.className + " container";

    const props = {
      className,
      user: this.state.user
    };

    return React.cloneElement(child, props);
  }

  render() {
    if (!this.state.user) {
      return (
          <div>
            <h3>Loading...</h3>
          </div>
      );
    }

    return (
        <div>
          <Header {...this.props} user={this.state.user} />
          {React.Children.map(this.props.children, child => this.modifyChildren(child))}
        </div>
    );
  }
}

export default withRouter(AuthenticatedComponent);