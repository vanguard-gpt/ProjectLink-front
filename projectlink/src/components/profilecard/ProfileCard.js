import React from 'react';
import "./ProfileCard.css";
import sy from "../../assets/sy.png";
import mj from "../../assets/mj.png";
import kjm from "../../assets/kjm.png"
import sw from "../../assets/sw.png";

const ProfileCard = ({ name, image, role }) => {
    return (
        <div className="profile-card">
            <div className="profile-card-front">
                {image && <img src={image} alt="프로필 사진" className="profile-image" />}
                <div className="profile-name">{name}</div>
            </div>
            <div className="profile-card-back">{role}</div>
        </div>
    );
};

const ProfileCardList = () => {
    return (
        <div className="profile-container">
            <div className="profile-title">Us.</div>
            <div className="profile-cards">
                <ProfileCard name="김승연" image={sy} role="Team Leader + Frontend" />
                <ProfileCard name="김시우" image={sw} role="Backend + PM" />
                <ProfileCard name="곽민정" image={mj} role="UI/UX Design + Frontend" />
                <ProfileCard name="권지민" image={kjm} role="Frontend" />
            </div>
        </div>
    );
};

export { ProfileCard, ProfileCardList };
