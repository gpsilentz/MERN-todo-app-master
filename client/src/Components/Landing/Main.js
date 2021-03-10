import React from 'react'

const Main = () => {
  return (
    <div>
			<main>
        <section className="features">
          <div className="container">
            <div className="row text-center">
              <h1 data-aos="fade-up" data-aos-delay="400">Why is this so great?</h1>
              <p data-aos="fade-up" data-aos-delay="600" className="features__description mt-4">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Autem pariatur eveniet, optio aut culpa atque hic quod dignissimos velit? Maiores.</p>
            </div>
            <div className="row text-center mt-4">
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="700">
                <i className="features__icons bi bi-calendar"></i>
                <h4>Lorem.</h4>
                <p className="features__single">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime commodi voluptates laborum omnis non numquam</p>
              </div>
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="800">
                <i className="features__icons bi bi-bag-check"></i>
                <h4>Lorem.</h4>
                <p className="features__single">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime commodi voluptates laborum omnis non numquam</p>
              </div>
              <div className="col-md-4" data-aos="fade-up" data-aos-delay="900">
                <i className="features__icons bi-bounding-box-circles"></i>
                <h4>Lorem.</h4>
                <p className="features__single">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati maxime commodi voluptates laborum omnis non numquam</p>
              </div>
            </div>
          </div>
        </section>

        <section className="get-started">
          <div className="container">
            <div className="row text-center">
              <div className="get-started__text">
                <span className="get-started__span" data-aos="fade-up">Lorem ipsum dolor sit amet </span> 
                <a href="#" className="btn btn-lg btn-primary" data-aos="fade-up"> Click here!</a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Main
