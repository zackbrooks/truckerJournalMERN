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
import { Link, useNavigate } from "react-router-dom";
import api from "../api/posts";

const CompanyCard = ({ company, update }) => {
  const navigate = useNavigate();
  const { email, name, rating, _id: id, phoneNumber } = company;

  const handleDelete = async (companyId) => {
    const deleteComp = await api.delete(`/company/delete`, {
      data: { companyId },
    });
    update();
  };

  return (
    <Card sx={{ maxWidth: 250, minWidth: 250 }}>
      <CardContent sx={{ position: "relative", marginBottom: "5px" }}>
        <Typography variant="h5">{name}</Typography>
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
            title="Click To View More Details On This Company."
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <Link to={`/company/${id}`}>
              <Button size="small">View More</Button>
            </Link>
          </Tooltip>
          <Tooltip
            title="Click To Delete This Company From Your Journal."
            arrow
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 600 }}
          >
            <IconButton
              onClick={() => {
                handleDelete(id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardActions>
    </Card>
  );
};

export default CompanyCard;
