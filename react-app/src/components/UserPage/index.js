import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { createDetail } from "../../store/user-details";
import './userpage.css';

function UserPage() {


    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();
    const [display_name, setDisplayName] = useState("");
    const [avatar_url, setUrl] = useState("");
    const [description, setDescription] = useState("");
    const [banner_url, setBannerUrl] = useState("");
    const [avatarLoading, setAvatarLoading] = useState(false);
    const userDetails = useSelector(state => state.detail);



    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const formData = new FormData();

        formData.append("id", +id);
        formData.append("avatar_url", avatar_url);
        formData.append("display_name", display_name);
        formData.append("description", description);
        formData.append("banner_url", banner_url);

        const detail = await dispatch(createDetail(formData));
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

    const updateBannerUrl = (e) => {
        const file = e.target.files[0];
        setBannerUrl(file);
    };




    return (

        <div className="userDetailsContainer">
            <div className="backgroundUserImage">
                <button
                    className="headerUploadField">
                    upload header image...
                    <input
                        className="chooseFileHeader"
                        type="file"
                        accept="image/*"
                        onChange={updateAvatarUrl}
                        name="avatar_url"
                        id="avatar_url"
                    />
                    <br />
                </button>
            </div>
            <div className="userDetailsInfo">
                <p>{sessionUser.email}</p>
                <div className="userImage">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateAvatarUrl}
                        name="avatar_url"
                        id="avatar_url"
                    />
                </div>
                <input
                    type="text"
                    className="field userPage"
                    onChange={(e) => setDisplayName(e.target.value)}
                    value={display_name}
                    placeholder="DisplayName"
                    name="display_name"
                    id="display_name"
                    required
                />
            </div>
        </div>

    );
}
export default UserPage;