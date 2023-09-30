import { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import IUser from "../types/user.type";
import "../CSS/ruta.css"

type Props = {};

type State = {
  redirect: string | null,
  userReady: boolean,
  currentUser: IUser & { accessToken: string }
}
export default class Profile extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { accessToken: "" }
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    // let user = null;
    // if (currentUser)
    //   user = JSON.parse(currentUser);
    console.log("profile token", currentUser.data.first_name)
    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    const currentUser = AuthService.getCurrentUser();
    // const { currentUser } = this.state;

    console.log("tokennnn", currentUser.token)
    return (
      <div id="Lmaindiv">
        <div className="container">
          {(this.state.userReady) ?
            <div>
              <header className="jumbotron">
                <h3>
                  <strong>{currentUser.username}</strong> Profile
                </h3>
              </header>
              <p>
                <strong>User Name:</strong>{" "}
                {currentUser.data.username}
              </p>
              <p>
                <strong>First Name:</strong>{" "}
                {currentUser.data.first_name}
              </p>
              <p>
                <strong>Last Name:</strong>{" "}
                {currentUser.data.last_name}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {currentUser.data.email}
              </p>
              <p>
                <strong>Contact No. :</strong>{" "}
                {currentUser.data.phone_number}
              </p>
            </div> : null}
        </div>
      </div>
    );
  }
}
