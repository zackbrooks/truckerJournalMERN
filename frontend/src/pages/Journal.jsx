import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import CompanyCard from "../components/CompanyCard";
import Wrapper from "../components/HOC/Wrapper";
import BrokerCard from "../components/BrokerCard";
import AddCompanyModal from "../components/AddCompanyModal";
import AddBrokerModal from "../components/AddBrokerModal";
import { shades } from "../theme";
import api from "../api/posts";

const Journal = () => {
  const [companies, setCompanies] = useState([]);
  const [brokers, setBrokers] = useState([]);
  const [value, setValue] = useState("company");
  const [companyOpen, setCompanyOpen] = useState(false);
  const [brokerOpen, setBrokerOpen] = useState(false);

  const getCompanies = async (id) => {
    const companies = await api.get(`/company/allcomps`);
    setCompanies(companies.data.allComps);
  };
  const getBrokers = async (id) => {
    const brokers = await api.get(`/broker/allbrokers`);
    setBrokers(brokers.data.brokers);
  };
  useEffect(() => {
    getCompanies();
    getBrokers();
  }, []);

  const handleAddCompany = () => {
    setCompanyOpen(!companyOpen);
  };
  const handleAddBroker = () => {
    setBrokerOpen(!brokerOpen);
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
          update={getCompanies}
        />

        <Button
          color="neutral"
          variant="contained"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          size="large"
          onClick={() => {
            handleAddBroker();
          }}
        >
          Add New Broker
        </Button>
        <AddBrokerModal
          open={brokerOpen}
          handleClose={handleAddBroker}
          update={getBrokers}
        />
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
              update={getCompanies}
            />
          ))}
        {value === "broker" &&
          brokers.map((broker) => (
            <BrokerCard broker={broker} key={broker._id} update={getBrokers} />
          ))}
      </Box>
    </Box>
  );
};

export default Wrapper(Journal);
