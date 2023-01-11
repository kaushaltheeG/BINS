import "./PageOne.css"
import Slogan from "./Slogan"
import CompanyList from "./CompanyList"

const PageOne = () => {

    return (
        <div className="page-one-container-background">
            <Slogan />
            <CompanyList /> 
        </div>
    )
}

export default PageOne