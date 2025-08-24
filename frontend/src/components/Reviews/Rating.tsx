type RatingProps = {
  value: number;
};

export default function Rating({ value }: RatingProps) {
  return (
    <div className="rating rating-xs">
      {[1, 2, 3, 4, 5].map((star) => (
        <input
          key={star}
          type="radio"
          name={`rating-${value}-${Math.random()}`}
          className="mask mask-star-2 bg-orange-400"
          aria-label={`${star} star`}
          defaultChecked={value === star}
          disabled
        />
      ))}
    </div>
  );
}
