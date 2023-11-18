import Skeleton from "react-loading-skeleton";

const CountContainerSkeleton = () => {
  return (
    <div className="count-container">
      <div className="followers-count">
        <span className="count">
          <Skeleton baseColor="#EFF1F6" width={20} />
        </span>
        <p>
          <Skeleton baseColor="#EFF1F6" width={100} />
        </p>
      </div>
      <div className="vertical-line"></div>
      <div className="following-count">
        <span className="count">
          <Skeleton baseColor="#EFF1F6" width={20} />
        </span>
        <p>
          <Skeleton baseColor="#EFF1F6" width={100} />
        </p>
      </div>
    </div>
  );
};
export default CountContainerSkeleton;
