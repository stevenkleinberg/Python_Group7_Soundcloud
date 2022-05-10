import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { editDetails } from "../../store/user-details";
import DisplayName from "./DisplayName";
import "./userpage.css";

function Avatar() {
    const { userId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const currentDetails = useSelector((state) => state.details[userId]);

    const dispatch = useDispatch();
    const [display_name, setDisplayName] = useState(currentDetails?.display_name);
    const [avatar_url, setUrl] = useState("");
    const [activity, setActivity] = useState(false);
    const [display_box, setDisplayBox] = useState(false);

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append("id", currentDetails.id);
        formData.append("avatar_url", avatar_url);
        formData.append("display_name", currentDetails?.display_name);
        formData.append("banner_url", currentDetails?.banner_url);

        const detail = await dispatch(editDetails(formData));
        setUrl("")
        setActivity(false)
        setDisplayBox(false);
    };

    const verify = currentDetails?.id === +sessionUser.id;

    const updateAvatarUrl = (e) => {
        const file = e.target.files[0];
        setUrl(file);
    };

    const updateActivity = (e) => {
        if (e.target.files) {
            setActivity(true);
        } else {
            setActivity(false);
        }
    };

    const checkDisplayName = (e) => {
        if (e) {
            setDisplayBox(true);
        } else {
            setDisplayBox(false);
        }
    };

    return (
        <>
            <div className="avatardiv placeholderDiv">
                <form onSubmit={(e) => handleSubmit(e)} id="submitDetailsForm">
                    <img
                        src={currentDetails?.avatar_url}
                        className="userImage "
                        onChange={(e) => (updateAvatarUrl(e), updateActivity(e))}
                    />
                    {verify ?
                        <>
                            <input
                                className="chooseFileAvatar"
                                type="file"
                                accept="image/*"
                                onChange={(e) => (updateAvatarUrl(e), updateActivity(e))}
                                name="avatar_url"
                                id="avatar_url"
                            />
                        </>
                        :
                        <>
                        </>
                    }
                    {activity ?
                        <>
                            <div className="submitFormDiv">
                                <button
                                    className="btn"
                                    type="submit"
                                    onClick={() => (
                                        checkDisplayName(display_name)
                                    )}
                                >
                                    Submit
                                </button>
                            </div>
                        </>
                        : (
                            <></>
                        )}
                </form>
                <DisplayName />
            </div>
        </>
    )
}

export default Avatar;