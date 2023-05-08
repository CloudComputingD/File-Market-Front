import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import SignupModal from './SignupModal';

const LeftBlock = () => {
    return(
        <div style={{ width: '40%', backgroundColor:"#acacac" }} />
    )
}

const RightBlock = () => {
    const navigate = useNavigate();
    const [nameValue, setName] = useState('');
    const [idValue, setId] = useState('');
    const [pwValue, setPw] = useState('');
    const [rePwValue, setRePw] = useState('');

    const [modalOpen, setModalOpen] = useState('');

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    const checkSignupAvailable = () => {
        if (nameValue !== '' && idValue !== '' && pwValue !== '' && rePwValue !== '' && pwValue === rePwValue) {
            return true;
        } else {
            return false;
        }
    }

    return(
        <div style={{ width: '60%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{ width: 500, height: 600 }}> 
                <div style={{ height: 100, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 70, fontWeight: 'bold'}}>
                    Who're You?
                </div>
                <div style={{ height: 500 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                        <input
                            id="name_input"
                            name="name_input"
                            placeholder='Name'
                            value={nameValue}
                            onChange={(event) => {
                                setName(event.target.value);
                            }}
                            style={{ width: 400, height: 40, fontSize: 20, paddingLeft: 10 }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <input
                            id="id_input"
                            name="id_input"
                            placeholder='ID'
                            value={idValue}
                            onChange={(event) => {
                                setId(event.target.value);
                            }}
                            style={{ width: 400, height: 40, fontSize: 20, paddingLeft: 10 }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <input
                            id="pw_input"
                            name="pw_input"
                            placeholder='Password'
                            value={pwValue}
                            onChange={(event) => {
                                setPw(event.target.value);
                            }}
                            style={{ width: 400, height: 40, fontSize: 20, paddingLeft: 10 }}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                        <input
                            id="rePw_input"
                            name="rePw_input"
                            placeholder='Confirm Password'
                            value={rePwValue}
                            onChange={(event) => {
                                setRePw(event.target.value);
                            }}
                            style={{ width: 400, height: 40, fontSize: 20, paddingLeft: 10 }}
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 50 }}>
                        <button style={{ width: 130, height: 50, fontSize: 18 }}
                            onClick={() => {navigate('/')}}>
                                Cancel
                        </button>
                        <button style={{ width: 130, height: 50, fontSize: 18 }}
                            onClick={() => {
                                if (checkSignupAvailable()) {
                                    openModal()
                                } else {
                                    alert("Warning!");
                                }
                                }}>
                            Sign up
                        </button>
                        {modalOpen && <SignupModal openModal={openModal} closeModal={closeModal} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

const Signup = () => {
    return(
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
            <LeftBlock />
            <RightBlock />
        </div>
    )
}

export default Signup;