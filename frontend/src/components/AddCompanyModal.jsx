import {
  Box,
  Button,
  Modal,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { shades } from "./../theme";
import api from "../api/posts";
import { useAppContext } from "../context/appContext";

const AddCompanyModal = ({ open, handleClose, update }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    location: "",
    phoneNumber: "",
    id: user._id,
    email: "",
    rating: "",
    routing: "",
    notes: "",
  });

  const addCompany = async (compInfo) => {
    const addComp = await api.post(`/company/add`, {
      compInfo,
    });
    update();
    navigate("/journal");
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    handleClose();
    addCompany(values);
    setValues({
      name: "",
      location: "",
      phoneNumber: "",
      email: "",
      rating: "",
      routing: "",
      notes: "",
    });
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
          <Typography variant="h3">Add New Company To Your Journal</Typography>
          <Typography variant="caption">* denotes required fields</Typography>
          <TextField
            helperText="Enter company name above"
            id="demo-helper-text-aligned"
            label="Company Name"
            value={values.name}
            onChange={handleChange("name")}
            required
          />
          <TextField
            helperText="Enter location above"
            id="demo-helper-text-aligned"
            label="Location"
            value={values.location}
            onChange={handleChange("location")}
          />
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-aligned"
            label="Email"
            value={values.email}
            onChange={handleChange("email")}
          />
          <TextField
            helperText="Please phone number above"
            id="demo-helper-text-aligned"
            label="Phone Number"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
          />
          <TextField
            helperText="Enter rating above"
            id="demo-helper-text-aligned"
            label="Rating"
            value={values.rating}
            onChange={handleChange("rating")}
          />
          <TextField
            helperText="Please routing notes above"
            id="demo-helper-text-aligned"
            label="Routing"
            value={values.routing}
            onChange={handleChange("routing")}
            multiline
            rows={5}
          />
          <TextField
            helperText="Enter notes above"
            id="demo-helper-text-aligned"
            label="Notes"
            value={values.notes}
            onChange={handleChange("notes")}
            multiline
            rows={5}
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
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Container>
    </Modal>
  );
};

export default AddCompanyModal;
