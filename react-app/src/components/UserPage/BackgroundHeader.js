import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { editDetails } from "../../store/user-details";
import "./userpage.css";

function BackGroundImage() {
    const { userId } = useParams();
    const sessionUser = useSelector((state) => state.session.user);
    const currentDetails = useSelector((state) => state.details[userId]);


    const dispatch = useDispatch();
    const [display_name, setDisplayName] = useState(currentDetails?.display_name);
    const [avatar_url, setUrl] = useState("");
    const [banner_url, setBannerUrl] = useState(currentDetails?.banner_url);
    const [activity, setActivity] = useState(false);
    const [display_box, setDisplayBox] = useState(false);


    const handleSubmit = async (ev) => {
        ev.preventDefault();

        const formData = new FormData();
        formData.append("id", currentDetails.id);
        formData.append("avatar_url", currentDetails?.avatar_url);
        formData.append("display_name", currentDetails?.display_name);
        formData.append("banner_url", banner_url);

        const detail = await dispatch(editDetails(formData));
        setUrl("")
        setActivity(false)
        setDisplayBox(false);
    };

    const verify = currentDetails?.id === +sessionUser.id;

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
    const updateBannerUrl = (e) => {
        const file = e.target.files[0];
        setBannerUrl(file);
    };
    return (
        <>
            <div>
                <img src={currentDetails?.banner_url} className="banner_container" />
                {
                    verify ?
                        <>
                            <div className="backgroundHeaderImage " style={{}}>
                                <button className="headerUploadField">
                                    upload header image...
                                    <input
                                        className="chooseFileHeader"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => (updateBannerUrl(e), updateActivity(e))}
                                        name="banner_url"
                                        id="banner_url"
                                    />
                                    <br />
                                </button>
                                {activity ?
                                    <>
                                        <form onSubmit={(e) => handleSubmit(e)} id="submitBannaerForm">
                                            <button
                                                className="submitBannersForm"
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
                        </>
                        :
                        <>
                        </>
                }

            </div>



        </>
    )
}

export default BackGroundImage;