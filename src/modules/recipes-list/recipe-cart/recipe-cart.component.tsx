import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type Props = {
  name: string;
  imageUrl: string;
  id: string;
};

const RecipeCart = ({ name, imageUrl, id }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      onClick={() => {
        navigate(`recipes/${id}`);
      }}>
      <CardActionArea>
        <CardMedia component='div'>
          <div
            className='w-full h-56 bg-no-repeat bg-cover bg-center'
            style={{
              backgroundImage: `url("${process.env.REACT_APP_IMAGES_URL}${imageUrl}")`,
            }}
          />
        </CardMedia>
        <CardContent className='text-bold'>
          <Typography gutterBottom variant='h6' component='div'>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCart;
