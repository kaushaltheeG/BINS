import "./PageOne.css"
import Slogan from "./Slogan"
import CompanyList from "./CompanyList"

const PageOne = () => {

    return (
        <section className="page-one-container-background page-one-background-color">
            <Slogan />
            <CompanyList /> 
        </section>
    )
}

export default PageOne