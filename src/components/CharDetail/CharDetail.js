import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/action';

const CharDetail = (props) => {
    useEffect(() => {
        props.charInfo(props.match.params.id);
    }, []);

    return (
        <div className="container mt-3">
            {props.charInfoData.map(item => (
                <div className="row" key={item.id}>
                    <div className="col-md-3">
                        <div className="card">
                            <img src={item.image} className="card-img-top" />
                            <div className="card-body">
                                <p className="card-text"><strong>{item.name}</strong></p>
                                <p className="card-text">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <span>{item.location.name}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="card mb-3">
                            <div className="card-body">
                                <h5>Character About</h5>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">
                                        <span className="d-flex align-items-baseline">
                                            <p>ID: </p>
                                            <small>{item.id}</small>
                                            <i className="far fa-id-badge"></i>
                                        </span></li>
                                    {item.status ?
                                        <li className="list-group-item">
                                            <span className="d-flex align-items-baseline">
                                                <p>Status: </p>
                                                <small>{item.status}</small>
                                                {item.status === "unknown" ? <i className="far fa-question-circle"></i> : null}
                                                {item.status === "Dead" ? <i className="fas fa-skull-crossbones"></i> : null}
                                                {item.status === "Alive" ? <i className="fas fa-heartbeat"></i> : null}
                                            </span>
                                        </li>
                                        : null}
                                    {item.created ?
                                        <li className="list-group-item">
                                            <span className="d-flex align-items-baseline">
                                                <p>Created: </p>
                                                <small>{item.created}</small>
                                                <i className="far fa-calendar-alt"></i>
                                            </span>
                                        </li>
                                        : null}
                                    {item.gender ?
                                        <li className="list-group-item">
                                            <span className="d-flex align-items-baseline">
                                                <p>Gender: </p>
                                                <small>{item.gender}</small>
                                                {item.gender === "unknown" ? <i className="fas fa-genderless"></i> : null}
                                                {item.gender === "Male" ? <i className="fas fa-mars"></i> : null}
                                                {item.gender === "Female" ? <i className="fas fa-venus"></i> : null}
                                            </span>
                                        </li>
                                        : null}
                                    {item.species ?
                                        <li className="list-group-item">
                                            <span className="d-flex align-items-baseline">
                                                <p>Species: </p>
                                                <small>{item.species}</small>
                                                {item.species === "Human" || "Alien" || "Humanoid" || "Animal" ?
                                                    [
                                                        (item.species === "Human" ?
                                                            (item.gender === "Male"
                                                                ? <i className="fas fa-male" key={item.gender}></i>
                                                                : <i className="fas fa-female" key={item.gender}></i>
                                                            ) : null),
                                                        (item.species === "Alien"
                                                            ? <i className="fab fa-reddit-alien" key={item.gender}></i>
                                                            : null
                                                        ),
                                                        (item.species === "Humanoid"
                                                            ? <i className="fab fa-android" key={item.gender}></i>
                                                            : null
                                                        ),
                                                        (item.species === "Animal"
                                                            ? <i className="fas fa-paw" key={item.gender}></i>
                                                            : null
                                                        )
                                                    ]
                                                    : <i className="far fa-dot-circle" key={item.gender}></i>}
                                            </span></li>
                                        : null}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        charInfoData: state.r_and_m.charInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        charInfo: (id) => dispatch(actions.charInfoAction(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CharDetail);
