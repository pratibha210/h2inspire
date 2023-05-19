import React from "react";

function JoinAsSection() {
  return (
    <div className="two-box">
      <div className="blank-box">
        <h2>Agencies</h2>
        <p>
          Register an employer account, create your company's profile and start
          publish awesome job offers.
        </p>
        <span className="line"></span>

        <a href="#" className="white-btm">
          Join Now
        </a>
      </div>
      <div
        className="blank-box-with-image"
        style={{ background: "url('src/assets/imgs/fg.png') no-repeat" }}
      >
        <h2>Employers</h2>
        <p>
          Register an employer account, create your company's profile and start
          publish awesome job offers.
        </p>
        <span className="line"></span>

        <a href="#" className="white-btm">
          Join Now
        </a>
      </div>
    </div>
  );
}

export default JoinAsSection;
