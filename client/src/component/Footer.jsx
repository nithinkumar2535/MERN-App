import React from 'react';

function Footer() {
  return (
    <div className='container-fluid text-light' style={{backgroundColor:"#272969"}}>
    <footer className="py-5">
      <div className="row">
        <div className="col-3 col-md-2 mb-3">
          <h5>About</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Conatact us</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">About us</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Careers</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Freshcart stories</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Information</a></li>
          </ul>
        </div>

        <div className="col-3 col-md-2 mb-3">
          <h5>Help</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Payment</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Shipping</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Cancellation & Returns</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">FAQ</a></li>
          </ul>
        </div>

        <div className="col-3 col-md-2 mb-3">
          <h5>Connect With Us</h5>
          <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Facebook</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Twitter</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-light opacity-50">Instagram</a></li>
          </ul>
        </div>

        <div className="col-md-3 mb-3 border-start">
        <h5>Mail Us</h5>
        <p className='opacity-50'>FreshCart Private Limited <br />
            SquareNine Mall <br />
            Opposite New Busstand <br />
            Kasaragod, <br />
            Kerala,India <br />
          </p>
        </div>

        <div className="col-md-3 mb-3">
        <h5>Registerd Office Adress</h5>
          <p className='opacity-50'>FreshCart Private Limited <br />
            SquareNine Mall <br />
            Opposite New Busstand <br />
            Kasaragod, <br />
            Kerala,India <br />
            Mob:8086378239
          </p>
        </div>
      </div>

      <div className="d-flex border-top justify-content-center">
        <p>© 2024 Company, Inc. All rights reserved.</p>
      </div>
    </footer>
    </div>
  );
}

export default Footer;
