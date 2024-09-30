import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ImageUploader from "../../utils/ImageUploader";

const AddPassenger = () => {

  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [nic, setNationalID] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [imageUrls, setImageUrl] = useState([]);

  const handleImageUrlChange = (newImageUrl) => {
    setImageUrl(newImageUrl);
  }

  useEffect(() => {
    if(id){
      axios.get(`http://localhost:3000/api/v1/passenger/getPassenger/${id}`)
      .then((response) => {
        const data = response.data.message;
        setEmail(data.email);
        setFullName(data.fullName);
        setNationalID(data.nic);
        setPhoneNumber(data.phone);
        setAddress(data.address);
        setImageUrl(data.profileImage);
        setDate(data.createdAt);
      })
      .catch((error) => {
        toast.error("Error fetching passenger: " + error);
      });
    }
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const response = await axios.post("http://localhost:3000/api/v1/passenger/register", {
        fullname,
        email,
        nic,
        phone,
        address,
        profileImage: imageUrls,
        adminID:"1",
        registeredby: true,
      });
      if (response.status === 200) {
        setIsloading(false);
        toast.success("Passenger added successfully");
        setEmail("");
        setFullName("");
        setNationalID("");
        setPhoneNumber("");
        setAddress("");
        setImageUrl([]);
      }
    } catch (error) {
      setIsloading(false);
      toast.error("Error adding passenger: " + error);
    }
  };

  const onEdit = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/passenger/updatePassenger/${id}`,
        {
          fullname,
          email,
          nic,
          phone,
          address,
          profileImage: imageUrls,
          adminID:"1",
          registeredby: true,
        }
      );
      if (response.status === 200) {
        setIsloading(false);
        toast.success("Passenger updated successfully");
        setEmail("");
        setFullName("");
        setNationalID("");
        setPhoneNumber("");
        setAddress("");
        setImageUrl([]);
      }
    } catch (error) {
      setIsloading(false);
      toast.error("Error updating passenger: " + error);
    }
  };

  return (
    <div className="card shadow" style={{ marginBottom: "250px" }}>
      <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
        <Link to="/dashboard/passengers">
          <i className="fas fa-arrow-left"></i>{" "}
        </Link>
        <h6 className="m-0 font-weight-bold text-primary">
          {id ? "Update Passenger" : "Add new Passenger"}
        </h6>
        <div>{""}</div>
      </div>
      <div className="card-body">
        <div>
          <div className="row mb-4">
            <div className="col">
              <label className="form-label" htmlFor="">
                Profile Picture
              </label>
              <ImageUploader onImageUrlChange={handleImageUrlChange}/>
            </div>
          </div>
          <form>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example6">
                    Email Address
                  </label>
                  <input
                    type="text"
                    id="form6Example6"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example7">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="form6Example7"
                    className="form-control"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example6">
                    National ID Number / Passport Number
                  </label>
                  <input
                    type="text"
                    id="form6Example6"
                    className="form-control"
                    value={nic}
                    onChange={(e) => setNationalID(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example7">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="form6Example7"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example7">
                    Address
                  </label>
                  <input
                    type="text"
                    id="form6Example7"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example7">
                    Last Updated At
                  </label>
                  <input
                    type="text"
                    id="form6Example7"
                    className="form-control"
                    value={new Date(date).toLocaleString()}
                    disabled={true}
                  />
                </div>
              </div>
            </div>

            <button
              data-mdb-ripple-init
              type="button"
              className={
                isloading
                  ? "btn btn-primary btn-block disabled"
                  : "btn btn-primary btn-block"
              }
              onClick={
                id
                  ? (e) => {
                      onEdit(e);
                    }
                  : (e) => {
                      onSubmit(e);
                    }
              }
            >
              {isloading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Save Passenger"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPassenger;
