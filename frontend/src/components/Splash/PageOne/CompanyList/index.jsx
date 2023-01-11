import "./CompanyList.css"
import airbnb from "../../../../utils/images/logo-airbnb-black.png"
import spotify from "../../../../utils/images/logo-spotify-black.png"
import aA from "../../../../utils/images/logo-aA-red-2-removebg.png"
import slack from "../../../../utils/images/slack-black-removebg.png"
import TD from "../../../../utils/images/logo-tdameritrade-black.png"
import netflix from "../../../../utils/images/logo-netflix-black.png"
import nasa from "../../../../utils/images/logo-nasa-black.png"
import time from "../../../../utils/images/logo-time-black.png"






const CompanyList = () => {
    return (
        <section className="company-list-container o-section o-section--feature-companies v--borderless u-padding-top--flush">
            <div className="o-content-container u-text--center">
                <div className="o-section--feature-companies__logos">
                        <div className="c-logo-bar__item">
                            <img src={airbnb} alt="Airbnb" height="35" width="112"/>
                        </div>
                        <div className="c-logo-bar__item">
                            <img src={spotify} alt="Spotify" height="35" width="117" />
                        </div>
                        <div className="c-logo-bar__item">
                            <img src={aA} alt="aA" height="35" width="117" />
                        </div>
                        <div className="c-logo-bar__item">
                            <img src={slack} alt="aA" height="80" width="117" />
                        </div>
                        <div className="c-logo-bar__item">
                            <img src={TD} alt="TD" height="35" width="180" />
                        </div>
                        <div className="c-logo-bar__item">
                            <img src={netflix} alt="Netflix" height="35" width="104" />
                        </div>
                        <div className="c-logo-bar__item">
                            <img src={nasa} alt="Nasa" height="67" width="67" />
                        </div>
                        <div className="c-logo-bar__item">
                            <img src={time} alt="Time" height="35" width="86" />
                        </div>
                </div>
            </div>
        </section>
    )
}

export default CompanyList