import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../../assets/css/Sign/Signin.module.css";
import GoogleIcon from "../../assets/image/googleicon.png";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { API_Signin, API_OAUTH } from "../../API/APIManager";

const LeftBlock = () => {
  return <div className={styles.left_block_wrapper} />;
};

const RightBlock = (props) => {
  const navigate = useNavigate();
  const [idValue, setId] = useState("");
  const [pwValue, setPw] = useState("");

  return (
    <div className={styles.right_block_outer_wrapper}>
      <div className={styles.signin_wrapper}>
        <div className={styles.signin_header_wrapper}>File Market</div>
        <div className={styles.signin_block_wrapper}>
          <div className={styles.signin_input_wrapper}>
            <input
              id="id_input"
              name="id_input"
              placeholder="Email"
              value={idValue}
              onChange={(event) => {
                setId(event.target.value);
              }}
              className={styles.signin_input}
            />
          </div>
          <div className={styles.signin_input_wrapper}>
            <input
              id="pw_input"
              name="pw_input"
              placeholder="Password"
              value={pwValue}
              onChange={(event) => {
                setPw(event.target.value);
              }}
              className={styles.signin_input}
            />
          </div>
          <div className={styles.signin_button_wrapper}>
            <button
              className={styles.signup_button}
              onClick={() => {
                navigate("signup");
              }}
            >
              Sign up
            </button>
            <button
              className={styles.signin_button}
              onClick={async() => {
                const result = await API_Signin(idValue, pwValue);
                if (result.success) {
                  const authKeys = result.data;
                  props.handleAuth(authKeys[0], authKeys[1], idValue);
                  navigate('/dashboard');
                } else {
                  alert("Invalid Id or Password.");
                }
              }}
            >
              Sign in
            </button>
          </div>
        </div>
        <div className={styles.google_signin_button_wrapper}>
          <a
            className={styles.google_signin_button}
            href="http://localhost:8080/oauth2/authorization/google"
            >
              <img src={GoogleIcon} className={styles.google_icon}/>
              <div className={styles.google_signin_title}>
                Sign in with Google
              </div>
              {props.authDone ? navigate('/') : null}
          </a>
        </div>
      </div>
    </div>
  );
};

const Signin = (props) => {
  return (
    <div className={styles.signin}>
      <LeftBlock />
      <RightBlock authDone={props.authDone} handleAuth={props.handleAuth} />
    </div>
  );
};

export default Signin;
