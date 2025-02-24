import { useState, useEffect } from "react";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    // Fetch ads from backend (Placeholder for now)
    // Replace with actual API endpoint later
    setAds(new Array(6).fill({
      title: "Untitled Ad",
      description: "No description available.",
      price: "N/A"
    }));
  }, []);

  const handleExploreMore = () => {
    if (!isLoggedIn) {
      alert("Please register or log in to view more ads");
    } else {
      alert("Loading more ads...");
    }
  };

  return (
    <div className="flex flex-col items-center text-center p-10 gap-10">
      {/* Hero Section */}
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-black">Welcome to AdLinker</h1>
        <p className="text-lg text-gray-700 mt-3">
          A platform where you can monetize your spaces by connecting with advertisers.
        </p>
      </div>

      {/* Showcase Cards Section */}
      <div className="w-full px-4 sm:px-8 lg:px-12 mt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ads.map((ad, index) => (
            <div
              key={index}
              className="card shadow-lg rounded-3xl overflow-hidden transform hover:scale-105 transition-all duration-300"
              style={{
                width: "100%",  // Ensure card uses full width of column
                height: "auto", // Allow flexible card height
                borderRadius: "20px", // Increase border-radius for larger effect
              }}
            >
              {/* Empty Image Space */}
              <div className="h-64 bg-gray-200 mb-4"></div> {/* Increased image space */}
              <div className="card-body px-6 py-4">
                <h3 className="text-2xl font-semibold">{ad.title || "Untitled Ad"}</h3>
                <p className="text-gray-600 mt-3">{ad.description || "No description available."}</p>
                <p className="text-xl font-bold mt-3">${ad.price || "N/A"}/month</p>
                <button 
                  type="button"
                  className="w-full bg-black text-white py-3 mt-6 rounded-lg text-base hover:bg-gray-800 transition-all"
                  onClick={() => alert("Please login to view more details")}
                >
                  More Info
                </button>
              </div>
            </div>
          ))}

          {/* Explore More Button */}
          <div className="flex justify-center mt-8 col-span-1 sm:col-span-2 lg:col-span-3">
            <button 
              type="button"
              className="bg-black text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-800 transition-all"
              onClick={handleExploreMore}
            >
              Explore More Ads
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
