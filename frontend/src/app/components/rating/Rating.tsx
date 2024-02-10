import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { AiOutlineStar } from "react-icons/ai";

interface RatingProps {
  stars: number;
}

const Rating: React.FC<RatingProps> = ({ stars }) => {
  const ratingStars = Array.from({ length: 5 }, (item, index) => {
    const number = index + 0.5;
    return (
      <span key={index} className="">
        {stars >= index + 1 ? (
          <FaStar color="#e3bb44" />
        ) : stars >= number ? (
          <FaStarHalf color="#e3bb44" />
        ) : (
          <AiOutlineStar color="#e3bb44" />
        )}
      </span>
    );
  });

  return (
    <div className="">
      <p className="flex flex-row gap-2">{ratingStars}</p>
    </div>
  );
};

export default Rating;

// RATING COMPONENT WITH ONCHNAGE FUNCTION

// import React, { useState } from "react";
// import { FaStar, FaStarHalf } from "react-icons/fa";
// import { AiOutlineStar } from "react-icons/ai";

// interface RatingProps {
//   stars: number;
//   onChange?: (rating: number) => void;
// }

// const Rating: React.FC<RatingProps> = ({ stars, onChange }) => {
//   const [hoveredStar, setHoveredStar] = useState<number>(0);

//   const handleMouseOver = (index: number) => {
//     setHoveredStar(index + 1);
//   };

//   const handleMouseLeave = () => {
//     setHoveredStar(0);
//   };

//   const handleClick = (index: number) => {
//     if (onChange) {
//       onChange(index + 1);
//     }
//   };

//   const ratingStars = Array.from({ length: 5 }, (item, index) => {
//     const number = index + 0.5;
//     return (
//       <span
//         key={index}
//         className=""
//         onMouseOver={() => handleMouseOver(index)}
//         onMouseLeave={handleMouseLeave}
//         onClick={() => handleClick(index)}
//       >
//         {stars >= index + 1 ? (
//           <FaStar color={hoveredStar > index ? "#e3bb44" : "#ccc"} />
//         ) : stars >= number ? (
//           <FaStarHalf color={hoveredStar > index ? "#e3bb44" : "#ccc"} />
//         ) : (
//           <AiOutlineStar color={hoveredStar > index ? "#e3bb44" : "#ccc"} />
//         )}
//       </span>
//     );
//   });

//   return (
//     <div className="">
//       <p className="flex flex-row gap-2">{ratingStars}</p>
//     </div>
//   );
// };

// export default Rating;
