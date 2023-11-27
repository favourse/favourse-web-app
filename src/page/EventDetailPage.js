import { useEffect, useState } from "react";
import { initJuno, getDoc } from "@junobuild/core";
import { Helmet } from "react-helmet";

import { useParams } from "react-router-dom";
import TopContentModal from "../component/event/component/TopContentModal";
import ModalRegistrationSection from "../component/event/component/ModalRegistrationSection";
import ModalAboutSection from "../component/event/component/ModalAboutSection";
import ModalHostSection from "../component/event/component/ModalHostSection";
import HeaderSection from "../component/HeaderSection";

export const EventDetailPage = () => {
  const [document, setDocument] = useState(null);
  const [ready, setReady] = useState(false);
  const { canisterId } = useParams();

  useEffect(() => {
    (async () => {
      await initJuno({
        satelliteId: process.env.REACT_APP_SATELLITE_ID,
      });

      setReady(true);
    })();
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }
    // This function fetches a single document using its canisterId
    const fetchDocument = async () => {
      try {
        const doc = await getDoc({
          collection: "favourse99",
          key: canisterId,
          // key: "be2us-64aaa-aaaaa-qaabq-cai",
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
  }, [ready]);

  // Return UI elements to display the document
  // return (
  //   <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200 mt-8">
  //     <header className="px-5 py-4 border-b border-gray-100">
  //       <h2 className="font-semibold text-gray-800">Document Details</h2>
  //     </header>
  //     <div className="p-3">
  //       {document ? (
  //         <div className="overflow-x-auto">
  //           <div className="flex items-center gap-6 px-2.5 py-1.5">
  //             <div className="line-clamp-3 text-left grow">
  //               {document.data.name}
  //             </div>
  //           </div>
  //         </div>
  //       ) : (
  //         <p>No document found</p>
  //       )}
  //     </div>
  //   </div>
  // );
  return (
    <div className="h-fit min-h-screen pb-52 bg-gradient-to-r from-violet-900 via-violet-950 to-black">
      <Helmet>
        {document ? (
          <title>{document.data.name} | Favourse</title>
        ) : (
          <title>Event Detail | Favourse</title>
        )}
      </Helmet>
      <HeaderSection />
      <div className="p-4 md:p-8 lg:w-2/3 mx-auto">
        {ready ? (
          document ? (
            <>
              <div className="mb-6"></div>
              <div className="space-y-6 text-white">
                <TopContentModal event={document ? document.data : {}} />
                {/* <div className="py-2"></div> */}
                <ModalRegistrationSection
                  event={document ? document.data : {}}
                />
                {/* <div className="py-2"></div> */}
                <ModalAboutSection event={document ? document.data : {}} />
                {/* <div className="py-2"></div> */}
                <ModalHostSection />
                <div className="py-2"></div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-6 flex flex-col justify-center items-center text-white pt-72 md:pt-72 text-center text-3xl md:text-6xl font-semibold ">
                Upps.. Not Found!
                <a
                  href="/"
                  className="text-sm mt-5 bg-violet-800 py-1 px-3 rounded-md"
                >
                  Back to Home
                </a>
              </div>
            </>
          )
        ) : (
          <p>Loading the data</p>
        )}
      </div>
    </div>
  );
};
