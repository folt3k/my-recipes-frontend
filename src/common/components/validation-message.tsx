import { CustomControlRules } from "../types/form";

type Prop = {
  error: { type?: string; message?: string } | undefined;
  rules: CustomControlRules;
  label: string;
};

const ValidateMesage = ({ error, rules, label }: Prop) => {
  const errorMessage: () => string | null | undefined = () => {
    if (error) {
      switch (error.type) {
        case "required":
          return "To pole jest wymagane";
        case "minLength":
          return `To pole musi posiadać minimum ${rules.minLength} znaków`;
        case "maxLength":
          return `To pole może posiadać maksymalnie ${rules.maxLength} znaków`;
        case "pattern":
          return `Niewłaściwy ${label}`;
        default:
          return error?.message;
      }
    }
  };
  const validateMessage = errorMessage();

  return (
    <div>
      {validateMessage && <p className='text-red'>{validateMessage}</p>}
    </div>
  );
};
export default ValidateMesage;
