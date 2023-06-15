import React, { useId } from 'react'
import { NavLink } from 'react-router-dom';
import Page from '../../components/Page'
import CategoriesGrid from '../../components/ui/CategoriesGrid';
import ContactUsSection from '../../components/ui/ContactUsSection';
import JobsGrid from '../../components/ui/JobsGrid';
import home1 from "../../assets/imgs/home1.svg";
import home2 from "../../assets/imgs/home2.svg";
import home3 from "../../assets/imgs/home3.svg";
import home4 from "../../assets/imgs/home4.svg";
import home5 from "../../assets/imgs/home5.svg";
import home6 from "../../assets/imgs/home6.svg";
import banner from "../../assets/imgs/banner-img.png";
import easyApply from "../../assets/imgs/easy-apply.png"
import manyImg from "../../assets/imgs/many.png";
import support from "../../assets/imgs/support.png";



function Home() {
    const uniqueId = useId();
        
    return (
        <Page title="Home | hire2inspire">
            
            <div className="banner">
                <div className="container">
                    <div className="row g-4 align-items-center">
                        <div className="col-12 col-md-12 col-lg-7">
                            <div className="banner-content">
                                <div className="banner-strap"> <span>Special Offer</span>Now You can get 50% off on your first subscription</div>
                                <h1><span>Find your</span> <br /> dream job <span>with</span> hire2Inspire</h1>
                                <h3>Get the most exciting jobs from all around the<br />
                                    world and grow your career fast with others</h3>

                                {/* <div className="search-area">
                                    <div className="search">
                                        <span>
                                            
                                            <img src={home1}/>
                                        </span>
                                        <input type="search" id="search" placeholder="Job title or keywords" />
                                    </div>
                                    <div className="dropdown">
                                        <span>
                                           
                                            <img src={home2} alt='' />
                                        </span>
                                        <select className="form-select">
                                            <option>All Specialisms</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <div className="dropdown">
                                        <span>
                                            
                                            <img src={home3} alt=''/>
                                        </span>
                                        <select className="form-select">
                                            <option>All Location</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="">GO</button>
                                </div> */}
                                <div className="social">
                                    <span>Follow Us</span>
                                    <ul>
                                        <li>
                                            <a href="#">
                                               
                                                <img src={home4} alt='' />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                
                                                <img src={home5} alt ='' />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#">
                                                
                                                <img src={home6} alt='' />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-12 col-lg-5">
                            <div className="banner-img">
                                <img src={banner} alt="" className="img-fluid" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <CategoriesGrid /> */}

            <section className="find-jobs-section text-center">
                <div className="container">
                    <div className="heading-part">
                        <h2 className="section-heading-medium">More easier to <span>find a job</span> <br />
                        with our <span>platform</span></h2>

                        <p>The following features make our service easier to help you find suitable <br />
                            jobs from various companies</p>
                    </div>

                    <ul className="process-list">
                        <li>
                            <div className="box">
                                <figure>
                                    <img src={easyApply} />
                                </figure>
                                <h3>Easy Applying</h3>
                                <p>The process of applying for a job is 
                                easier and faster.</p>
                            </div>
                        </li>
                        <li>
                            <div className="box">
                                <figure>
                                    <img src={manyImg} />
                                </figure>
                                <h3>Many Vacancies</h3>
                                <p>There are many job vacancies from
                                    various companies.</p>
                            </div>
                        </li>
                        <li>
                            <div className="box">
                                <figure>
                                    <img src={support} />
                                </figure>
                                <h3>Best Support</h3>
                                <p>We Provide full support for job seekers
                                    for better results.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

            {/* <JobsGrid /> */}

            <ContactUsSection />
            {/* <div className="banner">
                <div>Home</div>
                <NavLink to={'/auth/login'} key={uniqueId}>
                    <button>Login</button>
                </NavLink>
            </div> */}
        </Page>
    )
}

export default Home