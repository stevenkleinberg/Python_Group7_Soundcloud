import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { editDetails } from "../../store/user-details";
import "./userpage.css";
import "./user_page.scss";

function DisplayName() {
    const { userId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const currentDetails = useSelector((state) => state.details[userId]);
    const songs = Object.values(useSelector((state) => state.songs));

    const likedSongs = songs?.filter((song) => song.likes.includes(+userId));

    const dispatch = useDispatch();
    const history = useHistory();
    const [display_name, setDisplayName] = useState(currentDetails?.display_name);
    const [avatar_url, setUrl] = useState("");
    const [banner_url, setBannerUrl] = useState(currentDetails?.banner_url);
    const [activity, setActivity] = useState(false);
    const [display_box, setDisplayBox] = useState(false);

    // const handleSubmit = async (ev) => {
    //     ev.preventDefault();

    //     const formData = new FormData();
    //     formData.append("id", currentDetails.id);
    //     formData.append("avatar_url", avatar_url);
    //     formData.append("display_name", display_name);
    //     formData.append("banner_url", banner_url);

    //     const detail = await dispatch(editDetails(formData));

    //     setDisplayBox(false);
    // };

    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append("id", currentDetails.id);
        formData.append("avatar_url", avatar_url);
        formData.append("display_name", display_name);
        formData.append("banner_url", banner_url);

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
    const updateSetDisplayBox = () => {
        if (sessionUser.id === currentDetails.id) {
            setDisplayBox(true)
        } else {
            setDisplayBox(false)
        }
    }

    const updateActivityDisplay = (e) => {
        if (e === null) setActivity(false)
        if (e.target.value) {
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
    const updateBannerUrl = (e) => {
        const file = e.target.files[0];
        setBannerUrl(file);
    };
    return (
        <div className="flex-column">
            {display_box ? (
                <div>
                    <input
                        style={{ margin: ".3em 0em" }}
                        type="text"
                        className="field userPage"
                        onChange={(e) => (
                            setDisplayName(e.target.value),
                            updateActivityDisplay(e)
                        )}
                        placeholder={currentDetails?.display_name}
                        value={display_name}
                        name="display_name"
                        id="display_name"
                        required
                    />
                    <button
                        type="button"
                        className="userbtn"
                        onClick={() => (
                            setDisplayBox(false),
                            setActivity(false),
                            setDisplayName(`${currentDetails.display_name}`)
                        )}
                    >
                        cancel
                    </button>
                    {activity ?
                        <>

                            <form onSubmit={(e) => handleSubmit(e)} id="submitDetailsForm">
                                <button
                                    className="btn"
                                    type="submit"
                                    onClick={() => (
                                        checkDisplayName(display_name)
                                    )}
                                >
                                    Submit
                                </button>
                            </form>

                        </>
                        : (
                            <></>
                        )}
                </div>
            ) : (
                <>
                    <button
                        className="btn draw-border userBtnDetail"
                        onClick={() => updateSetDisplayBox()}
                    >
                        {currentDetails?.display_name ? (
                            <> {currentDetails.display_name} </>
                        ) : (
                            <> add name </>
                        )}
                    </button>
                </>
            )}




        </div>
    )
}

export default DisplayName;