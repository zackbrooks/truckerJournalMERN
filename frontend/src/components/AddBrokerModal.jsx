import { Box, Button, Modal, Container, TextField } from "@mui/material";
import { useState } from "react";
import { shades } from "./../theme";
import { useNavigate } from "react-router-dom";
import api from "../api/posts";

const AddBrokerModal = ({ open, handleClose, update }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    rating: "",
    notes: "",
  });

  const addBroker = async (brokerInfo) => {
    const addBroker = await api.post(`/broker`, {
      brokerInfo,
    });
    update();
    navigate("/journal");
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    handleClose();
    addBroker(values);
    setValues({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      rating: "",
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
          <TextField
            helperText="Enter first name above"
            id="demo-helper-text-aligned"
            label="First Name"
            value={values.firstName}
            onChange={handleChange("firstName")}
            required
          />
          <TextField
            helperText="Enter last name above"
            id="demo-helper-text-aligned"
            label="Last Name"
            value={values.lastName}
            onChange={handleChange("lastName")}
            required
          />
          <TextField
            helperText="Enter email above"
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
              Submit Broker
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

export default AddBrokerModal;
