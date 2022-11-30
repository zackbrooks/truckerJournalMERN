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

const EditBrokerModal = ({ open, handleClose, broker, update }) => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: broker.firstName,
    lastName: broker.lastName,
    phoneNumber: broker.phoneNumber,
    email: broker.email,
    rating: broker.rating,
    notes: broker.notes,
  });
  useEffect(() => {
    setValues(broker);
  }, [open]);

  const updateBroker = async (brokerInfo) => {
    const updated = await api.post(`/broker/edit/${broker._id}`, {
      data: { brokerInfo },
    });
  };
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleSubmit = () => {
    handleClose();
    updateBroker(values);
    update(values);
    navigate(`/broker/${broker._id}`);
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
            onChange={handleChange("firstName")}
            required
            defaultValue={broker.firstName}
          />
          <TextField
            helperText="Enter last name above"
            id="demo-helper-text-aligned"
            label="Last Name"
            onChange={handleChange("lastName")}
            required
            defaultValue={broker.lastName}
          />
          <TextField
            helperText="Please enter your name"
            id="demo-helper-text-aligned"
            label="Email"
            onChange={handleChange("email")}
            defaultValue={broker.email}
          />
          <TextField
            helperText="Please phone number above"
            id="demo-helper-text-aligned"
            label="Phone Number"
            onChange={handleChange("phoneNumber")}
            defaultValue={broker.phoneNumber}
          />
          <TextField
            helperText="Enter rating above"
            id="demo-helper-text-aligned"
            label="Rating"
            onChange={handleChange("rating")}
            defaultValue={broker.rating}
          />
          <TextField
            helperText="Enter notes above"
            id="demo-helper-text-aligned"
            label="Notes"
            onChange={handleChange("notes")}
            multiline
            rows={5}
            defaultValue={broker.name}
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
              Submit
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

export default EditBrokerModal;