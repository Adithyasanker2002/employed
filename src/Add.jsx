import React, { useState } from 'react';

import { uploadEmployeeAPI } from './services/allApi.js';
import { TextField, Button, MenuItem, FormControl, FormLabel, Input } from '@mui/material';



const Add = () => {
  
  const [id, setId] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("active");


  const [isIdValid, setIsIdValid] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isStatusValid, setIsStatusValid] = useState(true);

  const [isFormValid, setIsFormValid] = useState(false);


  const userInputValidation = (inputData) => {
    const { name, value } = inputData;

    if (name === "id") {
      setId(value);
    
      setIsIdValid(/^\d+$/.test(value));
    } else if (name === "userName") {
      setUserName(value);
    
      setIsUserNameValid(/^[a-zA-Z\s]+$/.test(value));
    } else if (name === "email") {
      setEmail(value);

      setIsEmailValid(/\S+@\S+\.\S+/.test(value));
    }
    
    checkFormValidity();
  };

  const checkFormValidity = () => {

    if (
      id && isIdValid &&
      userName && isUserNameValid &&
      email && isEmailValid &&
      status
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleReset = () => {
    setId("");
    setUserName("");
    setEmail("");
    setStatus("active");

    setIsIdValid(true);
    setIsUserNameValid(true);
    setIsEmailValid(true);
    setIsStatusValid(true);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (isFormValid) {
      const employeeDetails={id,userName,email,status}
      try
      {
        const response= await uploadEmployeeAPI(employeeDetails)
        console.log("Employee Added: ",response.data);
        
      alert("Employee added successfully!");
      handleReset();
      }
      catch(error)
      {
        console.error("Error uploading employee:", error);
        alert("Error adding employee. Please try again.");
      }
    } else {
      alert("Please fill in all required fields correctly.");
    }
  };

  return (
    <div  style={{ maxWidth: '500px', margin: '2rem auto'  }}>
      <div className="shadow p-4 " style={{ borderRadius: '8px', backgroundColor: 'rgb(124 58 237)' }}>
        <h1 style={{ textAlign: 'center ', color:'white' }}>Add Employee</h1>
        <form>
          <div className='mb-3'>
            <TextField
              name='id'
              onChange={e => userInputValidation(e.target)}
              value={id}
              className='w-100'
              label="EmpID"
              variant="outlined"
              placeholder='EmpID'
              sx={{
                "input::placeholder": {
                  color: "white",
                  opacity: 1,
                  
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px dotted white"
                },
      
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: "1px solid red"
                  }
                }
              }}
            />
            {!isIdValid && <div className='text-danger'>*ID must be a number</div>}
          </div>

          <div className='mb-3'>
            <TextField
              name='userName'
              onChange={e => userInputValidation(e.target)}
              value={userName}
              className='w-100'
               placeholder="Username"
               label='Username'
              variant="outlined"
              inputProps ={{ style: { color: "white" } }}
              sx={{
                "input::placeholder": {
                  color: "white",
                  opacity: 1,
                  
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px dotted white"
                },
      
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: "1px solid red"
                  }
                }
              }}
            
            />
            {!isUserNameValid && <div className='text-danger'>*Invalid User Name (letters and spaces only)</div>}
          </div>

          <div className='mb-3'>
            <TextField
              name='email'
              onChange={e => userInputValidation(e.target)}
              value={email}
              className='w-100'
              type='email'
              label="Email"
              variant="outlined"
              placeholder="Email"
            
         
             inputProps ={{ style: { color: "white" } }}
             sx={{
               "input::placeholder": {
                 color: "white",
                 opacity: 1,
                 
               },
               "& .MuiOutlinedInput-notchedOutline": {
                 border: "2px dotted white"
               },
     
               "& .MuiOutlinedInput-root": {
                 "&.Mui-focused fieldset": {
                   border: "1px solid red"
                 }
               }
             }}
           
            />
            {!isEmailValid && <div className='text-danger'>*Valid Email is Required</div>}
          </div>

          <div className='mb-3'>
            <FormControl fullWidth>
              <FormLabel>Status</FormLabel>
              <TextField  placeholder="Status"
              
              variant="outlined"
              inputProps ={{ style: { color: "white" } }}
              sx={{
                "input::placeholder": {
                  color: "white",
                  opacity: 1,
                  
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "2px dotted white"
                },
      
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    border: "1px solid red"
                  }
                }
              }}
            
                select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
            
                  setIsStatusValid(true); 
                  checkFormValidity();
                
                }}
                className='w-100'
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </FormControl>
          </div>

          <div className='mb-3 text-center'>
            <Button onClick={handleSubmit} disabled={!isFormValid} style={{ width: '150px', height: '50px', marginRight: '20px', backgroundColor: isFormValid ? 'black' : 'grey' }} variant="contained">
              Add Employee
            </Button>
            <Button onClick={handleReset} style={{ width: '150px', height: '50px', backgroundColor: 'black' }} variant="contained">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add;