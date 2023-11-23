import { useEffect, useState } from "react";
import { initJuno, getDoc } from "@junobuild/core";
// import { useParams } from "react-router-dom";

export const EventDetailPage = () => {
  const [document, setDocument] = useState(null);
  // const { canisterId } = useParams();

  initJuno({
    satelliteId: "4knjt-tiaaa-aaaal-adenq-cai",
  });

  useEffect(() => {
    // This function fetches a single document using its canisterId
    const fetchDocument = async () => {
      try {
        const doc = await getDoc({
          collection: "favourse99",
          key: "be2us-64aaa-aaaaa-qaabq-cai",
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
  }, []);

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
              <div className="line-clamp-3 text-left grow">
                {document.data.name}
              </div>
            </div>
          </div>
        ) : (
          <p>No document found</p>
        )}
      </div>
    </div>
  );
};
