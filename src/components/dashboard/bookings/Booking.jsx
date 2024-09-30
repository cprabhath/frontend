import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  MDBDataTableV5, 
  MDBDropdown, 
  MDBDropdownToggle, 
  MDBDropdownMenu, 
  MDBDropdownItem, 
  MDBModal, 
  MDBModalBody, 
  MDBModalHeader, 
  MDBModalFooter, 
  MDBBtn 
} from "mdbreact";

const Booking = () => {
  const [datatable, setDatatable] = useState({
    columns: [
      { label: "ID", field: "id" },
      { label: "Passenger Name", field: "passengerName", width: 150 },
      { label: "Driver Name", field: "driverName", width: 150 },
      { label: "Vehicle Number", field: "vehicleNumber", width: 150 },
      { label: "Cost", field: "cost", width: 100 },
      { label: "Status", field: "status", width: 100 },
      { label: "Date", field: "date", width: 150 },
      { label: "Actions", field: "actions", width: 100 },
    ],
    rows: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const toggleModal = () => setModal(!modal);

  const fetchData = () => {
    setIsLoading(true);
    axios.get("http://localhost:3000/api/v1/driver/ride-details")
      .then((response) => {
        const data = response.data.message;
        console.log(data);
        
        if (!data || data.length === 0) {
          toast.info("No bookings found.");
          setIsLoading(false);
          return;
        }

        const rows = data.map((booking) => ({
          id: booking.id,
          passengerName: booking.passenger.fullName,
          driverName: booking.driver ? booking.driver.fullName : "Not Assigned",
          vehicleNumber: booking.vehicle.vehicleNumber ? booking.vehicle.vehicleNumber : "Not Assigned",
          cost: booking.cost,
          status: (
            <span className={`badge badge-${booking.status === "completed" ? "success" : "danger"}`}>
              {booking.status}
            </span>
          ),
          date: new Date(booking.createdAt).toLocaleString(),
          actions: (
            <MDBDropdown>
              <MDBDropdownToggle caret style={{ backgroundColor: 'transparent', border: 'none', color: '#000' }} className="btn btn-sm btn-secondary">
              <i className="fas fa-ellipsis-v"></i>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => {
                  setSelectedBooking(booking);
                  toggleModal();
                }}>
                  <i className="fas fa-eye"></i> View Details
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          ),
        }));

        setDatatable((prevState) => ({ ...prevState, rows: rows }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error(err.response?.data?.message || "Failed to load bookings. Please try again later.");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="card shadow" style={{ marginBottom:"150px" }}>
        <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <Link to="/dashboard">
            <i className="fas fa-arrow-left"></i>{" "}
          </Link>
          <h6 className="m-0 font-weight-bold text-primary">All Bookings</h6>
          <div>{""}</div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {isLoading ? (
              <div className="spinner-border text-primary" role="status"></div>
            ) : (
              <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={datatable}
                searchTop
                searchBottom={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* Modal for Booking Details */}
      <MDBModal isOpen={modal} toggle={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Booking Details</MDBModalHeader>
        <MDBModalBody>
          {selectedBooking && (
            <div>
              <p><strong>Passenger Name:</strong> {selectedBooking.passenger.fullName}</p>
              <p><strong>Email:</strong> {selectedBooking.passenger.email}</p>
              <p><strong>Driver Name:</strong> {selectedBooking.driver ? selectedBooking.driver.fullName : "Not Assigned"}</p>
              <p><strong>Vehicle Number:</strong> {selectedBooking.vehicle ? selectedBooking.vehicle.vehicleNumber : "Not Assigned"}</p>
              <p><strong>Pickup Location:</strong> {selectedBooking.pickupLocation}</p>
              <p><strong>Drop Location:</strong> {selectedBooking.dropLocation}</p>
              <p><strong>Duration:</strong> {selectedBooking.duration} minutes</p>
              <p><strong>Distance:</strong> {selectedBooking.distance} km</p>
              <p><strong>Cost:</strong> {selectedBooking.cost} LKR</p>
              <p><strong>Status:</strong> <span className={`badge badge-${selectedBooking.status === "completed" ? "success" : "danger"}`}>
              {selectedBooking.status}
            </span></p>
              <p><strong>Created At:</strong> {new Date(selectedBooking.createdAt).toLocaleString()}</p>

            </div>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleModal}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};

export default Booking;
