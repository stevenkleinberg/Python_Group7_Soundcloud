import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createDetail, editDetails } from "../../store/user-details";
import './userpage.css';

function UserPage() {


    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const [display_name, setDisplayName] = useState("");
    const [avatar_url, setUrl] = useState("");
    const [banner_url, setBannerUrl] = useState("");
    const [avatarLoading, setAvatarLoading] = useState(false);
    const userDetails = useSelector(state => state.detail);
    const [activity, setActivity] = useState(false)




    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const formData = new FormData();

        formData.append("id", +id);
        formData.append("avatar_url", avatar_url);
        formData.append("display_name", display_name);
        formData.append("banner_url", banner_url);

        const detail = await dispatch(editDetails(formData));
        if (detail) {
            history.push("/");
        } else {
            console.log("Error: uploadsong.js react frontend");
        }
    };

    const updateAvatarUrl = (e) => {
        const file = e.target.files[0];
        setUrl(file);
    };

    const updateActivity = (e) => {
        if (e.target.files) {
            setActivity(true)
        } else {
            setActivity(false)
        }
    };
    const updateActivityDisplay = (e) => {
        if (e.target.value) {
            setActivity(true)
        } else {
            setActivity(false)
        }
    };
    const updateBannerUrl = (e) => {
        const file = e.target.files[0];
        setBannerUrl(file);
    };


    const right = 0
    const left = 0

    return (
        <>
            <div id="userPageContainer">
                <div id='firstcontainer'>
                    <div className="userDetailsInfo">
                        <div className="userImage">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => (
                                    updateAvatarUrl(e), updateActivity(e)
                                )}
                                name="avatar_url"
                                id="avatar_url"
                            />
                        </div>
                    </div>
                    {!userDetails?.display_name ?
                        <input
                            type="text"
                            className="field userPage"
                            onChange={(e) => (
                                setDisplayName(e.target.value),
                                updateActivityDisplay(e)
                            )}
                            value={display_name}
                            placeholder="add display name"
                            name="display_name"
                            id="display_name"
                            required
                        />
                        :
                        <>
                        </>
                    }
                </div>

                <div id='secondcontainer'>
                    <div className="backgroundHeaderImage">
                        <button
                            className="headerUploadField">
                            upload header image...
                            <input
                                className="chooseFileHeader"
                                type="file"
                                accept="image/*"
                                onChange={(e) => (
                                    updateBannerUrl(e), updateActivity(e)
                                )}
                                name="banner_url"
                                id="bannerr_url"
                            />
                            <br />
                        </button>
                    </div>
                </div>
            </div>


            {
                activity ?
                    <div className="submitFormDiv">
                        <form onSubmit={(e) => (
                            handleSubmit(e)
                        )} id='submitDetailsForm'>
                            <button className="btn" type="submit">
                                Submit
                            </button>
                        </form>
                    </div>
                    :
                    <>
                    </>
            }
        </>


    );
}
export default UserPage;