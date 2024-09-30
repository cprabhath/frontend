import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import DateTime from "./DateAndTime";

const Dashboard = () => {
  const [driversCount, setDriversCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [profileDetals, setProfileDetails ] = useState({});
  const [usename, setUserName] = useState("");
  const [image, setImage] = useState("");
  
  useEffect(() => {

    setUserName(localStorage.getItem("UserName"));
    setImage(localStorage.getItem("image"));
    setProfileDetails(JSON.parse(localStorage.getItem("user")));
    setImage(profileDetals.profileImage)
  }, [profileDetals.profileImage]);

  //   const { addError } = useErrors();
  const navigate = useNavigate();



  useEffect(() => {
    getTotalDrivers();
    getTotalCustomers();
  }, []);

  const getTotalDrivers = async () => {
    await axios.get("http://localhost:3000/api/v1/driver/total-drivers").then((res) => {
      setDriversCount(res.data.message);
    }).catch((err) => {
        toast.error(err.response.data.message);
        toast.error("Failed to get total drivers");
    });
  }

  const getTotalCustomers = async () => {
    await axios.get("http://localhost:3000/api/v1/passenger/totalPassengers").then((res) => {
      setCustomersCount(res.data.message);
    }).catch((err) => {
        toast.error(err.response.data.message);
        toast.error("Failed to get total customers");
    });
  }

  const Logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout from system",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel",
      confirmButtonText: "Yes, Logout",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
        navigate("/");
      }
    });
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* <!-- Sidebar - Brand --> */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="#"
          >
            <div className="sidebar-brand-text mx-3">
              City Taxi Admin
            </div>
          </a>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/* <!-- Nav Item - Dashboard --> */}
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span className=" fw-bold">Dashboard</span>
            </Link>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">Interface</div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Orders"
              aria-expanded="true"
              aria-controls="Orders"
            >
              <i className="fas fa-fw fa-check"></i>
              <span className=" fw-bold">Booking Management</span>
            </a>
            <div
              id="Orders"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/bookings">
                  All Booking
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-fw fa-user"></i>
              <span className=" fw-bold">Customer Management</span>
            </a>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/passengers">
                  All Passngers
                </Link>
                <Link className="collapse-item" to="/dashboard/passengers/add">
                  Add Passenger
                </Link>
              </div>
            </div>
          </li>
        
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Category"
              aria-expanded="true"
              aria-controls="Category"
            >
              <i className="fas fa-fw fa-user"></i>
              <span className=" fw-bold">Driver Management</span>
            </a>
            <div
              id="Category"
              className="collapse"
              aria-labelledby="Category"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/drivers">
                  All Drivers
                </Link>
                <Link className="collapse-item" to="/dashboard/drivers/add">
                  Add Driver
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Brands"
              aria-expanded="true"
              aria-controls="Brands"
            >
              <i className="fas fa-fw fa-car"></i>
              <span className=" fw-bold">Vehicle Management</span>
            </a>
            <div
              id="Brands"
              className="collapse"
              aria-labelledby="Brands"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/vehicles">
                  All Vehicles
                </Link>
                <Link className="collapse-item" to="/dashboard/vehicles/add">
                  Add Vehicle
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Products"
              aria-expanded="true"
              aria-controls="Products"
            >
              <i className="fas fa-fw fa-phone"></i>
              <span className=" fw-bold">PO Management</span>
            </a>
            <div
              id="Products"
              className="collapse"
              aria-labelledby="Products"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/phoneOperators">
                  All Phone Operators
                </Link>
                <Link className="collapse-item" to="/dashboard/phoneOperators/add">
                  Add Phone Operator
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Reports"
              aria-expanded="true"
              aria-controls="Reports"
            >
              <i className="fas fa-fw fa-chart-bar"></i>
              <span className=" fw-bold">Reports & Analytics </span>
            </a>
            <div
              id="Reports"
              className="collapse"
              aria-labelledby="Reports"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/analytics">
                  Analytics
                </Link>
                <Link className="collapse-item" to="/dashboard/reports">
                  Reports
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Settings"
              aria-expanded="true"
              aria-controls="Settings"
            >
              <i className="fas fa-fw fa-gear"></i>
              <span className=" fw-bold">Settings</span>
            </a>
            <div
              id="Settings"
              className="collapse"
              aria-labelledby="Settings"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/settings">
                  Settings
                </Link>
              </div>
            </div>
          </li>
        </ul>
        {/* <!-- End of Sidebar --> */}

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <DateTime />
              {/* <!-- Sidebar Toggle (Topbar) --> */}
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars"></i>
              </button>

              {/* <!-- Topbar Navbar --> */}
              <ul className="navbar-nav ml-auto">
                {/* <!-- Nav Item - Alerts --> */}
                {/* <ActionCenter /> */}

                <div className="topbar-divider d-none d-sm-block"></div>

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small fw-bold">
                      {usename}
                    </span>
                    <img className="img-profile rounded-circle" src={image} />
                  </a>
                  {/* <!-- Dropdown - User Information --> */}
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <Link className="dropdown-item" to="/dashboard/profile">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </Link>
                    <button className="dropdown-item" onClick={() => Logout()}>
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </button>
                  </div>
                </li>
              </ul>
            </nav>
            {/* <!-- End of Topbar --> */}
          </div>
          <div className="container-fluid">
            <Outlet
              context={{
                driversCount,
                customersCount,
                vehiclesCount,
                bookingsCount,
              }}
            />
          </div>
          {/* <!-- End of Main Content -->

        <!-- Footer --> */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; City Taxi | 2024 </span>
              </div>
            </div>
          </footer>
          {/* <!-- End of Footer --> */}
        </div>
        {/* <!-- End of Content Wrapper --> */}
      </div>
      {/* <!-- End of Page Wrapper -->

<!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
};

export default Dashboard;
