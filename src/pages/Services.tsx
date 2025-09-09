import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  CheckCircle,
  ArrowRight,
  Send,
  Plus,
  Trash2,
  Sparkles,
  Zap,
  Star,
  Link,
} from "lucide-react";
import axios from "axios";

interface Service {
  id: number;
  _id?: string;
  name: string;
  description: string;
  fields: FormField[];
}

interface FormField {
  name: string;
  label: string;
  type: string;
  required: boolean;
  options?: string[];
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showAddService, setShowAddService] = useState(false);
  const [newService, setNewService] = useState({ name: "", description: "" });
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const { user, token } = useAuth();
  // axios.defaults.baseURL =
  //   import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  // axios.defaults.withCredentials = true;

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/services`);
      if (response.ok) {
        const data = await response.json();
        setServices(data);
      } else {
        console.error("Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    selectedService?.fields.forEach((field) => {
      if (
        field.required &&
        (!formData[field.name] || formData[field.name].toString().trim() === "")
      ) {
        errors[field.name] = `${field.label} is required`;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    if (formErrors[fieldName]) {
      setFormErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !token || !selectedService) {
      alert("Please log in to submit a service request");
      return;
    }

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      console.log("Submitting form data:", selectedService);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/service-requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          serviceId: selectedService._id,
          formData: formData,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({});
        setTimeout(() => {
          setSubmitSuccess(false);
          setSelectedService(null);
        }, 3000);
      } else {
        const errorData = await response.json();
        alert(errorData.error || "Error submitting request. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting service request:", error);
      alert("Error submitting request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const addNewService = () => {
    if (!newService.name.trim() || !newService.description.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Only allow admin to add services
    if (!user || user.role !== "admin") {
      alert("Only administrators can add services");
      return;
    }

    // Send request to backend
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/services`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newService.name,
        description: newService.description,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setServices([data, ...services]);
          setNewService({ name: "", description: "" });
          setShowAddService(false);
        }
      })
      .catch((error) => {
        console.error("Error adding service:", error);
        alert("Error adding service");
      });
  };

  const deleteService = (serviceId: string | undefined) => {
    // Only allow admin to delete services
    if (!user || user.role !== "admin") {
      alert("Only administrators can delete services");
      return;
    }

    if (!serviceId) {
      alert("Invalid service ID");
      return;
    }

    if (confirm("Are you sure you want to delete this service?")) {
      fetch(`/api/services/${serviceId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            alert(data.error);
          } else {
            setServices(
              services.filter((s) => String(s._id) !== String(serviceId))
            );
          }
        })
        .catch((error) => {
          console.error("Error deleting service:", error);
          alert("Error deleting service");
        });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-700 to-emerald-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/10 rounded-full blur-2xl animate-spin-slow"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="particle absolute top-32 left-32 w-2 h-2 bg-white/30 rounded-full"></div>
          <div className="particle absolute top-48 right-48 w-1 h-1 bg-blue-300/40 rounded-full"></div>
          <div className="particle absolute bottom-40 left-1/4 w-3 h-3 bg-purple-300/30 rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <div className="flex justify-center mb-8">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <Zap className="h-12 w-12 text-yellow-400 animate-pulse" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-black mb-8">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto font-medium leading-relaxed">
              Comprehensive digital marketing solutions designed to accelerate
              your business growth and maximize your online presence.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!selectedService ? (
            <>
              <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-4">
                <div className="text-center md:text-left">
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
                    Choose Your Service
                  </h2>
                  <p className="text-xl text-gray-600 font-medium">
                    Select a service to get started with your customized
                    marketing strategy
                  </p>
                </div>
                {user && user.role === "admin" && (
                  <button
                    onClick={() => setShowAddService(true)}
                    className="btn-interactive bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center"
                  >
                    <Plus className="h-5 w-5 mr-3 animate-pulse" />
                    Add Service
                  </button>
                )}
              </div>

              {/* Add Service Form */}
              {showAddService && (
                <div className="glass-effect-strong rounded-2xl shadow-2xl p-8 mb-12 border border-white/30">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Star className="h-6 w-6 mr-3 text-purple-600 animate-spin-slow" />
                    Add New Service
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Service Name"
                      value={newService.name}
                      onChange={(e) =>
                        setNewService({ ...newService, name: e.target.value })
                      }
                      className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    />
                    <input
                      type="text"
                      placeholder="Service Description"
                      value={newService.description}
                      onChange={(e) =>
                        setNewService({
                          ...newService,
                          description: e.target.value,
                        })
                      }
                      className="px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={addNewService}
                      className="btn-interactive bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                    >
                      Add Service
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddService(false)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-10">
                {services.map((service) => (
                  <div
                    key={service._id}
                    className="group card-interactive bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-purple-200 relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>

                    <div className="p-10 relative z-10">
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                            <Sparkles className="h-6 w-6 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors duration-300">
                            {service.name}
                          </h3>
                        </div>
                        {user && user.role === "admin" && (
                          <button
                            onClick={() => deleteService(service._id)}
                            className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300 hover:scale-110"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        )}
                      </div>

                      <p className="text-gray-600 mb-8 leading-relaxed relative z-10 group-hover:text-gray-700 transition-colors duration-300 text-lg">
                        {service.description}
                      </p>

                      <div className="mb-10 relative z-10">
                        <h4 className="font-bold text-gray-900 mb-4 text-lg">
                          What we'll need:
                        </h4>
                        <ul className="space-y-3">
                          {service.fields
                            .slice(0, 3)
                            .map((field: any, index: number) => (
                              <li
                                key={index}
                                className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300 font-medium"
                              >
                                <CheckCircle className="h-5 w-5 text-emerald-500 mr-4 flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                                {field.label}
                              </li>
                            ))}
                          {service.fields.length > 3 && (
                            <li className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors duration-300 font-medium ml-9">
                              +{service.fields.length - 3} more fields
                            </li>
                          )}
                        </ul>
                      </div>

                      <button
                        onClick={() => setSelectedService(service)}
                        className="w-full btn-interactive bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-5 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center group relative z-10 overflow-hidden"
                      >
                        <Zap className="mr-3 h-5 w-5 animate-pulse" />
                        <span className="relative z-10">Get Started Now</span>
                        <ArrowRight className="ml-3 h-5 w-5 relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {services.length === 0 && (
                <div className="text-center py-16">
                  <div className="glass-effect-strong rounded-3xl shadow-2xl p-16 border border-white/30">
                    <div className="text-gray-400 mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto">
                        <CheckCircle className="h-10 w-10" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      No Services Available
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      Start by adding your first service offering.
                    </p>
                    <button
                      onClick={() => setShowAddService(true)}
                      className="btn-interactive bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      Add First Service
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="max-w-2xl mx-auto">
              <div className="glass-effect-strong rounded-3xl shadow-2xl p-10 border border-white/30">
                <div className="text-center mb-10">
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                      <Star className="h-8 w-8 text-white animate-spin-slow" />
                    </div>
                  </div>

                  <h2 className="text-4xl font-black text-gray-900 mb-4">
                    {selectedService.name}
                  </h2>
                  <p className="text-gray-600 text-lg font-medium">
                    {selectedService.description}
                  </p>
                </div>

                {submitSuccess ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-10 w-10 text-white" />
                    </div>
                    <h3 className="text-3xl font-black text-gray-900 mb-4">
                      Request Submitted!
                    </h3>
                    <p className="text-gray-600 mb-8 text-lg">
                      We'll review your request and get back to you within 24
                      hours.
                    </p>
                    <button
                      onClick={() => setSelectedService(null)}
                      className="btn-interactive bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    >
                      Browse Other Services
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
                    {selectedService.fields.map((field, index) => (
                      <div key={index}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 ml-1">*</span>
                          )}
                        </label>

                        {field.type === "select" && field.options ? (
                          <select
                            value={formData[field.name] || ""}
                            onChange={(e) =>
                              handleInputChange(field.name, e.target.value)
                            }
                            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                          >
                            <option value="">Select {field.label}</option>
                            {field.options.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : field.type === "textarea" ? (
                          <textarea
                            value={formData[field.name] || ""}
                            onChange={(e) =>
                              handleInputChange(field.name, e.target.value)
                            }
                            rows={4}
                            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        ) : (
                          <input
                            type={field.type}
                            value={formData[field.name] || ""}
                            onChange={(e) =>
                              handleInputChange(field.name, e.target.value)
                            }
                            className="w-full px-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 hover:border-purple-300"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        )}

                        {formErrors[field.name] && (
                          <p className="text-red-500 text-sm mt-1">
                            {formErrors[field.name]}
                          </p>
                        )}
                      </div>
                    ))}

                    {!user && (
                      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                        <p className="text-yellow-800 font-medium">
                          Please{" "}
                          <Link
                            to="/login"
                            className="text-blue-600 hover:underline font-medium"
                          >
                            sign in
                          </Link>{" "}
                          to submit a service request.
                        </p>
                      </div>
                    )}

                    <div className="flex gap-4 pt-6">
                      <button
                        type="button"
                        onClick={() => setSelectedService(null)}
                        className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105"
                      >
                        Back to Services
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting || !user}
                        className="flex-1 btn-interactive bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                        ) : (
                          <>
                            <Sparkles className="mr-3 h-5 w-5 animate-pulse" />
                            Submit Request
                            <Send className="ml-3 h-5 w-5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Services;
