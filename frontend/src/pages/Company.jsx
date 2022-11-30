import { Box, Typography, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/posts";
import Wrapper from "../components/HOC/Wrapper";
import { shades } from "../theme";
import { Link, useNavigate } from "react-router-dom";
import EditCompanyModal from "../components/EditCompanyModal";

const OneCompany = () => {
  const [companyOpen, setCompanyOpen] = useState(false);
  const navigate = useNavigate();
  const { id: companyId } = useParams();
  const [company, setCompany] = useState({});
  const {
    name,
    email,
    location,
    notes,
    phoneNumber,
    rating,
    routing,
    _id: id,
  } = company;

  const handleEditCompany = () => {
    setCompanyOpen(!companyOpen);
  };
  const getCompany = async (id) => {
    const company = await api.get(`/company/viewone/${companyId}`);
    setCompany(company.data);
  };
  useEffect(() => {
    getCompany();
  }, []);

  const handleDelete = async (companyId) => {
    const deleteComp = await api.delete(`/company/delete`, {
      data: { companyId },
    });
    navigate("/journal");
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: "5px" }}>
          {name}
        </Typography>
      </Box>
      <Box
        display="flex"
        gap="25px"
        alignItems="center"
        justifyContent="center"
      >
        <Box>
          <Typography
            variant="caption"
            sx={{ borderBottom: "1px solid black", marginBottom: "5px" }}
          >
            Phone Number
          </Typography>
          <Typography>
            {phoneNumber?.slice(0, 3)}-{phoneNumber?.slice(3, 6)}-
            {phoneNumber?.slice(6)}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ borderBottom: "1px solid black", marginBottom: "5px" }}
          >
            Email
          </Typography>
          <Typography>{email}</Typography>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ borderBottom: "1px solid black", marginBottom: "5px" }}
          >
            Location
          </Typography>
          <Typography>{location}</Typography>
        </Box>
        <Box>
          <Typography
            variant="caption"
            sx={{ borderBottom: "1px solid black", marginBottom: "5px" }}
          >
            Rating
          </Typography>
          <Typography>{rating ? rating + "/10" : "N/A"}</Typography>
        </Box>
      </Box>
      <Box textAlign="start">
        <Typography
          variant="caption"
          sx={{ borderBottom: "1px solid black", marginBottom: "5px" }}
        >
          Routing
        </Typography>
        <Typography>{routing}</Typography>
      </Box>
      <Box textAlign="start">
        <Typography
          variant="caption"
          sx={{ borderBottom: "1px solid black", marginBottom: "5px" }}
        >
          Notes
        </Typography>
        <Typography>{notes}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap="12px" marginTop="10px">
        <Button
          onClick={() => {
            setCompanyOpen(true);
          }}
          color="neutral"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          variant="contained"
          size="large"
        >
          Edit Company Info
        </Button>

        <Button
          color="neutral"
          variant="contained"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          size="large"
          onClick={() => {
            handleDelete(companyId);
          }}
        >
          Delete Company
        </Button>
        <Link to="/journal">
          <Button
            color="neutral"
            variant="contained"
            sx={{ backgroundColor: shades.neutral[400], color: "white" }}
            size="large"
          >
            Back To Journal
          </Button>
        </Link>
        <EditCompanyModal
          open={companyOpen}
          handleClose={setCompanyOpen}
          company={company}
          update={setCompany}
        />
      </Box>
    </Box>
  );
};

export default Wrapper(OneCompany, "Company Page");
