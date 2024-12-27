import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, remove } from "firebase/database";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Pagination from "react-bootstrap/Pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";
import {
  MdOutlineSms,
  MdAddIcCall,
  MdAssignmentAdd,
  MdEditSquare,
  MdOutlineCreateNewFolder,
} from "react-icons/md";
import { FaWhatsappSquare, FaFileExcel, FaSearch } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { AiOutlineFilter } from "react-icons/ai";
import "@fontsource/lexend-deca";
import "./styles.css";

function ItemList() {
  const [items, setItems] = useState([]);
  const [filteredField, setFilteredField] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch data from Firebase
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const dbRef = ref(getDatabase(), "LeadList");
        const snapshot = await get(dbRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const leadsArray = Object.keys(data).map((key) => ({
            id: key,
            name: data[key]?.name || "N/A",
            phone: data[key]?.phone || "N/A",
            email: data[key]?.email || "N/A",
            vehicleModel: data[key]?.vehicleModel || "N/A",
            regNumber: data[key]?.regNumber || "N/A",
            policyStart: data[key]?.policyStart || "N/A",
            policyExpiry: data[key]?.policyExpiry || "N/A",
            currentProvider: data[key]?.currentProvider || "N/A",
            premium: data[key]?.premium || "N/A",
            leadStatus: data[key]?.leadStatus || "New",
          }));
          setItems(leadsArray);
        } else {
          console.log("No leads available.");
        }
      } catch (error) {
        console.error("Error fetching leads: ", error.message);
      }
    };

    fetchItems();
  }, []);

  // Handle file upload and fetch data from Excel
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const fileData = await file.arrayBuffer();
      const workbook = XLSX.read(fileData, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet);

      const excelLeads = excelData.map((row, index) => ({
        id: `excel-${index}`, // Assign unique IDs for Excel data
        name: row["name"] || "N/A",
        phone: row["phone"] || "N/A",
        email: row["email"] || "N/A",
        vehicleModel: row["vehicleModel"] || "N/A",
        regNumber: row["regNumber"] || "N/A",
        policyStart: row["policyStart"] || "N/A",
        policyExpiry: row["policyExpiry"] || "N/A",
        currentProvider: row["currentProvider"] || "N/A",
        premium: row["premium"] || "N/A",
        leadStatus: row["leadStatus"] || "New Lead",
      }));

      setItems((prevItems) => [...prevItems, ...excelLeads]);
    } catch (error) {
      console.error("Error reading Excel file:", error.message);
    }
  };

  // Export data to Excel
  const exportToExcel = () => {
    if (items.length === 0) {
      alert("No data to export.");
      return;
    }

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

  // Handle sorting/filtering
  const handleSort = (field) => {
    setFilteredField(field);
  };

  // Handle deletion of a lead
  const handleDelete = async (id) => {
    try {
      const dbRef = ref(getDatabase(), `LeadList/${id}`);
      await remove(dbRef);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting lead: ", error.message);
    }
  };

  // Table headers configuration
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

  const selectedHeaders = headers[filteredField] || headers.All;
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