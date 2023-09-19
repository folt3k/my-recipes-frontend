import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

type Props = {
  name: string;
  imageUrl: string;
};

const RecipeCart = ({ name, imageUrl }: Props) => {
  return (
    <Card>
      <CardActionArea>
        <CardMedia component='div'>
          <div
            className='w-full h-56 bg-no-repeat bg-cover'
            style={{ backgroundImage: "url(" + imageUrl + ")" }}
          />
        </CardMedia>
        <CardContent className='capitalize text-bold'>
          <Typography gutterBottom variant='h6' component='div'>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCart;
