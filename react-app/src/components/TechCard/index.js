const TechCard = ({ tech }) => {
  return (
    <div className="tech-card flex-row">
      <div className="tech-icon">
        <img src={tech?.image_url} alt={tech?.name} />
      </div>
    </div>
  );
};

export default TechCard;
