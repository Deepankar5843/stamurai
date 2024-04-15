import React, { useEffect, useState } from "react";
import CustomAppBar from "./bar/CustomBar";
import Footer from "./bar/Footer";
import {
  Container,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Typography,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import "./CityTable.css";

function CityTable() {
  const [cityData, setCityData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterColumn, setFilterColumn] = useState("country");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "" });
  const [sortDirections, setSortDirections] = useState({
    country: "",
    city: "",
    timezone: "",
  });

  useEffect(() => {
    fetchCityData();
  }, []);

  useEffect(() => {
    if (cityData.length > 0) {
      setFilteredData(cityData);
    }
  }, [cityData]);

  const fetchCityData = async () => {
    try {
      const response = await fetch(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=90"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch city data");
      }

      const data = await response.json();
      const cityDetails = data.results?.map((record) => ({
        country: record?.cou_name_en,
        city: record?.ascii_name,
        timezone: record?.timezone,
      }));
      setCityData(cityDetails || []);
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
    setSortDirections({ ...sortDirections, [key]: direction });
  };

  useEffect(() => {
    const sortedData = [...filteredData].sort((a, b) => {
      const direction = sortDirections[sortConfig.key];
      if (direction === "ascending") {
        return a[sortConfig.key].localeCompare(b[sortConfig.key]);
      } else {
        return b[sortConfig.key].localeCompare(a[sortConfig.key]);
      }
    });
    setFilteredData(sortedData);
  }, [sortConfig, sortDirections]);

  useEffect(() => {
    const results = cityData.filter((city) => {
      return city[filterColumn]
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
    setFilteredData(results);
  }, [searchTerm, cityData, filterColumn]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterColumn(e.target.value);
  };

  const cityClicked = (cityName) => {
    window.open(`/weather?city=${cityName}`, "_blank");
  };

  const handleRightClick = (e, cityName) => {
    e.preventDefault();
    window.open(`/weather?city=${cityName}`, "_blank");
  };

  return (
    <div className="fullScreen">
      <CustomAppBar />
      <Container className="city-table-container">
        <Typography variant="h4" gutterBottom></Typography>
        <TextField
          label="Search city..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleInputChange}
          style={{ marginBottom: "20px", backgroundColor: "wheat" }}
        />
        <FormControl style={{ marginBottom: "20px" }}>
          <Select value={filterColumn} onChange={handleFilterChange}>
            <MenuItem value="country" style={{ color: "white" }}>
              Country
            </MenuItem>
            <MenuItem value="city">City</MenuItem>
            <MenuItem value="timezone">Timezone</MenuItem>
          </Select>
        </FormControl>
        <TableContainer component={Paper}>
          <Table className="city-table" sx={{ backgroundColor: "#f0f0f0" }}>
            <TableHead>
              <TableRow className="table-header-row">
                <TableCell
                  onClick={() => requestSort("country")}
                  style={{ color: "white" }}
                >
                  Country
                </TableCell>
                <TableCell
                  onClick={() => requestSort("city")}
                  style={{ color: "white" }}
                >
                  City
                </TableCell>
                <TableCell
                  onClick={() => requestSort("timezone")}
                  style={{ color: "white" }}
                >
                  Timezone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((city, index) => (
                <TableRow
                  key={index}
                  className={index % 2 === 0 ? "even-row" : "odd-row"}
                >
                  <TableCell>{city.country}</TableCell>
                  <TableCell
                    className="city-name"
                    onClick={() => cityClicked(city.city)}
                    onContextMenu={(e) => handleRightClick(e, city.city)}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    {city.city}
                  </TableCell>
                  <TableCell>{city.timezone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Footer />
    </div>
  );
}

export default CityTable;
