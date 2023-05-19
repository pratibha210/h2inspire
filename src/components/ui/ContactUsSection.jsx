import React from 'react'

function ContactUsSection() {
  return (
    <section className="form-section">
        <div className="container">
            <div className="row align-items-center justify-content-between flex-sm-row-reverse">

                <div className="col-sm-12 col-md-6 col-lg-5 form-heading-section">
                    <h2 className="section-heading-big">
                        Get in <span>touch</span>
                    </h2>
                    <p>We'd be delighted to hear from you, Please fill in the form below & share your requirements.</p>

                    <form action="">
                        <div className="mb-3 mt-3">
                            <input type="text" className="input-style" id="email" placeholder="Enter your full name" name="email" />
                        </div>
                        <div className="mb-3 mt-3">
                            <input type="email" className="input-style" id="email" placeholder="Enter your email id" name="email" />
                        </div>
                        <div className="mb-3 mt-3">
                            <input type="text" className="input-style" id="email" placeholder="Enter subject" name="email" />
                        </div>
                        <div className="mb-3 mt-3">
                            <textarea className="textarea-style" rows="5" id="comment" name="text" placeholder="Enter your query"></textarea>
                        </div>
                        <div className="d-flex justify-content-between align-items-center form-element">
                            <span>We will answers your questions via <br/>
                                email within 48 hours.</span>
                            <button type="submit" className="btn btn-primary">Submit Query</button>
                        </div>
                    </form>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-5 text-center align-self-end ">
                    <img src="src/assets/imgs/lady-image.png" alt='Contact us image'/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ContactUsSection