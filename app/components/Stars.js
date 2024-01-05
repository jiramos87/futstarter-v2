import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export const StarRating = ({ value }) => {
  const totalStars = 5;
  const filledStars = value;
  const emptyStars = totalStars - filledStars;

  const filledStar = <AiFillStar key={Math.random()} />;
  const emptyStar = <AiOutlineStar key={Math.random()} />;

  const stars = [...Array(filledStars).fill(filledStar), ...Array(emptyStars).fill(emptyStar)];

  return (
    <div className="flex flex-row items-center my-2">
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};