import React from 'react';
import '../../css/display-select.css';

const DisplaySelect = ({setDisplayType, displayType}) => {

    if(displayType === 0)
    {
        return(
            <div class="login-register-buttons">
                <button 
                    type="button" 
                    class="auth-form-display-select-btn left active" 
                    onClick={() => setDisplayType(0)}
                >
                    <p>Login</p>
                </button>
                <button 
                    type="button" 
                    class="auth-form-display-select-btn right" 
                    onClick={() => setDisplayType(1)}
                >
                    <p>Create Account</p>
                </button>
            </div>
        );
    }
    else if(displayType === 1)
    {
        return(
            <div class="login-register-buttons">
                <button 
                    type="button" 
                    class="auth-form-display-select-btn left" 
                    onClick={() => setDisplayType(0)}
                >
                    <p>Login</p>
                </button>
                <button 
                    type="button" 
                    class="auth-form-display-select-btn active right" 
                    onClick={() => setDisplayType(1)}
                >
                    <p>Create Account</p>
                </button>
            </div>
        );
    }
}

export default DisplaySelect;