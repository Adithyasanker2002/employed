import React,{useEffect, useState} from 'react';
import { getEmployeeAPI,deleteEmployeeAPI } from './services/allApi';
import { useNavigate } from 'react-router-dom';


const Home = () => {
  const navigate=useNavigate()
  const [employees, setEmployees] = useState([]);

  useEffect(()=>{fetchEmployees()},[])

  const fetchEmployees  = async () => {
    try {
      const response = await getEmployeeAPI()
   
      setEmployees(response.data)
    }
    catch (err) {

    }
  }

  const  handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await deleteEmployeeAPI(id);
        alert("Employee deleted successfully");
      
        fetchEmployees();
      } catch (err) {
        console.error("Error deleting employee:", err);
        alert("Failed to delete employee");
      }
    }
  }

  return (
    <div className="container mt-4 fs-5">
      <h2 className="text-center mb-4 fw-bolder">Employee List</h2>
      <table className="table table-striped ">
        <thead>
          <tr>
            <th>ID</th>
            <th>User Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th> 
          </tr>
        </thead>
        <tbody>
        {employees?.length > 0 ? (
            employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.userName}</td>
                <td>{employee.email}</td>
                <td>{employee.status}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${employee.id}`)} className="btn btn-success me-2">Edit</button>
                  <button onClick={()=>handleDelete(employee.id)} className="btn btn-danger">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No Employees Found</td>
            </tr>
          )}
          
        </tbody>
      </table>
    </div>
  );
};

export default Home;