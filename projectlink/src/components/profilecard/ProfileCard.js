import React from 'react';
import "./ProfileCard.css";
import sy from "../../assets/sy.png";

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
                <ProfileCard name="김승연" image={sy} role="역할" />
                <ProfileCard name="김시우" role="역할" />
                <ProfileCard name="곽민정" role="역할" />
                <ProfileCard name="권지민" role="역할" />
            </div>
        </div>
    );
};

export { ProfileCard, ProfileCardList };
