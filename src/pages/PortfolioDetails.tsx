import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PortfolioItem {
  _id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
  client: string;
  challenge?: string;
  strategy?: string;
  results?: string;
  created_at?: string;
}

const PortfolioDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<PortfolioItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setItem(data);
        }
      } catch (error) {
        console.error("Error fetching portfolio item:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Portfolio item not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-10 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <img
          src={item.image_url}
          alt={item.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-8">
          <Link
            to="/portfolio"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Portfolio
          </Link>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {item.title}
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            {item.description}
          </p>

          <div className="flex gap-6 text-gray-600 mb-8">
            <div>
              <span className="font-medium text-gray-900">Category:</span>{" "}
              {item.category}
            </div>
            <div>
              <span className="font-medium text-gray-900">Client:</span>{" "}
              {item.client}
            </div>
            {item.created_at && (
              <div>
                <span className="font-medium text-gray-900">Date:</span>{" "}
                {new Date(item.created_at).toLocaleDateString()}
              </div>
            )}
          </div>

          {/* Extended details */}
          <div className="space-y-6">
            {item.challenge && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Challenge
                </h2>
                <p className="text-gray-700">{item.challenge}</p>
              </div>
            )}
            {item.strategy && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Strategy
                </h2>
                <p className="text-gray-700">{item.strategy}</p>
              </div>
            )}
            {item.results && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Results
                </h2>
                <p className="text-gray-700">{item.results}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioDetails;
