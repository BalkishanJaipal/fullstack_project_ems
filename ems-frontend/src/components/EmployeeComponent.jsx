import React, { useEffect, useState } from "react";
import { createEmployee, getEmployeeById, updateEmployee } from "../services/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const { id } = useParams();

  const navigator = useNavigate();

  useEffect(()=>{
      if(id){
        getEmployeeById(id).then((response)=>{
           // console.log(response.data);
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
        }).catch(error =>{
            console.log(error);
        });
      }
  },[])

  const formValidation = () => {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      valid = false;
      errorsCopy.firstName = "First Name is required";
    }

    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      valid = false;
      errorsCopy.lastName = "Last Name is required";
    }

    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      valid = false;
      errorsCopy.email = "Email is required";
    }

    setErrors(errorsCopy);

    return valid;
  };

  const saveEmployee = (e) => {
    e.preventDefault();
    if (formValidation()) {
      const employee = {
        firstName,
        lastName,
        email,
      };
      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
        }).catch(error =>{
            console.log(error);
        });
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
        }).catch(error =>{
            console.log(error);
        });;
      }

      navigator("/");
    } else {
      console.log("fill required information");
    }
  };

  const pageTitle = () => {
    if (id) {
      return <h3 className="text-center mt-3">Update Employee</h3>;
    } else {
      return <h3 className="text-center mt-3">Add Employee</h3>;
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card col-md-6">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-3">
                <label className="form-label">First Name:</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  name="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter Employee First Name"
                />
                {errors.firstName && (
                  <div className="invalid-feedback"> {errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Last Name:</label>
                <input
                  type="text"
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter Employee Last Name"
                />
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.lastName}</div>
                )}
              </div>
              <div className="form-group mb-3">
                <label className="form-label">Email:</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Employee Email"
                />
                {errors.email && (
                  <div className="invalid-feedback"> {errors.email}</div>
                )}
              </div>
              <button className="btn btn-success w-100" onClick={saveEmployee}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
