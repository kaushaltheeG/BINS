import "./Splash.css"
import PageOne from "./PageOne"
import PageTwo from "./PageTwo"

const Splash = () => {
    return (
        <div className="main">
            <div className="main-two">
                <PageOne />
                <PageTwo /> 
            </div>
        </div>
    )
}

export default Splash