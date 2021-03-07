import React from 'react';
import { Link } from 'react-router-dom';

const Char = ({ chars }) => {
    const { name, image, id } = chars;
    return (
        <div className="col-md-4 col-sm-6 col-lg-3">
            <div className="card mt-2">
                <div className="card-image-box">
                    <img src={image} alt={name} className="img-fluid" />
                </div>
                <div className="card-body card-summary-wrapper">
                    <h5 className="card-title">{name}</h5>
                    <Link to={`/character/${id}`} className="btn btn-primary btn-sm">Go Profile</Link>
                </div>
            </div>
        </div>
    )
}
export default Char;