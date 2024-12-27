import React, { useState, useEffect } from "react";
import { getDatabase, ref, get } from "firebase/database"; // Import Firebase Realtime Database methods
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
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineFilter } from "react-icons/ai";
import { MdAssignmentAdd } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { FaFileExcel } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import "@fontsource/lexend-deca"; // Defaults to weight 400
import "./styles.css"; // Import the external CSS

function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredField, setFilteredField] = useState("All");
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const itemsPerPage = 5; // Number of items per page

  useEffect(() => {
    // Fetch leads data from Firebase Realtime Database
    const fetchItems = async () => {
      try {
        const dbRef = ref(database, "LeadList"); // Reference to the "leads" node in Firebase Realtime Database
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

  const handleSort = (field) => {
    setFilteredField(field);
  };

  const handleDelete = async (id) => {
    // Add Firebase delete logic here if needed, or use a REST API if required for deletion
    console.log("Delete item with id:", id);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id)); // Remove item locally from the state
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

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Leads</h2>
      {/* Filter and Action Bar */}
      <div className="action-bar d-flex justify-content-between align-items-center mb-3 p-3 bg-light">
        <div className="d-flex align-items-center" style={{ gap: "40px" }}>
          <div className="input-group mb-3" style={{ marginTop: "16px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Search Name , Phone"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <span className="input-group-text" id="basic-addon2">
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
        </div>
        <div className="d-flex align-items-center" style={{ gap: "25px", marginLeft: "10px" }}>
          <Button variant="outline-primary" className="mr-2">
            <AiOutlineFilter /> Advanced Filters
          </Button>
          <DropdownButton id="dropdown-basic-button" title="Edit" variant="outline-secondary">
            <Dropdown.Item href="#">Export</Dropdown.Item>
            <Dropdown.Item href="#">Edit Columns</Dropdown.Item>
          </DropdownButton>
        </div>
      </div>
      <div className="table-container" style={{ overflowX: "auto" }}>
        {items.length > 0 ? (
          <>
            <Table className="table" style={{ minWidth: "1500px" }}>
              <thead>
                <tr>
                  <th colSpan={selectedHeaders.length + 1}>
                    <div className="btn-group" style={{ gap: "200px", fontFamily: "Lexend Deca", fontWeight: "bolder" }}>
                      <DropdownButton
                        id="dropdown-basic-button"
                        title={`Filters: ${filteredField}`}
                        variant="success"
                        onSelect={handleSort}
                      >
                        <Dropdown.Item eventKey="Name">Name</Dropdown.Item>
                        <Dropdown.Item eventKey="Phone">Phone</Dropdown.Item>
                        <Dropdown.Item eventKey="Email">Email</Dropdown.Item>
                        <Dropdown.Item eventKey="All">All</Dropdown.Item>
                      </DropdownButton>
                      <Button variant="danger" style={{ width: "10px", borderRadius: "10px" }}>
                        <MdAssignmentAdd /> Assign
                      </Button>
                      <Button variant="warning" style={{ width: "10px", borderRadius: "10px" }}>
                        <MdEditSquare /> Edit
                      </Button>
                      <Button variant="dark" style={{ width: "10px", borderRadius: "10px" }}>
                        <MdOutlineCreateNewFolder /> Create Task
                      </Button>
                      <Button onClick={exportToExcel} variant="success" className="ml-2">
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
                    {selectedHeaders.includes("Name") && <td>{item.name}</td>}
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
                        <Button variant="outline-primary" style={{ marginLeft: "10px" }}>
                          <MdOutlineSms />
                        </Button>
                        <Button variant="outline-success" style={{ marginLeft: "10px" }}>
                          <FaWhatsappSquare />
                        </Button>
                        <Button variant="outline-info" style={{ marginLeft: "10px" }}>
                          <MdAddIcCall />
                        </Button>
                      </td>
                    )}
                    {selectedHeaders.includes("Delete") && (
                      <td>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="danger"
                          style={{ marginLeft: "10px" }}
                        >
                          <BsThreeDots />
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Pagination */}
            <Pagination>
              {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item key={index + 1} onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </Pagination.Item>
              ))}
            </Pagination>
          </>
        ) : (
          <p>No leads available</p>
        )}
      </div>
    </div>
  );
}

export default ItemList;