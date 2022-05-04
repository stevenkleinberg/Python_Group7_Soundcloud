import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './userpage.css';

function UserPage() {
    const [user, setUser] = useState({});
    const { userId } = useParams();
    console.log("111111111111111", user)
    useEffect(() => {
        if (!userId) {
            return;
        }
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            setUser(user);
        })();
    }, [userId]);

    if (!user) {
        return null;
    }
    console.log("2222222222222222", user)

    return (

        <div className="userDetailsContainer">
            <div className="backgroundUserImage">
                <button> upload header image... </button>
            </div>
            <div className="userDetailsInfo">
                <p>{user.email}</p>
                <div className="userImage">
                    <button> profile img </button>
                </div>
                <input placeholder="Display Name" />
            </div>
        </div>

    );
}
export default UserPage;