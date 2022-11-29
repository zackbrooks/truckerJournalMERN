import DeleteIcon from "@mui/icons-material/Delete";
import {
  Typography,
  Tooltip,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Button,
  Box,
  Fade,
} from "@mui/material";
import { Link } from "react-router-dom";

const BrokerCard = (broker) => {
  const {
    email,
    firstName,
    lastName,
    rating,
    _id: id,
    phoneNumber,
  } = broker.broker;

  return (
    <Card sx={{ maxWidth: 250, minWidth: 250 }}>
      <CardContent sx={{ position: "relative", marginBottom: "5px" }}>
        <Typography variant="h5">{firstName + " " + lastName}</Typography>
        <Typography variant="body2">
          Phone: {phoneNumber.slice(0, 3)}-{phoneNumber.slice(3, 6)}-
          {phoneNumber.slice(6)}
          <br />
          Email: {email}
          <br />
          Rating: {rating ? rating + "/10" : "No Rating Given"}
        </Typography>
      </CardContent>
      <CardActions>
        <Box sx={{}}>
          <Tooltip
            title="Click To View More Details On This Broker."
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <Link to={`/broker/${id}`}>
              <Button size="small">View More</Button>
            </Link>
          </Tooltip>
          <Tooltip
            title="Click To Delete This Broker From Your Journal."
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default BrokerCard;
