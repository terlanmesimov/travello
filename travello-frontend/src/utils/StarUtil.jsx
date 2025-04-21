

const RenderStars = ({rating}) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <>
      {Array(fullStars)
        .fill("★")
        .map((star, index) => (
          <span key={`full-${index}`} style={{ color: "gold" }}>
            {star}
          </span>
        ))}
      {halfStar && <span style={{ color: "gold" }}>☆</span>}
      {Array(emptyStars)
        .fill("☆")
        .map((star, index) => (
          <span key={`empty-${index}`} style={{ color: "gray" }}>
            {star}
          </span>
        ))}
    </>
  );
};

export default RenderStars;
