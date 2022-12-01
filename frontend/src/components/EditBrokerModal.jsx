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
import { useAppContext } from "../context/appContext";

const EditBrokerModal = ({ open, handleClose, broker, update }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: broker.firstName,
    lastName: broker.lastName,
    id: user._id,
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
        <TextField
          helperText="Enter first name above"
          label="First Name"
          onChange={handleChange("firstName")}
          required
          defaultValue={broker.firstName}
        />
        <TextField
          helperText="Enter last name above"
          label="Last Name"
          onChange={handleChange("lastName")}
          required
          defaultValue={broker.lastName}
        />
        <TextField
          helperText="Please enter your name"
          label="Email"
          onChange={handleChange("email")}
          defaultValue={broker.email}
        />
        <TextField
          helperText="Please phone number above"
          label="Phone Number"
          onChange={handleChange("phoneNumber")}
          defaultValue={broker.phoneNumber}
        />
        <TextField
          helperText="Enter rating above"
          label="Rating"
          onChange={handleChange("rating")}
          defaultValue={broker.rating}
        />
        <TextField
          helperText="Enter notes above"
          label="Notes"
          onChange={handleChange("notes")}
          multiline
          rows={5}
          defaultValue={broker.name}
        />
        <Box display="flex" justifyContent="center" gap="12px" marginTop="10px">
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
    </Modal>
  );
};

export default EditBrokerModal;
