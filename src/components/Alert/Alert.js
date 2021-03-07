import React from 'react';

const Alert = (props) => {
    return (
        props.message !== "" && (
            <div className="container my-2">
                <div className={`alert alert-${props.alertType}`}>
                    {props.message}
                </div>
            </div>
        )
    )
}

export default Alert;
