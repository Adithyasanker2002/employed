import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmployeeByIdAPI, updateEmployeeAPI } from './services/allApi.js';
import { TextField, Button, MenuItem, FormControl, InputLabel  } from '@mui/material';



const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    userName: '',
    email: '',
    status: 'active',
  });
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await getEmployeeByIdAPI(id);
        const fetchedEmployee = response.data; 
        
        console.log(fetchedEmployee); 
        

        

        if (fetchedEmployee) {
          setEmployee({
            userName: fetchedEmployee.userName || '',
            email: fetchedEmployee.email || '',
            status: fetchedEmployee.status === 'inactive' ? 'inactive' : 'active',
          });
        } else {
          setError('Employee not found');
        }
      } catch (err) {
        setError('Error fetching employee details');
        console.error('Error:', err);
      }
    };

    fetchEmployee();
  }, [id]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { userName, email } = employee;

  
    if (!userName || !email) {
      setError('Please fill out all required fields');
      return;
    }

    try {
      await updateEmployeeAPI(id, employee);
      alert('Employee updated successfully!');
      navigate('/home');
    } catch (err) {
      setError('Error updating employee');
      console.error('Error:', err);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <div className="shadow p-4" style={{ borderRadius: '8px', backgroundColor: 'rgb(124 58 237)' }}>
        <h1 style={{ textAlign: 'center',color:'white' }}>Edit Employee</h1>

      
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <TextField
              name='userName'
              label="User Name"
              fullWidth
              margin="normal"
              value={employee.userName} 
              onChange={handleChange}
              variant="outlined"
            />
          </div>

          <div className='mb-3'>
            <TextField
              name='email'
              label="Email"
              type='email'
              fullWidth
              margin="normal"
              value={employee.email}
              onChange={handleChange}
              variant="outlined"
            />
          </div>

          <div className='mb-3'>
            <FormControl fullWidth margin="normal">
              <TextField
                select
                name='status'
                value={employee.status} 
                onChange={handleChange}
                variant="outlined"
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </FormControl>
          </div>

          <div className='mb-3 text-center'>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              style={{ width: '150px', height: '50px', marginRight: '20px', backgroundColor: 'black' }}
            >
              Update Employee
            </Button>
            <Button 
              type="button" 
              variant="contained" 
              style={{ width: '150px', height: '50px', backgroundColor: 'black' }}
              onClick={() => navigate('/home')}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;