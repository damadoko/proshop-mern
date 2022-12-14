import React, { CSSProperties } from "react";

export type RatingProps = {
  value: number;
  text: string;
  color?: CSSProperties["color"];
};

export const Rating: React.FC<RatingProps> = ({
  value,
  text,
  color = "#f8e825",
}) => {
  return (
    <div className="rating">
      {Array.from(Array(5)).map((_, index) => {
        return (
          <span key={index}>
            <i
              style={{ color }}
              className={
                value >= index + 1 && value - index !== 0.5
                  ? "fas fa-star"
                  : index + 0.5 === value
                  ? "fas fa-star-half-alt"
                  : "far fa-star"
              }
            />
          </span>
        );
      })}

      {text && <span className="ms-1">{text}</span>}
    </div>
  );
};
