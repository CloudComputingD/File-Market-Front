import React, { useState } from 'react';
import styles from "../../assets/css/Sign/Signin.module.css";

const LeftBlock = () => {
    return(
        <div className={styles.left_block_wrapper} />
    )
}

const checkSigninAvailable = (id, pw) => {
    if (id === "admin" && pw === "admin") {
        return true;
    }
    else {
        return false;
    }
}

const RightBlock = () => {
    const [idValue, setId] = useState('');
    const [pwValue, setPw] = useState('');

    return(
        <div className={styles.right_block_outer_wrapper}>
            <div className={styles.signin_wrapper}> 
                <div className={styles.signin_header_wrapper}>
                    File Market
                </div>
                <div className={styles.signin_block_wrapper}>
                    <div className={styles.signin_id_input_wrapper}>
                        <input
                            id="id_input"
                            name="id_input"
                            placeholder='ID'
                            value={idValue}
                            onChange={(event) => {
                                setId(event.target.value);
                            }}
                            className={styles.signin_id_input}
                        />
                    </div>
                    <div className={styles.signin_password_input_wrapper}>
                        <input
                            id="pw_input"
                            name="pw_input"
                            placeholder='Password'
                            value={pwValue}
                            onChange={(event) => {
                                setPw(event.target.value);
                            }}
                            className={styles.signin_password_input}
                        />
                    </div>
                    <div className={styles.signin_button_wrapper}>
                        <button className={styles.signin_button}
                            onClick={() => {}}
                            >Sign up
                        </button>
                        <button className={styles.signin_button}
                            onClick={() => {
                                if (checkSigninAvailable(idValue, pwValue)) {
                                } else {
                                    alert("Fail");
                                }
                            }}>
                            Sign in
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Signin = () => {
    return(
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <LeftBlock />
            <RightBlock />
        </div>
    )
}

export default Signin;