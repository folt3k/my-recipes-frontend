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
  imageUrl: string | null;
  id: string;
  description?: string;
};

const RecipeCart = ({ name, imageUrl, id, description }: Props) => {
  const navigate = useNavigate();
  return (
    <Card
      className='h-[400px] '
      onClick={() => {
        navigate(`recipes/${id}`);
      }}>
      <CardActionArea className='h-full d-flex justify-between items-stretch'>
        <CardMedia component='div'>
          <div
            className='w-full h-full bg-no-repeat bg-cover bg-center'
            style={{
              backgroundImage: `url("${process.env.REACT_APP_IMAGES_URL}${imageUrl}")`,
            }}
          />
        </CardMedia>
        <CardContent className='text-bold h-[30%]'>
          <Typography gutterBottom variant='h6' component='div'>
            {name}
          </Typography>
          {description && (
            <span className='text-gray-dark break-words'>{description}</span>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCart;
