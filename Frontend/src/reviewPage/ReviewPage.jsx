import React from "react";
import Review from "../components/Review/Review";
import BreadCrumsb from "../components/trackDetails/BreadCrumsb";
import ReviewContainer from "../components/Review/ReviewContainer";

const ReviewPage = () => {
  return (
    <div className=" flex flex-col gap-7 h-[100vh] overflow-y-scroll fixed w-screen">
      <div className="pt-3">
        <BreadCrumsb />
      </div>
      <div>
        <ReviewContainer/>
      </div>
    </div>
  );
};

export default ReviewPage;
