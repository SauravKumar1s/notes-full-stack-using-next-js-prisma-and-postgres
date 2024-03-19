function SimpleModal({ isOpen, onClose, title, content }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <p>{content}</p>
          <div className="text-right mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  