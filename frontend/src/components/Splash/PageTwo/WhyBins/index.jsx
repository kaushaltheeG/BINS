import "./WhyBins.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react"

const WhyBins = () => {

    const [open, setOpen] = useState(false);

    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(oldval => !oldval)
    }

    useEffect(() => {
        Aos.init({ duration: 500 });
    }, []);

    

    return (
        <section className="o-section--feature o-section--faq v--borderless page-enterprise-section-faq">
            <div className="o-wrap-medium c-accordion" data-aos="fade-up">
                <h2 className="a-accordion__headline">Frequently asked question</h2>
                <div className="c-accordion__items">
                    <div className="c-accordion__row display-flex-icon" onClick={handleOpen}>
                        <button className="c-accordion__row__question why-btn">Why should my company use BINS? </button>
                        {!open ? 
                            <ArrowForwardIosIcon id="closed-arrow" />
                            : <ArrowForwardIosIcon id="open-arrow" />
                        }
                    </div>
                    {open && 
                        <div className="c-accordion__row__answer" data-aos="fade-up">
                            <p>Great question! The simple answer is becuase it's not Slack. </p>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}

export default WhyBins