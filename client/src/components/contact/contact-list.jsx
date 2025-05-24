import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useEffectOnce, useLocalStorage } from "react-use";
import { contactDelete, contactList } from "../../lib/api/contact-api";
import { alertConfirm, alertError, alertSuccess } from "../../lib/alert";

export default function ContactList() {
  const [token, _] = useLocalStorage("token", "");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [contacts, setContacts] = useState([]);

  function getPages() {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }

    return pages;
  }

  const fetchContactList = async (currentPage = page) => {
    const response = await contactList(token, {
      name,
      email,
      phone,
      page: currentPage,
    });

    const responseBody = await response.json();

    if (response.status == 200) {
      setContacts(responseBody.data);

      setTotalPages(responseBody.paging.total_page);

      setPage(currentPage);
    } else {
      alertError(responseBody.errors);
    }
  };

  async function handleSearchContacts(e) {
    e.preventDefault();
    setPage(1); // Reset to first page when searching
    await fetchContactList(1); // Fetch first page
  }

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchContactList(newPage);
    }
  };

  // Handle previous page
  const handlePreviousPage = () => {
    if (page > 1) {
      handlePageChange(page - 1);
    }
  };

  // Handle next page
  const handleNextPage = () => {
    if (page < totalPages) {
      handlePageChange(page + 1);
    }
  };

  const handleDeleteContact = async (id) => {
    const confirmed = await alertConfirm(
      "This contact will be permanently deleted"
    );

    if (!confirmed) {
      return;
    } else {
      const response = await contactDelete(token, id);

      const responseBody = await response.json();

      if (response.status == 200) {
        alertSuccess("Contact delete is successfully");
        fetchContactList();
      } else {
        alertError(responseBody.errors);
      }
    }
  };

  useEffect(() => {
    fetchContactList();
  }, [token]);

  useEffectOnce(() => {
    const toggleButton = document.getElementById("toggleSearchForm");
    const searchFormContent = document.getElementById("searchFormContent");
    const toggleIcon = document.getElementById("toggleSearchIcon");

    // Add transition for smooth animation
    searchFormContent.style.transition =
      "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
    searchFormContent.style.overflow = "hidden";
    searchFormContent.style.maxHeight = "0px";
    searchFormContent.style.opacity = "0";
    searchFormContent.style.marginTop = "0";

    function toggleSearchForm() {
      if (searchFormContent.style.maxHeight !== "0px") {
        // Hide the form
        searchFormContent.style.maxHeight = "0px";
        searchFormContent.style.opacity = "0";
        searchFormContent.style.marginTop = "0";
        toggleIcon.classList.remove("fa-chevron-up");
        toggleIcon.classList.add("fa-chevron-down");
      } else {
        // Show the form
        searchFormContent.style.maxHeight =
          searchFormContent.scrollHeight + "px";
        searchFormContent.style.opacity = "1";
        searchFormContent.style.marginTop = "1rem";
        toggleIcon.classList.remove("fa-chevron-down");
        toggleIcon.classList.add("fa-chevron-up");
      }
    }

    toggleButton.addEventListener("click", toggleSearchForm);

    return () => {
      toggleButton.removeEventListener("click", toggleSearchForm);
    };
  });

  return (
    <>
      <div className="flex items-center mb-6">
        <i className="fas fa-users text-blue-400 text-2xl mr-3" />
        <h1 className="text-2xl font-bold text-white">My Contacts</h1>
      </div>

      {/* Search form */}
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fas fa-search text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">
              Search Contacts
            </h2>
          </div>
          <button
            type="button"
            id="toggleSearchForm"
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200"
          >
            <i className="fas fa-chevron-down text-lg" id="toggleSearchIcon" />
          </button>
        </div>
        <div id="searchFormContent" className="mt-4">
          <form onSubmit={handleSearchContacts}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by name"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="search_email"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by email"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-phone text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by phone"
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 text-right">
              <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5"
              >
                <i className="fas fa-search mr-2" /> Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Contact cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Create New Contact Card */}
        <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
          <Link to="create" className="block p-6 h-full">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
                <i className="fas fa-user-plus text-3xl text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white mb-3">
                Create New Contact
              </h2>
              <p className="text-gray-300">Add a new contact to your list</p>
            </div>
          </Link>
        </div>

        {/* Contact Cards */}
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in"
          >
            <div className="p-6">
              <Link
                to={`/dashboard/contacts/${contact.id}`}
                className="block cursor-pointer hover:bg-gray-700 rounded-lg transition-all duration-200 p-3"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
                    <i className="fas fa-user text-white" />
                  </div>
                  <h2 className="text-xl font-semibold text-white hover:text-blue-300 transition-colors duration-200">
                    {`${contact.first_name} ${contact.last_name}`}
                  </h2>
                </div>
                <div className="space-y-3 text-gray-300 ml-2">
                  <p className="flex items-center">
                    <i className="fas fa-user-tag text-gray-500 w-6" />
                    <span className="font-medium w-24">First Name:</span>
                    <span>{contact.first_name}</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-user-tag text-gray-500 w-6" />
                    <span className="font-medium w-24">Last Name:</span>
                    <span>{contact.last_name}</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-envelope text-gray-500 w-6" />
                    <span className="font-medium w-24">Email:</span>
                    <span>{contact.email}</span>
                  </p>
                  <p className="flex items-center">
                    <i className="fas fa-phone text-gray-500 w-6" />
                    <span className="font-medium w-24">Phone:</span>
                    <span>{contact.phone}</span>
                  </p>
                </div>
              </Link>
              <div className="mt-4 flex justify-end space-x-3">
                <Link
                  to={`/dashboard/contacts/${contact.id}/edit`}
                  className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                >
                  <i className="fas fa-edit mr-2" /> Edit
                </Link>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center"
                >
                  <i className="fas fa-trash-alt mr-2" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center">
          <nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
            {/* Previous Button */}
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
                page === 1
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              }`}
            >
              <i className="fas fa-chevron-left mr-2" /> Previous
            </button>

            {/* Page Numbers */}
            {getPages().map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  pageNumber === page
                    ? "bg-gradient text-white shadow-md"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                }`}
              >
                {pageNumber}
              </button>
            ))}

            {/* Next Button */}
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center ${
                page === totalPages
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              }`}
            >
              Next <i className="fas fa-chevron-right ml-2" />
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
