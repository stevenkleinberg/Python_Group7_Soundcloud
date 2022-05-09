const TechCard = ({ tech }) => {
    console.log(tech);

    return (
        <a href="" target="_blank">
            <div className="tech-card flex-row">
                <div className="tech-icon">
                    <img src={tech?.image_url} alt={tech?.name} />
                </div>
            </div>
        </a>
    )
};

export default TechCard;
