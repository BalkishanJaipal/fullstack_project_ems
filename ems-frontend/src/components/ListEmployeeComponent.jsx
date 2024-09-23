import React, { useEffect, useState } from "react";
import { listEmployee, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, [employees]);

  const getAllEmployees = ()=>{
    listEmployee()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const addNewEmployee = ()=>{
     navigator("/add-employee")
  }

  const updateEmployee = (employeeId)=>{
    navigator(`/edit-employee/${employeeId}`)
  }

  const removeEmployee = (employeeId)=>{
    deleteEmployee(employeeId).then((response)=>{
      console.log("deleted successfully!");
      getAllEmployees();
    }).catch(error =>{
      console.log(error);
  });
  }

  return (
    <div className="container">
      <br />
      <h3 className="text-center">List of Employees</h3> 
      <button className="btn btn-primary .mt-10" onClick={addNewEmployee}>Add Employee</button>
      <br /> <br />
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col">Employee Id</th>
            <th scope="col">Employee First Name</th>
            <th scope="col">Employee Last Name</th>
            <th scope="col">Employee Email Id</th>
            <th scope="col" className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button className="btn btn-info margin-right" onClick={()=>updateEmployee(employee.id)}>Update</button>
                <button className="btn btn-danger" onClick={()=>removeEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
