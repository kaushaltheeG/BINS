import "./Slogan.css"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useHistory } from "react-router-dom";
import mainSplashImg from "../../../../utils/images/main-splash-teamwork-removebg.png"

const Slogan = () => {
    const history = useHistory();

    const handleCreateNew = (e) => {
        e.preventDefault()
        history.push('/createnew')
    }

    return (
        <div className="slogan-container o-container billboard-container--large">
            <header className="slogan-header">
                <h1 className="c-type-headline-jumbo">One BIN for your team and your work</h1>
                <ul className="u-margin-bottom--medium">
                    <li className="hero-links">
                        <CheckCircleIcon /> 
                        <p>Instant communication with your team and others</p>
                    </li>
                    <li className="hero-links">
                        <CheckCircleIcon />
                        <p>Not worth a penny</p>
                    </li>
                </ul>
                <div className="slogan-header-cta c-cta-signup .c-billboard__header__cta--v-stack-on-small-desktop">
                    <div className="c-content-switcher__cta">
                        <button className="c-button v--primary" onClick={handleCreateNew}>Join BINS</button>
                    </div>
                </div>
            </header>
            <div className="trails-hero__img">
                <img src={mainSplashImg} id="default-size" alt="" />
            </div>
        </div>
    )
}

export default Slogan