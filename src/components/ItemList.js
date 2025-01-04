
import React, { useState, useEffect } from "react";
import { ref, get, remove } from "firebase/database"; // Import Firebase Realtime Database methods
import database from "../firebaseConfig"; // Firebase configuration file
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import { MdOutlineSms } from "react-icons/md";
import { FaWhatsappSquare } from "react-icons/fa";
import { MdAddIcCall } from "react-icons/md";
//import { AiOutlineFilter } from "react-icons/ai";
import { MdAssignmentAdd, MdEditSquare, MdOutlineCreateNewFolder } from "react-icons/md";
import { FaFileExcel, FaSearch } from "react-icons/fa";
import "@fontsource/lexend-deca"; // Defaults to weight 400
import "./styles.css"; // Import the external CSS

function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredField, setFilteredField] = useState("All");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    // Fetch leads data from Firebase Realtime Database
    const fetchItems = async () => {
      try {
        const dbRef = ref(database, "LeadList"); // Reference to the "LeadList" node in Firebase Realtime Database
        const snapshot = await get(dbRef); // Fetch the data
        if (snapshot.exists()) {
          const data = snapshot.val();
          const leadsArray = Object.keys(data).map((key) => ({
            id: key, // Adding the key to each item to uniquely identify it
            ...data[key],
          }));
          setItems(leadsArray); // Set the leads data in state
        } else {
          console.log("No leads available.");
        }
      } catch (error) {
        console.error("Error fetching leads: ", error.message);
      }
    };

    fetchItems();
  }, []);

  const exportToExcel = () => {
    const formattedData = items.map((item) => ({
      Name: item.name,
      Phone: item.phone,
      Email: item.email,
      "Vehicle Model": item.vehicleModel,
      "Reg. Number": item.regNumber,
      "Policy Start": item.policyStart,
      "Policy Expiry": item.policyExpiry,
      "Current Provider": item.currentProvider,
      Premium: item.premium,
      "Lead Status": item.leadStatus,
    }));

    const ws = XLSX.utils.json_to_sheet(formattedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "LeadsData.xlsx");
  };

  const handleDelete = async (id) => {
    try {
      // Reference to the specific lead in the Firebase database
      const itemRef = ref(database, `LeadList/${id}`); // Fixed template literal

      // Remove the item from the database
      await remove(itemRef);

      // Remove the item locally from the state
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      console.log(`Lead with id: ${id} has been deleted.`); // Fixed string interpolation
    } catch (error) {
      console.error("Error deleting lead:", error.message);
    }
  };

  const handleSort = (field) => {
    setFilteredField(field);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const headers = {
    Name: ["Name"],
    Phone: ["Phone"],
    Email: ["Email"],
    All: [
      "Name",
      "Phone",
      "Email",
      "Vehicle Model",
      "Reg. Number",
      "Policy Start",
      "Policy Expiry",
      "Current Provider",
      "Premium",
      "Lead Status",
      "Social Media",
      "Delete",
    ],
  };

  const selectedHeaders = headers[filteredField] || [];

  // Filter items based on search term
  const filteredItems = items.filter((item) => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    const itemName = item.name ? item.name.toLowerCase() : ""; 
    const itemPhone = item.phone ? item.phone.toLowerCase() : ""; 
    
    return itemName.includes(lowerSearchTerm) || itemPhone.includes(lowerSearchTerm);
  });
  

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Leads</h2>
      {/* Filter and Action Bar */}
      <div className="action-bar d-flex justify-content-between align-items-center mb-3 p-3 bg-light">
        <div className="d-flex align-items-center" style={{ gap: "40px" }}>
        <div
  className="input-group mb-3"
  style={{
    marginTop: "16px",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "5px",
    backgroundColor: "#f9f9f9",
    maxWidth: "700px", // Increased width of the container
    marginLeft: "auto",
    marginRight: "auto",
  }}
>
  <input
    type="text"
    className="form-control"
    placeholder="Search Name, Phone"
    aria-label="Search Name, Phone"
    style={{
      borderRadius: "8px",
      padding: "12px 20px", // Increased padding for a wider input box
      fontSize: "16px",
      border: "1px solid #ced4da",
      boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
      transition: "border-color 0.3s ease",
    }}
  />
  <span
    className="input-group-text"
    style={{
      backgroundColor: "#007bff",
      color: "#fff",
      borderRadius: "8px",
      padding: "10px",
      cursor: "pointer",
      fontSize: "20px",
      transition: "background-color 0.3s ease",
    }}
  >
    <FaSearch />
  </span>
</div>
          <DropdownButton id="dropdown-basic-button" title="Contact Owner" variant="outline-secondary">
            <Dropdown.Item href="#">Owner 1</Dropdown.Item>
            <Dropdown.Item href="#">Owner 2</Dropdown.Item>
            <Dropdown.Item href="#">Owner 3</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Create Date" variant="outline-secondary" className="ml-2">
            <Dropdown.Item href="#">Today</Dropdown.Item>
            <Dropdown.Item href="#">This Week</Dropdown.Item>
            <Dropdown.Item href="#">This Month</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Last Activity Date" variant="outline-secondary" className="ml-2">
            <Dropdown.Item href="#">Today</Dropdown.Item>
            <Dropdown.Item href="#">This Week</Dropdown.Item>
            <Dropdown.Item href="#">This Month</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Lead Status" variant="outline-secondary" className="ml-2">
            <Dropdown.Item href="#">New</Dropdown.Item>
            <Dropdown.Item href="#">Contacted</Dropdown.Item>
            <Dropdown.Item href="#">Qualified</Dropdown.Item>
          </DropdownButton>
          <DropdownButton id="dropdown-basic-button" title="Edit" variant="outline-secondary">
            <Dropdown.Item href="#">Export</Dropdown.Item>
            <Dropdown.Item href="#">Edit Columns</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="table-container" style={{ overflowX: "auto" }}>
        {filteredItems.length > 0 ? (
          <>
            <Table className="table" style={{ minWidth: "1500px" }}>
              <thead>
                <tr>
                  <th colSpan={selectedHeaders.length + 1}>
                    <div className="btn-group" style={{ gap: "10px", fontFamily: "Lexend Deca", fontWeight: "bolder" }}>
                      <DropdownButton id="dropdown-basic-button" title={`Filters: ${filteredField}`} variant="success" onSelect={handleSort}>
                        <Dropdown.Item eventKey="Name">Name</Dropdown.Item>
                        <Dropdown.Item eventKey="Phone">Phone</Dropdown.Item>
                        <Dropdown.Item eventKey="Email">Email</Dropdown.Item>
                        <Dropdown.Item eventKey="All">All</Dropdown.Item>
                      </DropdownButton>
                      <Button variant="danger" size="sm" style={{ fontSize: "0.8rem", padding: "5px 5px", borderRadius: "5px" }}>
                        <MdAssignmentAdd /> Assign
                      </Button>
                      <Button variant="warning" size="sm" style={{ fontSize: "0.8rem", padding: "5px 5px", borderRadius: "5px" }}>
                        <MdEditSquare /> Edit
                      </Button>
                      <Button variant="dark" size="sm" style={{ fontSize: "0.8rem", padding: "5px 5px", borderRadius: "5px" }}>
                        <MdOutlineCreateNewFolder /> Create Task
                      </Button>
                      <Button onClick={exportToExcel} variant="success" size="sm" style={{ fontSize: "0.8rem", padding: "5px 5px" }}>
                        <FaFileExcel /> Export to Excel
                      </Button>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>SR.No</th>
                  {selectedHeaders.map((header) => (
                    <th key={header} style={{ minWidth: "150px" }}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id}>
                    <td style={{ color: "red" }}>{indexOfFirstItem + index + 1}</td>
                    {selectedHeaders.includes("Name") && (
                      <td
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={item.name}
                      >
                        {item.name}
                      </td>
                    )}
                    {selectedHeaders.includes("Phone") && <td>{item.phone}</td>}
                    {selectedHeaders.includes("Email") && <td>{item.email}</td>}
                    {selectedHeaders.includes("Vehicle Model") && <td>{item.vehicleModel}</td>}
                    {selectedHeaders.includes("Reg. Number") && <td>{item.regNumber}</td>}
                    {selectedHeaders.includes("Policy Start") && <td>{item.policyStart}</td>}
                    {selectedHeaders.includes("Policy Expiry") && <td>{item.policyExpiry}</td>}
                    {selectedHeaders.includes("Current Provider") && <td>{item.currentProvider}</td>}
                    {selectedHeaders.includes("Premium") && <td>{item.premium}</td>}
                    {selectedHeaders.includes("Lead Status") && <td>{item.leadStatus}</td>}
                    {selectedHeaders.includes("Social Media") && (
                      <td>
                        <div className="social-media-icons">
                          <Button variant="outline-success" size="sm" style={{ padding: "5px" }}>
                            <MdOutlineSms />
                          </Button>
                          <Button variant="outline-success" size="sm" style={{ padding: "5px" }}>
                            <FaWhatsappSquare />
                          </Button>
                          <Button variant="outline-success" size="sm" style={{ padding: "5px" }}>
                            <MdAddIcCall />
                          </Button>
                        </div>
                      </td>
                    )}
                    {selectedHeaders.includes("Delete") && (
                      <td>
                        <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                          Delete
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        ) : (
          <p>No items to display</p>
        )}
      </div>
    </div>
  );
}

export default ItemList;
