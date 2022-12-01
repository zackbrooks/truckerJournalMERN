import {
  Box,
  Button,
  Modal,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { shades } from "./../theme";
import { useNavigate } from "react-router-dom";
import api from "../api/posts";
import { useAppContext } from "../context/appContext";

const AddBrokerModal = ({ open, handleClose, update }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    id: user._id,
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
            padding: "10px 10px 20px 10px",
            display: "flex",
            flexWrap: "wrap",
            gap: "4px",
            justifyContent: "center",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <Typography variant="h3">Add New Broker To Your Journal</Typography>
          <Typography variant="caption">* denotes required fields</Typography>
          <TextField
            helperText="Enter first name above"
            label="First Name"
            value={values.firstName}
            onChange={handleChange("firstName")}
            required
          />
          <TextField
            helperText="Enter last name above"
            label="Last Name"
            value={values.lastName}
            onChange={handleChange("lastName")}
            required
          />
          <TextField
            helperText="Enter email above"
            label="Email"
            value={values.email}
            onChange={handleChange("email")}
          />
          <TextField
            helperText="Please phone number above"
            label="Phone Number"
            value={values.phoneNumber}
            onChange={handleChange("phoneNumber")}
          />
          <TextField
            helperText="Enter rating above"
            label="Rating"
            value={values.rating}
            onChange={handleChange("rating")}
          />
          <TextField
            helperText="Enter notes above"
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
