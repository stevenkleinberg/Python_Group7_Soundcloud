const CreatorAvatar = ({ creator }) => {
    return (
        <div className="creator-avatar">
            <a href={creator?.github_url}>
                <img src={creator?.avatar_url} alt={`${creator.first_name} ${creator.last_name}`} />
            </a>
        </div>
    )
}
