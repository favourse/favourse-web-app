import { useEffect, useState } from "react";
import { initJuno, getDoc } from "@junobuild/core";
// import { useParams } from "react-router-dom"; // Import useParams to get the canisterId from URL

export const EventDetailPage = () => {
  const [document, setDocument] = useState(null);
  //   const { canisterId } = useParams(); // Retrieve the canisterId from the URL

  initJuno({
    satelliteId: "4knjt-tiaaa-aaaal-adenq-cai",
  });

  useEffect(() => {
    // This function fetches a single document using its canisterId
    const fetchDocument = async () => {
      try {
        const doc = await getDoc({
          collection: "favourse99", // Use the correct collection name
          key: "123",
        });
        console.log(doc);
        if (doc) {
          setDocument(doc);
        } else {
          throw new Error("Document not found");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setDocument(null);
      }
    };

    fetchDocument();
  }, []); // Depend on user and canisterId

  // Return UI elements to display the document
  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-8">
      <header className="px-5 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-gray-800">Document Details</h2>
      </header>
      <div className="p-3">
        {document ? (
          <div className="overflow-x-auto">
            <div className="flex items-center gap-6 px-2.5 py-1.5">
              {/* Replace the content below with the actual content of your document */}
              <div className="line-clamp-3 text-left grow">
                {document.data.name}
              </div>
              {/* ... other fields from your document */}
            </div>
          </div>
        ) : (
          <p>No document found</p>
        )}
      </div>
    </div>
  );
};
