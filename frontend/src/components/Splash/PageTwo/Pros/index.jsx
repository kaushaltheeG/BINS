import "./Pros.css"
import orginzedPeople from "../../../../utils/images/orginized-people-removebg.png"
import puzzlePeople from "../../../../utils/images/connecting-people-removebg.png"
import businessWoman from "../../../../utils/images/business-woman-vec-removebg.png"
import idea from "../../../../utils/images/idea-vector-removebg.png"




const Pros = () => {

    return (
        <section className="o-section--feature c-blurb-row v--borderless v--four">
            <div className="o-content-container">
                <header className="c-blurb-row__header u-padding-top--x-large u-margin-bottom--large">
                    <h2>One area to work faster together</h2>
                </header>
                <div className="c-feature-grid v--imageicon u-text--left v--borderless v--four">
                    <div class="c-feature-grid__item u-flush-padding--tablet-only">
                        <img src={orginzedPeople} alt="" height="150" />
                        <h3 className="display-as-paragraph">
                            <strong>Move faster with organized conversations</strong>
                        </h3>
                        <p className="c-feature-grid__item__copy">
                            Streamline collaboration with pods and direct messages within dedicated work areas.
                        </p>
                    </div>
                    <div class="c-feature-grid__item u-flush-padding--tablet-only">
                        <img src={puzzlePeople} alt="" height="150" />
                        <h3 className="display-as-paragraph">
                            <strong>Find and connect with people and teams</strong>
                        </h3>
                        <p className="c-feature-grid__item__copy">
                            Be able to join any work area and connect with new people.
                        </p>
                    </div>
                    <div class="c-feature-grid__item u-flush-padding--tablet-only">
                        <img src={businessWoman} alt="" height="150" />
                        <h3 className="display-as-paragraph">
                            <strong>Solve problems faster with instant messaging</strong>
                        </h3>
                        <p className="c-feature-grid__item__copy">
                            High speeds for reddis allow for ideas to be instantly communicated. 
                        </p>
                    </div>
                    <div class="c-feature-grid__item u-flush-padding--tablet-only">
                        <img src={idea} alt="" height="150" width="225"/>
                        <h3 className="display-as-paragraph">
                            <strong>Easy to hatch an idea with other companies</strong>
                        </h3>
                        <p className="c-feature-grid__item__copy">
                            Find your team to make your vision into a reality.
                        </p>
                    </div>
                </div>
                
            </div>
        </section>
    )
}

export default Pros

