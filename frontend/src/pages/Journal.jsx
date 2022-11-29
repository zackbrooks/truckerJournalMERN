import { Tabs, Tab, Skeleton, Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import Wrapper from "../components/HOC/Wrapper";
import BrokerCard from "../components/BrokerCard";
import AddCompanyModal from "../components/AddCompanyModal";
import { shades } from "../theme";

const Journal = () => {
  const [companies, setCompanies] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [value, setValue] = useState("company");
  const [companyOpen, setCompanyOpen] = useState(false);

  const getUserJournalData = async (id) => {
    const companies = await axios.get(`http://localhost:5000/company/allcomps`);
    const brokers = await axios.get(`http://localhost:5000/broker/allbrokers`);
    setCompanies(companies.data.allComps);
    setBrokers(brokers.data.brokers);
  };
  useEffect(() => {
    getUserJournalData();
  }, []);

  const handleAddCompany = () => {
    setCompanyOpen(!companyOpen);
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography>
        This is your homebase for all your information. All your notes for
        various companies and brokers is only a click away. Click any of the
        buttons below to start.
      </Typography>
      <Box display="flex" justifyContent="center" gap="12px" marginTop="10px">
        <Button
          onClick={() => {
            handleAddCompany();
          }}
          color="neutral"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          variant="contained"
          size="large"
        >
          Add New Company
        </Button>
        <AddCompanyModal
          open={companyOpen}
          handleClose={handleAddCompany}
          update={getUserJournalData}
        />

        <Button
          color="neutral"
          variant="contained"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          size="large"
        >
          Add New Broker
        </Button>
      </Box>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="View All Companies" value="company"></Tab>
        <Tab label="View All Brokers" value="broker"></Tab>
      </Tabs>
      <Box display="flex" gap="15px" flexWrap="wrap" justifyContent="center">
        {value === "company" &&
          companies.map((company) => (
            <CompanyCard
              company={company}
              key={company._id}
              update={getUserJournalData}
            />
          ))}
        {value === "broker" &&
          brokers.map((broker) => (
            <BrokerCard
              broker={broker}
              key={broker._id}
              update={getUserJournalData}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Wrapper(Journal);
