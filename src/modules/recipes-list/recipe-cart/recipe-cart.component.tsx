import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
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
      className="h-[400px]"
      onClick={() => {
        navigate(`recipes/${id}`);
      }}
    >
      <CardActionArea className="h-full flex">
        <div
          className="w-full flex-1 bg-no-repeat bg-cover bg-center"
          style={{
            backgroundImage: `url("${process.env.REACT_APP_IMAGES_URL}${imageUrl}")`,
          }}
        />
        <CardContent className="w-full flex flex-col md:min-h-[120px]">
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          {description && (
            <Typography className="text-gray-dark break-words text-ellipsis overflow-hidden line-clamp-2">
              {description}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default RecipeCart;
