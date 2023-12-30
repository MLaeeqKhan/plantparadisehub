import { useContext } from 'react';
import {Link} from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';

const NavBar = () => {
  const {token,userEmail,logoutUser} = useContext(AuthContext);
  console.log("NavBar token",token);
  console.log(" NavBar userEmail:",userEmail);

  const handleLogout=()=>{
    logoutUser();
  }
  return (
    <>
       <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">PlantParadiseHub</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        {token?(<><button onClick={handleLogout}>Logout</button>
       
       </>):(<> <li className="nav-item">
          <Link className="nav-link" to="/SignUp">Signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Login">Login</Link>
        </li></>)}
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" to="/Venders">Venders</Link></li>
            <li><Link className="dropdown-item" to="#">Another action</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" to="#">Something else here</Link></li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link disabled" aria-disabled="true">Disabled</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default NavBar
