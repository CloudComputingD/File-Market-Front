import React from 'react';
import { Link } from "react-router-dom";

const SignupModal = (props) => {
    return(
        <div style={{ width: 400, height: 200, zIndex: 999, position: 'absolute', top: '37%', left: '59.55%', backgroundColor: 'white', borderWidth: 1, borderStyle: 'solid', borderColor: 'black', borderRadius: 8}}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 30, fontWeight: 'bold', marginTop: 40 }}>
                Sign up Complete!
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 30 }}>
                <Link to={"/"}>
                    <button style={{ width: 130, height: 50, fontSize: 18 }}
                        onClick={() => {
                            props.closeModal()}}>
                        Confirm
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default SignupModal;