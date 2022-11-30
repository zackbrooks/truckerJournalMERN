import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import api from "../api/posts";
import Wrapper from "../components/HOC/Wrapper";
import { shades } from "../theme";
import { Link, useNavigate } from "react-router-dom";
import EditBrokerModal from "../components/EditBrokerModal";

const Broker = () => {
  const [brokerOpen, setBrokerOpen] = useState(false);
  const navigate = useNavigate();
  const { id: brokerId } = useParams();
  const [broker, setBroker] = useState({});
  const {
    firstName,
    lastName,
    email,
    notes,
    phoneNumber,
    rating,
    _id: id,
  } = broker;

  const handleEditBroker = () => {
    setBrokerOpen(!brokerOpen);
  };
  const getBroker = async (id) => {
    const broker = await api.get(`/broker/viewone/${brokerId}`);
    setBroker(broker.data);
  };
  useEffect(() => {
    getBroker();
  }, []);

  const handleDelete = async (brokerId) => {
    const deleteBroker = await api.delete(`/broker/delete`, {
      data: { brokerId },
    });
    navigate("/journal");
  };

  return (
    <Box>
      <Box>
        <Typography variant="h5" sx={{ marginBottom: "5px" }}>
          {firstName + " " + lastName}
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
          Notes
        </Typography>
        <Typography>{notes}</Typography>
      </Box>
      <Box display="flex" justifyContent="center" gap="12px" marginTop="10px">
        <Button
          onClick={() => {
            setBrokerOpen(true);
          }}
          color="neutral"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          variant="contained"
          size="large"
        >
          Edit Broker Info
        </Button>

        <Button
          color="neutral"
          variant="contained"
          sx={{ backgroundColor: shades.neutral[400], color: "white" }}
          size="large"
          onClick={() => {
            handleDelete(brokerId);
          }}
        >
          Delete Broker
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
        <EditBrokerModal
          open={brokerOpen}
          handleClose={setBrokerOpen}
          broker={broker}
          update={setBroker}
        />
      </Box>
    </Box>
  );
};

export default Wrapper(Broker, "Broker Page");
