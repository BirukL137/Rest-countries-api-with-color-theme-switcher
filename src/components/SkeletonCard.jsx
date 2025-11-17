import "../styles/SkeletonCard.css";

const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton-card__flag"></div>
    <div className="skeleton-card__text"></div>
    <div className="skeleton-card__text short"></div>
    <div className="skeleton-card__text short"></div>
  </div>
);

export default SkeletonCard;
