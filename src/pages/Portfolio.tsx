import React, { useState, useEffect } from "react";
import { ExternalLink, Filter, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

interface PortfolioItem {
  _id: number;
  id: number;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client: string;
  created_at: string;
}

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isLoading, setIsLoading] = useState(true);
  const [showAddItem, setShowAddItem] = useState(false);
  // axios.defaults.baseURL =
  //   import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  // axios.defaults.withCredentials = true;
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "",
    client: "",
  });
  const { user, token } = useAuth();

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredItems(portfolioItems);
    } else {
      setFilteredItems(
        portfolioItems.filter((item) => item.category === selectedCategory)
      );
    }
  }, [portfolioItems, selectedCategory]);

  const fetchPortfolioItems = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio`
      );
      
      if (response.ok) {
        const data = await response.json();
        setPortfolioItems(data);
        setFilteredItems(data);
      }
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addNewItem = () => {
    if (
      !newItem.title.trim() ||
      !newItem.description.trim() ||
      !newItem.category.trim()
    ) {
      alert("Please fill in all required fields");
      return;
    }

    // Only allow admin to add portfolio items
    if (!user || user.role !== "admin") {
      alert("Only administrators can add portfolio items");
      return;
    }

    // Send request to backend
    fetch("/api/portfolio", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: newItem.title,
        description: newItem.description,
        image_url:
          newItem.image_url ||
          "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
        category: newItem.category,
        client: newItem.client || "Client Name",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setPortfolioItems([data, ...portfolioItems]);
          setNewItem({
            title: "",
            description: "",
            image_url: "",
            category: "",
            client: "",
          });
          setShowAddItem(false);
        }
      })
      .catch((error) => {
        console.error("Error adding portfolio item:", error);
        alert("Error adding portfolio item");
      });
  };

  const deleteItem = (itemId: number) => {
    // Only allow admin to delete portfolio items
    if (!user || user.role !== "admin") {
      alert("Only administrators can delete portfolio items");
      return;
    }

    if (confirm("Are you sure you want to delete this portfolio item?")) {
      fetch(`/api/portfolio/${itemId}`, {
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
            setPortfolioItems(
              portfolioItems.filter((item) => item._id !== itemId)
            );
          }
        })
        .catch((error) => {
          console.error("Error deleting portfolio item:", error);
          alert("Error deleting portfolio item");
        });
    }
  };

  const categories = [
    "All",
    ...Array.from(new Set(portfolioItems.map((item) => item.category))),
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Our Portfolio
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Explore our successful digital marketing campaigns and see how
              we've helped businesses achieve remarkable growth and measurable
              results.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Add Portfolio Item Button */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Our Work</h2>
            {user && user.role === "admin" && (
              <button
                onClick={() => setShowAddItem(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 flex items-center"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Portfolio Item
              </button>
            )}
          </div>

          {/* Add Portfolio Item Form */}
          {showAddItem && (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Add New Portfolio Item
              </h3>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Project Title *"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Category *"
                  value={newItem.category}
                  onChange={(e) =>
                    setNewItem({ ...newItem, category: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="Client Name"
                  value={newItem.client}
                  onChange={(e) =>
                    setNewItem({ ...newItem, client: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <input
                  type="url"
                  placeholder="Image URL (optional)"
                  value={newItem.image_url}
                  onChange={(e) =>
                    setNewItem({ ...newItem, image_url: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
              </div>
              <textarea
                placeholder="Project Description *"
                value={newItem.description}
                onChange={(e) =>
                  setNewItem({ ...newItem, description: e.target.value })
                }
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent mb-4"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={addNewItem}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Add Item
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddItem(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Filter className="h-5 w-5 text-gray-500 self-center mr-2" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-100 shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:scale-105 border border-gray-100 hover:border-blue-200"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image_url}
                    alt={item.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300 delay-100">
                      <ExternalLink className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 transform group-hover:scale-110 transition-transform duration-300">
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                      {item.category}
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    {user && user.role === "admin" && (
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300 hover:scale-110"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {item.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                        Client
                      </div>
                      <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {item.client}
                      </div>
                    </div>
                    <Link
                      to={`/portfolio/${item._id}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center group/btn bg-blue-50 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-300"
                    >
                      View Details
                      <ExternalLink className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-xl shadow-lg p-12">
                <div className="text-gray-400 mb-4">
                  <ExternalLink className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No Projects Found
                </h3>
                <p className="text-gray-600 mb-6">
                  {selectedCategory === "All"
                    ? "Start by adding your first portfolio item."
                    : `No projects found in the "${selectedCategory}" category.`}
                </p>
                {selectedCategory === "All" && (
                  <button
                    onClick={() => setShowAddItem(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                  >
                    Add First Project
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Proven Track Record
            </h2>
            <p className="text-xl text-gray-600">
              Our results speak for themselves
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-4xl font-bold text-blue-600 mb-2">300%</div>
              <div className="text-gray-700 font-medium">
                Average ROI Increase
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                2M+
              </div>
              <div className="text-gray-700 font-medium">Leads Generated</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                50M+
              </div>
              <div className="text-gray-700 font-medium">
                Impressions Delivered
              </div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
              <div className="text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-700 font-medium">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to See Similar Results?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's create a success story for your business. Start your digital
            marketing journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/services"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200 hover:scale-105"
            >
              Start Your Project
            </Link>
            <Link
              to="/contact"
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-200"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
