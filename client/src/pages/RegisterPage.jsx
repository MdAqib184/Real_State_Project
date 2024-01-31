import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import "../styles/Register.scss";

const RegisterPage = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profileImage: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
          ...formData,
          [name]: value,
          [name]: name === "profileImage" ? files[0] : value,
        });
      };
    
      const [passwordMatch, setPasswordMatch] = useState(true)
    
      useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "");
      }, [formData.password, formData.confirmPassword, setPasswordMatch]);
      
    
      const navigate = useNavigate()
    
      const handleSubmit = async (e) => {
        e.preventDefault()
    
        try {
          const register_form = new FormData()
    
          for (var key in formData) {
            register_form.append(key, formData[key])
          }
    
          const response = await fetch("http://localhost:3001/auth/register", {
            method: "POST",
            body: register_form
          })
    
          if (response.ok) {
            navigate("/login")
          }
        } catch (err) {
          console.log("Registration failed", err.message)
        }
      }
    
  
  return (
    <div className='register'>
      <div className='register_content'>
        <form className='register_content_form' onSubmit={handleSubmit}> 
            <input 
                placeholder='First Name' name='firstName' required 
                value={formData.firstName} onChange={handleChange}
            />
            <input 
                placeholder='Last Name' name='lastName' required 
                value={formData.lastName} onChange={handleChange}
            />
            <input 
                type='email' placeholder='Email Id' name='email' required 
                value={formData.email} onChange={handleChange}
            />
            <input 
                type='password' placeholder='Password' name='password' required 
                value={formData.password} onChange={handleChange}
            />
            <input 
                type='password' placeholder='Confirm Password' name='confirmPassword' required 
                value={formData.confirmPassword} onChange={handleChange}
            />
            {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords are not matched!</p>
            )}
            <input 
                id='image' type="file" name='profileImage' style={{display: "none"}} 
                accept='image/*' required onChange={handleChange}
            />
            <label htmlFor="image">
                <img src="/assets/add.png" alt="add profile pic" />
                <p>Upload Profile Photo</p>
            </label>
            {formData.profileImage &&(
                <img src={URL.createObjectURL(formData.profileImage)} alt="Profile Img" 
                style={{maxWidth: "80px"}}
                />
            )}
            <button type='submit'>REGISTER</button>
        </form>
        <a href="/login">Already have an account? Sign in here</a>
      </div>
    </div>
  )
}

export default RegisterPage
