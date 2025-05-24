const ContactCard = ({ first_name, last_name, email, phone }) => {
  return (
    <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
      <div className="p-6">
        <a
          href=""
          className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
        >
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
              <i className="fas fa-user text-white" />
            </div>
            <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">
              John Doe
            </h2>
          </div>
          <div className="space-y-3 text-gray-300 ml-2">
            <p className="flex items-center">
              <i className="fas fa-user-tag text-gray-500 w-6" />
              <span className="font-medium w-24">First Name:</span>
              <span>John</span>
            </p>
            <p className="flex items-center">
              <i className="fas fa-user-tag text-gray-500 w-6" />
              <span className="font-medium w-24">Last Name:</span>
              <span>Doe</span>
            </p>
            <p className="flex items-center">
              <i className="fas fa-envelope text-gray-500 w-6" />
              <span className="font-medium w-24">Email:</span>
              <span>john.doe@example.com</span>
            </p>
            <p className="flex items-center">
              <i className="fas fa-phone text-gray-500 w-6" />
              <span className="font-medium w-24">Phone:</span>
              <span>+1 (555) 123-4567</span>
            </p>
          </div>
        </a>
        <div className="mt-4 flex justify-end space-x-3">
          <a
            href="edit_contact.html"
            className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
          >
            <i className="fas fa-edit mr-2" /> Edit
          </a>
          <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
            <i className="fas fa-trash-alt mr-2" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};
