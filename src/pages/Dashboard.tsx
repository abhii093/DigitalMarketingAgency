import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  Calendar,
  FileText,
  TrendingUp,
} from "lucide-react";
import axios from "axios";

interface ServiceRequest {
  id: number;
  service_name: string;
  form_data: any;
  status: string;
  created_at: string;
}

const Dashboard: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchServiceRequests();
  }, [user, token, navigate]);

  const fetchServiceRequests = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/my-requests`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      console.log("Marking as completed:", id);

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/requests/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "completed" }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with ${res.status}`);
      }

      const data = await res.json();
      console.log("Status update response:", data);

      fetchServiceRequests(); // refresh
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const isAdmin = user?.email === "admin@gmail.com";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white shadow-sm py-8">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center flex-col sm:flex-row gap-4 sm:gap-0">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600">
              {isAdmin
                ? "Manage all service requests"
                : "Track your service requests"}
            </p>
          </div>
          {!isAdmin && (
            <button
              onClick={() => navigate("/services")}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" /> New Request
            </button>
          )}
        </div>
      </section>

      {/* Requests */}
      <section className="py-12 max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            {isAdmin ? "All Service Requests" : "Your Service Requests"}
          </h2>

          {isLoading ? (
            <p className="text-gray-500 text-center">Loading requests...</p>
          ) : requests.length === 0 ? (
            <p className="text-gray-500 text-center">No requests found.</p>
          ) : (
            <div className="space-y-4">
              {requests.map((r: any) => (
                <div
                  key={r._id}
                  className="border rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0"
                >
                  {/* Request Info */}
                  <div className="flex-1">
                    <h3 className="font-semibold">
                      {r.service_id?.name || r.service_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Submitted {new Date(r.created_at).toLocaleDateString()}
                    </p>
                    {isAdmin && (
                      <p className="text-sm text-gray-700">
                        <strong>Client:</strong> {r.user_id?.name} (
                        {r.user_id?.email})
                      </p>
                    )}
                  </div>

                  {/* Status & Actions */}
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-3 space-y-2 md:space-y-0 mt-3 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </span>

                    {isAdmin && r.status !== "completed" && (
                      <button
                        onClick={() => handleComplete(r._id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap"
                      >
                        Send Quotation
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
