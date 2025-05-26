import React, { useState } from "react";

const NewUserForm = ({ onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    matricule: "",
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    password: "",
    dateNaissance: "",
    role: "Etudiant"
  });

  const [errors, setErrors] = useState({
    matricule: "",
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    password: "",
    dateNaissance: ""
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      matricule: "",
      prenom: "",
      nom: "",
      email: "",
      telephone: "",
      password: "",
      dateNaissance: ""
    };

    // Validation matricule
    if (!formData.matricule.trim()) {
      newErrors.matricule = "Le matricule est requis";
      isValid = false;
    }

    // Validation prénom
    if (!formData.prenom.trim()) {
      newErrors.prenom = "Le prénom est requis";
      isValid = false;
    } else if (formData.prenom.length < 2) {
      newErrors.prenom = "Le prénom doit contenir au moins 2 caractères";
      isValid = false;
    }

    // Validation nom
    if (!formData.nom.trim()) {
      newErrors.nom = "Le nom est requis";
      isValid = false;
    } else if (formData.nom.length < 2) {
      newErrors.nom = "Le nom doit contenir au moins 2 caractères";
      isValid = false;
    }

    // Validation email
    if (!formData.email.trim()) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Veuillez entrer un email valide";
      isValid = false;
    }

    // Validation téléphone
    if (!formData.telephone.trim()) {
      newErrors.telephone = "Le téléphone est requis";
      isValid = false;
    } else if (!/^[0-9]{10}$/.test(formData.telephone)) {
      newErrors.telephone = "Le téléphone doit contenir 10 chiffres";
      isValid = false;
    }

    // Validation mot de passe
    if (!formData.password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères";
      isValid = false;
    }

    // Validation date de naissance
    if (!formData.dateNaissance) {
      newErrors.dateNaissance = "La date de naissance est requise";
      isValid = false;
    } else {
      const birthDate = new Date(formData.dateNaissance);
      const currentDate = new Date();
      if (birthDate >= currentDate) {
        newErrors.dateNaissance = "La date de naissance doit être dans le passé";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Effacer l'erreur quand l'utilisateur commence à taper
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      console.log("Formulaire soumis:", formData);
      onSuccess();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        

        <div>
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            placeholder="Prénom"
            className={`mt-1 block w-full px-3 py-2 border ${errors.prenom ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#679294]`}
          />
          {errors.prenom && <p className="mt-1 text-sm text-red-600">{errors.prenom}</p>}
        </div>

        <div>
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            placeholder="Nom"
            className={`mt-1 block w-full px-3 py-2 border ${errors.nom ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#679294]`}
          />
          {errors.nom && <p className="mt-1 text-sm text-red-600">{errors.nom}</p>}
        </div>

        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`mt-1 block w-full px-3 py-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#679294]`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>

        <div>
          <input
            type="tel"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="Téléphone (ex: 0612345678)"
            className={`mt-1 block w-full px-3 py-2 border ${errors.telephone ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#679294]`}
          />
          {errors.telephone && <p className="mt-1 text-sm text-red-600">{errors.telephone}</p>}
        </div>

        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mot de passe"
            className={`mt-1 block w-full px-3 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#679294]`}
          />
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>

        <div>
          <input
            type="date"
            name="dateNaissance"
            value={formData.dateNaissance}
            onChange={handleChange}
            className={`mt-1 block w-full px-3 py-2 border ${errors.dateNaissance ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#679294]`}
          />
          {errors.dateNaissance && <p className="mt-1 text-sm text-red-600">{errors.dateNaissance}</p>}
        </div>

        <div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#679294]"
          >
            <option value="Etudiant">Étudiant</option>
            <option value="Directeur">Directeur</option>
            <option value="ATS">ATS</option>
            <option value="Medecin">Médecin</option>
          </select>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-[#679294]"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-[#679294] rounded-md hover:bg-[#5a7e80] focus:outline-none focus:ring-1 focus:ring-[#679294]"
          >
            Ajouter
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewUserForm;