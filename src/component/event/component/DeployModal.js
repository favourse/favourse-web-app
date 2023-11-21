const DeployModal = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-5/6 md:w-1/4 p-10 rounded flex flex-col justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default DeployModal;
