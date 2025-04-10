import React, { useState, useEffect } from "react";
import Oneuser from "./Oneuser";
import { FaPlus } from "react-icons/fa6";

const DisplayUsers = () => {
  const [patients, setPatients] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    dob: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  const adminToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImVtYWlsIjoibmkubWVyem91a0Blc2ktc2JhLmR6IiwiaWF0IjoxNzQ0MDM2ODMyLCJleHAiOjE3NDY2Mjg4MzJ9.GbF_0vPxlAfPuh7V6RcDiZ3o5iSKxRcMcmwnS5lTyU4";

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "https://educare-backend-l6ue.onrender.com/Admin/get-users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setPatients(data.utilisateurs || []);
      console.log("Users fetched:", data.utilisateurs || []);

    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Form validation
  const validateForm = () => {
    let newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (!formData.phone.match(/^0[567][0-9]{8}$/)) {
      newErrors.phone = "Phone must start with 05, 06, or 07 and be 10 digits";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.role) newErrors.role = "Please select a role";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(
        "https://educare-backend-l6ue.onrender.com/patients/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            birth_date: formData.dob,
            matricule: Math.floor(Math.random() * 1000000).toString(),
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error("Failed to add user");
      }

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        dob: "",
        role: "",
      });
      setAddOpen(false);
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formFields = [
    { name: "firstName", type: "text", placeholder: "First Name" },
    { name: "lastName", type: "text", placeholder: "Last Name" },
    { name: "email", type: "email", placeholder: "Email" },
    { name: "phone", type: "text", placeholder: "Phone Number" },
    { name: "password", type: "password", placeholder: "Password" },
    { name: "dob", type: "date", placeholder: "Date of Birth" },
  ];

  const dropdowns = [
    { name: "role", options: ["Role", "Medecin", "Directeur", "Aide-soignant"] },
  ];


  return (
    <div className="flex flex-col justify-end items-end bg-[#FFFEFE] mx-8 mb-6 rounded-[15px] border border-[#CACACA] shadow-md py-2 px-4">
      <div className="w-full grid grid--6 gap-2 items-center p-3 h-full">
        <div className="flex justify-between font-medium text-[#BBBBBF] border-b pb-2">
          <span className="md:w-[150px]">Matricule</span>
          <span className="md:w-[100px]">Name</span>
          <span className="md:w-[120px]">Email</span>
          <span className="md:w-[90px]">Role</span>
          <span className="md:w-[130px]">State</span>
          <span className="md:w-[100px]"></span>
        </div>

        <div className="max-h-[300px] min-h-[250px] flex flex-col overflow-y-auto">
          {loading ? (
            <p className="text-center text-gray-500">Loading users...</p>
          ) : patients.length > 0 ? (
            patients.map((user, index) => (
              <Oneuser
                key={index}
                matricule={user.matricule || "--"}
                first_name={user.prenom || ""}
                last_name={user.nom || ""}
                email={user.email}
                role={user.role}
                is_active={true} // Assuming all users are active
                onDelete={() => {}} // Placeholder if needed later
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No users found.</p>
          )}
        </div>
      </div>

      <button
        onClick={() => setAddOpen(true)}
        className="hover:bg-[linear-gradient(to_left,#2E3D40,transparent)] px-4 py-2 cursor-pointer shadow-md 
        flex justify-center items-center gap-2 bg-[#679294] md:px-4 rounded-[10px] text-white my-3"
      >
        <FaPlus />
        Add
      </button>

      {addOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.6)]"
          onClick={(e) => e.target === e.currentTarget && setAddOpen(false)}
        >
          <div className="bg-[#FFFEFE] rounded-[15px] p-8 shadow-lg">
            <h1 className="text-2xl text-[#679294] font-extrabold mb-4 text-center">
              Nouveau Utilisateur
            </h1>
            <form
              onSubmit={handleSubmit}
              className="max-h-[440px] overflow-y-auto flex flex-col w-[350px] my-2 space-y-2"
            >
              {formFields.map((field, index) => (
                <div key={index}>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleInputChange}
                    placeholder={field.placeholder}
                    className="border border-gray-400 p-2 rounded w-full"
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-[12px]">{errors[field.name]}</p>
                  )}
                </div>
              ))}

              {dropdowns.map((dropdown, index) => (
                <div key={index}>
                  <select
                    name={dropdown.name}
                    value={formData[dropdown.name]}
                    onChange={handleInputChange}
                    className="border border-gray-400 p-2 rounded w-full"
                  >
                    {dropdown.options.map((option, idx) => (
                      <option key={idx} value={idx === 0 ? "" : option} disabled={idx === 0}>
                        {option}
                      </option>
                    ))}
                  </select>
                  {errors[dropdown.name] && (
                    <p className="text-red-500 text-[12px]">{errors[dropdown.name]}</p>
                  )}
                </div>
              ))}

              <div className="flex justify-end gap-4">
                <button
                  type="submit"
                  className="bg-[#679294] w-full cursor-pointer hover:bg-[linear-gradient(to_left,#2E3D40,transparent)] px-4 py-2 rounded text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayUsers;
