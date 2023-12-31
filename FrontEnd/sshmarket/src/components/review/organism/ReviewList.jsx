import styled from "styled-components";
import ReviewBox from "../ReviewBox";
import React from "react";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  margin-top: 80px;
`;

const TextContainer = styled.div`
  font-size: x-large;
  font-weight: bold;
  padding-left: 10px;
`;

const NoElemContainer = styled.div`
  font-size: 20px;
  margin-left: 10px;
  margin-top: 30px;
`;

export default function ReviewList({ data }) {
  const isArticle =
    useLocation().pathname.split("/")[1] === "article" ? true : false;

  return (
    <Container>
      <TextContainer>상품 리뷰</TextContainer>

      {data.length < 1 ? (
        <NoElemContainer>
          리뷰가 없습니다. 첫번째 리뷰를 달아보세요!
        </NoElemContainer>
      ) : (
        <></>
      )}

      {data.map((review, idx) => (
        <React.Fragment key={idx}>
          {isArticle ? (
            <ReviewBox
              key={review.id}
              member={review.member}
              starRating={review.starRating}
              content={review.message}
              images={review.images}
              createdAt={review.createdAt}
            />
          ) : (
            <ReviewBox
              key={review.id}
              starRating={review.starRating}
              articleTitle={review.article.title}
              content={review.message}
              images={review.images}
              createdAt={review.createdAt}
            />
          )}
        </React.Fragment>
      ))}
    </Container>
  );
}
