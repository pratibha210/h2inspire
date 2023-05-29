import React from 'react'
import allCat from '../../assets/imgs/allCat.svg'
import cat1 from '../../assets/imgs/cat1.svg'
import cat2 from '../../assets/imgs/cat2.svg'
import cat3 from '../../assets/imgs/cat3.svg'
import cat4 from '../../assets/imgs/cat4.svg'
import cat5 from '../../assets/imgs/cat5.svg'
import cat6 from '../../assets/imgs/cat6.svg'
import cat7 from '../../assets/imgs/cat7.svg'
import cat8 from '../../assets/imgs/cat8.svg'
import cat9 from '../../assets/imgs/cat9.svg'
import cat10 from '../../assets/imgs/cat9.svg'
import cat11 from '../../assets/imgs/cat9.svg'
import cat12 from '../../assets/imgs/cat9.svg'
import services from "../../assets/imgs/services.png";


function CategoriesGrid() {
  return (
    <section className="service">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-sm-12 col-md-6 mb-5 mb-md-0">
                    <h2 className="section-heading-big">
                        One Step To Your <br /> <span>Future Starts</span> here
                    </h2>
                    <p className="para-big">Suspendisse quis condimentum augue. In id nunc est. Nam neque lacus, fermentum quis mi ut, iaculis dictum dui. Quisque non felis sem. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    <a href="#" className="blue-button section-button-style">Learn More</a>
                </div>
                <div className="col-sm-12 col-md-6 text-center">
                    <img src={services} alt='' />
                </div>
            </div>
            <div className="categories-wrap">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="left">
                        <h3 className="section-heading-small">Find Your Related <br/> <span> Categories </span></h3>
                    </div>
                    <div className="right">
                        <a href="#" className="arrow-button">
                            All Categories
                            <span>
                                {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 8H15" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8 1L15 8L8 15" stroke="#A4A4A4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg> */}
                                 <img src={allCat} alt='cat2'/>
                            </span>
                           
                        </a>
                    </div>
                </div>
                <ul className="cat-list">
                    <li>
                        <div className="inner">
                            <figure>
                            <img src={cat1}/>                                          
                            </figure>
                            <h5>Accountancy</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img src={cat2}/>                                     
                            </figure>
                            <h5>Banking</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img src={cat3}/>                                                                               
                            </figure>
                            <h5>Charity & Voluntary</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img src={cat4}/>                                                                               
                            </figure>
                            <h5>Digital & Creative</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img src={cat5}/>                                                                              
                            </figure>
                            <h5>Estate Agency</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img src={cat6}/>                                                                              
                            </figure>
                            <h5>Graduate</h5>
                        </div>
                    </li>


                    <li>
                        <div className="inner">
                            <figure>
                                <img src={cat7} />                                                                               
                            </figure>
                            <h5>IT Contractor</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img src={cat8} />                                  
                            </figure>
                            <h5>Legal jobs</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img  src={cat9} />                                                                                                                       
                            </figure>
                            <h5>Leisure & Tourism</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img  src={cat10}  />                                                                                                                    
                            </figure>
                            <h5>Manufacturing jobs</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img src={cat11} />                                                                                                                      
                            </figure>
                            <h5>Marketing & PR</h5>
                        </div>
                    </li>
                    <li>
                        <div className="inner">
                            <figure>
                                <img src={cat12} />                                                                                                                       
                            </figure>
                            <h5>Media</h5>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </section>
  )
}

export default CategoriesGrid