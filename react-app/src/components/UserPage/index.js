import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function UserPage() {
    const [user, setUser] = useState({});
    const { userId } = useParams();

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

    return (
        <div>
            <div>
                <button> Add image</button>
                User image will go here
            </div>
        </div>
    );
}
export default UserPage;