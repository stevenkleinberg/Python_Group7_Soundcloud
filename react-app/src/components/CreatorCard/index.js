import { useEffect, useState } from "react";
import CreatorAvatar from "./CreatorAvatar";
import "./CreatorCard.css";

const CreatorCard = ({ creator }) => {
    const [updatedCreator, setUpdatedCreator] = useState(null);
    const [creatorLoaded, setCreatorLoaded] = useState(false);

    useEffect(() => {
        fetch(`https://api.github.com/users/${creator.github_username}`)
            .then((res) => res.json())
            .then((data) => {
                setUpdatedCreator({
                    ...creator,
                    avatar_url: data.avatar_url,
                    github_url: data.html_url,
                });
            })
            // .then(() => console.log(updatedCreator))
            .then(() => setCreatorLoaded(true));
    }, []);

    return (
        <a href={updatedCreator?.github_url}>
            <div className="creator-card flex-column">
                {creatorLoaded && <CreatorAvatar creator={updatedCreator} />}
                <div className="creator-name-tag">
                    {`${updatedCreator.first_name} ${updatedCreator.last_name}`}
                </div>
            </div>
        </a>
    )
};

export default CreatorCard;
