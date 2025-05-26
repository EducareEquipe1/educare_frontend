import React, { useState } from "react";

const NewUserForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    matricule: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    birth_date: ""
  });

  const [errors, setErrors] = useState({
    matricule: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    birth_date: ""
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      matricule: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      birth_date: ""
    };

    if (!formData.matricule.trim()) {
      newErrors.matricule = "Le matricule est requis";
      isValid = false;
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = "Le prénom est requis";
      isValid = false;
    } else if (formData.first_name.length < 2) {
      newErrors.first_name = "Le prénom doit contenir au moins 2 caractères";
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Le nom est requis";
      isValid = false;
    } else if (formData.last_name.length < 2) {
      newErrors.last_name = "Le nom doit contenir au moins 2 caractères";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide";
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Le téléphone est requis";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Le téléphone doit contenir 10 chiffres";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }

    if (!formData.birth_date) {
      newErrors.birth_date = "La date de naissance est requise";
      isValid = false;
    } else {
      const birthDate = new Date(formData.birth_date);
      const currentDate = new Date();
      if (birthDate >= currentDate) {
        newErrors.birth_date = "La date de naissance doit être dans le passé";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
     const token = localStorage.getItem("token"); // or pass it via props/context

  if (!token) {
    alert("Token d'authentification manquant. Veuillez vous connecter.");
    return;
  }

  try {
    const response = await fetch("https://educare-backend-l6ue.onrender.com/medecins/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(formData)
    });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur lors de l'inscription:", errorData);
        alert("Échec de l'inscription: " + (errorData.message || "Erreur inconnue"));
        return;
      }

      const result = await response.json();
      console.log("Inscription réussie:", result);
      alert("Utilisateur ajouté avec succès !");
      onSuccess();
    } catch (error) {
      console.error("Erreur réseau:", error);
      alert("Erreur réseau: impossible d'inscrire l'utilisateur");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="matricule"
            value={formData.matricule}
            onChange={handleChange}
            placeholder="Matricule"
            className={`mt-1 block w-full px-3 py-2 border ${errors.matricule ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {errors.matricule && <p className="text-sm text-red-600">{errors.matricule}</p>}
        </div>

        <div>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Prénom"
            className={`mt-1 block w-full px-3 py-2 border ${errors.first_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {errors.first_name && <p className="text-sm text-red-600">{errors.first_name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            placeholder="Nom"
            className={`mt-1 block w-full px-3 py-2 border ${errors.last_name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {errors.last_name && <p className="text-sm text-red-600">{errors.last_name}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Téléphone"
            className={`mt-1 block w-full px-3 py-2 border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
        </div>

        <div>
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${errors.birth_date ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm`}
          />
          {errors.birth_date && <p className="text-sm text-red-600">{errors.birth_date}</p>}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[#679294] rounded-md hover:bg-[#5a7e80]"
        >
          Ajouter
        </button>
      </div>
    </form>
  );
};

export default NewUserForm;
