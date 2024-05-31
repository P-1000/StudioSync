import React from "react";
import Review from "../components/Review/Review";
import BreadCrumsb from "../components/trackDetails/BreadCrumsb";

const ReviewPage = () => {
  return (
    <div className=" flex flex-col gap-7">
      <div className="pt-3">
        <BreadCrumsb />
      </div>
      <div>
        <Review />
      </div>
    </div>
  );
};

export default ReviewPage;
