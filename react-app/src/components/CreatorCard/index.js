import { useEffect } from "react";
import CreatorAvatar from "./CreatorAvatar";
import "./CreatorCard.css";

const CreatorCard = ({ creator }) => {
    useEffect(() => {
        const res = fetch(`https://api.github.com/users/${creator.github_username}`);

        if (res.ok) {
            const data = res.json();
            creator = {
                ...creator,
                avatar_url: data.avatar_url,
                github_url: data.html_url,
            }
        }
    }, []);

    return (
        <div className="creator-card">
            <CreatorAvatar creator={creator} />
            <div className="creator-name-tag">
                {`${creator.first_name} ${creator.last_name}`}
            </div>
        </div>
    )
};

export default CreatorCard;
