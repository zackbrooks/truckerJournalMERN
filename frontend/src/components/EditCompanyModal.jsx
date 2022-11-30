import {
  Box,
  Button,
  Typography,
  Modal,
  Container,
  TextField,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { shades } from "./../theme";
import api from "../api/posts";

const EditCompanyModal = ({ open, handleClose, company, update }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: company.name,
    location: company.location,
    phoneNumber: company.phoneNumber,
    email: company.email,
    rating: company.rating,
    routing: company.routing,
    notes: company.notes,
  });
  useEffect(() => {
    setValues(company);
  }, [open]);

  const updateCompany = async (compInfo) => {
    const updated = await api.post(`/company/edit/${company._id}`, {
      data: { compInfo },
    });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    handleClose();
    updateCompany(values);
    update(values);
    navigate(`/company/${company._id}`);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Container>
        <Box
          sx={{
            backgroundColor: "white",
            textAlign: "center",
            borderRadius: "10px",
            width: "60%",
            marginTop: "200px",
            padding: "50px 10px 20px 10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            helperText="Enter company name above"
            id="demo-helper-text-aligned"
            label="Company Name"
            onChange={handleChange("name")}
            required
            defaultValue={company.name}
          />
          <TextField
            helperText="Enter location above"
            id="demo-helper-text-aligned"
            label="Location"
            onChange={handleChange("location")}
            defaultValue={company.location}
          />
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-aligned"
            label="Email"
            onChange={handleChange("email")}
            defaultValue={company.email}
          />
          <TextField
            helperText="Please phone number above"
            id="demo-helper-text-aligned"
            label="Phone Number"
            onChange={handleChange("phoneNumber")}
            defaultValue={company.phoneNumber}
          />
          <TextField
            helperText="Enter rating above"
            id="demo-helper-text-aligned"
            label="Rating"
            onChange={handleChange("rating")}
            defaultValue={company.rating}
          />
          <TextField
            helperText="Please routing notes above"
            id="demo-helper-text-aligned"
            label="Routing"
            onChange={handleChange("routing")}
            multiline
            rows={5}
            defaultValue={company.routing}
          />
          <TextField
            helperText="Enter notes above"
            id="demo-helper-text-aligned"
            label="Notes"
            onChange={handleChange("notes")}
            multiline
            rows={5}
            defaultValue={company.name}
          />
          <Box
            display="flex"
            justifyContent="center"
            gap="12px"
            marginTop="10px"
          >
            <Button
              color="neutral"
              sx={{ backgroundColor: shades.neutral[400], color: "white" }}
              variant="contained"
              size="small"
              onClick={handleSubmit}
            >
              Submit Company
            </Button>

            <Button
              color="neutral"
              variant="contained"
              sx={{ backgroundColor: shades.neutral[400], color: "white" }}
              size="small"
              onClick={() => {
                {
                  handleClose(false);
                }
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default EditCompanyModal;