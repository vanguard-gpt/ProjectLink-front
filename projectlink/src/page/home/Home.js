import { Link } from "react-router-dom";
import "./Home.css";
import logo from "../../assets/logo.png";
import "../styles.css";
import "../../components/Button.css";
import Button from '../../components/Button';
import { ProfileCardList } from "../../components/profilecard/ProfileCard";

export default function Home() {
    return (
        <>
            <header className="home-header">
                <ul className="nav-left">
                    <li className="nav-item">
                        <Link to="/" className="nav-link">
                            <img src={logo} alt="Home" style={{ width: '140px', height: '60px' }} />
                        </Link>
                    </li>
                </ul>
                <ul className="nav-right">
                    <li className="nav-item">
                        <Button to="/login" className="btn" text="LOGIN" />
                    </li>
                    <li className="nav-item">
                        <Button to="/signup" className="btn" text="SIGN UP" />
                    </li>
                </ul>
            </header>

            <div className="banner">
                <div className="banner-content">
                    <h1 class="home-h1">The Future of Collaboration, Join <span class="bold-text">ProjectLink</span></h1>
                    <p className="home-p">팀원들과의 원활한 소통, 프로젝트 관리, 그리고 생산성 극대화를 위한 최적의 솔루션!</p>
                    <ul className="home-ul">
                        <li>실시간 협업 도구: 모든 팀원들과 한 곳에서 소통하세요.</li>
                        <li>효율적인 작업 관리: 직관적인 인터페이스로 프로젝트를 손쉽게 관리하세요.</li>
                        <li>생산성 향상: 모든 작업을 체계적으로 정리하고 목표를 달성하세요.</li>
                    </ul>
                </div>
                <Link to="/signup" className="start-btn">START</Link>
            </div>
            <ProfileCardList/>
        </>
    )
}
