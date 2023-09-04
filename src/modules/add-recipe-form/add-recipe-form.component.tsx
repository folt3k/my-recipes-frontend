import { ThemeProvider } from "@emotion/react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";

import TextInput from "../../common/components/text-input";
import { theme } from "../../common/utils/theme-for-provider";
import { MarkedConverter } from "../../common/components/marked-converter";
import AutoSizeTextInput from "../../common/components/auto-size-textarea.component";

type FormValues = {
  recipeName: string;
  ingredients: string;
  methodOfPreparing: string;
};

const AddRecipeForm = () => {
  const { watch, control, handleSubmit } = useForm<FormValues>();
  const methodOfPreparingToMarked = watch("methodOfPreparing");
  // console.log(marked(methodOfPreparingToMarked));

  const onSubmit = (body: FormValues) => {
    console.log(body);
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={theme}>
          <TextInput
            name='recipeName'
            control={control}
            rules={{
              validate: undefined,
            }}
            label='Nazwa przepisu'
          />
          <TextInput
            name='ingredients'
            control={control}
            rules={{
              validate: undefined,
            }}
            label='Składniki'
          />
          <div className='grid grid-cols-2 grid-rows-1 gap-x-2 h-auto'>
            <AutoSizeTextInput
              type='textarea'
              name='methodOfPreparing'
              control={control}
              rules={{
                validate: undefined,
              }}
              label='Spsób przygotowania'
            />
            <div className='pt-5'>
              <MarkedConverter val={methodOfPreparingToMarked} />
            </div>
          </div>
          <Button type='submit' variant='contained'>
            Zapisz
          </Button>
          <Button variant='outlined'>Anuluj</Button>
        </ThemeProvider>
      </form>
    </div>
  );
};

export default AddRecipeForm;
