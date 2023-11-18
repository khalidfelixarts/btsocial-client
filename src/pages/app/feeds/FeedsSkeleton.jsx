import "./feeds.scss";
import SuggestionsSkeletons from "../../../components/suggestions/SuggestionsSkeleton";
import PostFormSkeleton from "../../../components/posts/post-form/PostFormSkeleton";

const FeedsSkeleton = () => {
  return (
    <div className="feeds">
      <div className="feeds-content">
        <div className="feeds-post">
          <PostFormSkeleton />
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index}>
              {/* <PostSkeleton /> */}
              <div>Post</div>
            </div>
          ))}
        </div>
        <div className="feeds-suggestions">
          <SuggestionsSkeletons />
        </div>
      </div>
    </div>
  );
};

export default FeedsSkeleton;
