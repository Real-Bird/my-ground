interface FormButtonProps {
  kind: "button" | "submit";
  text: string;
  [key: string]: any;
}

export const FormButton = ({ kind, text, ...rest }: FormButtonProps) => {
  return (
    <button type={kind} {...rest}>
      {text}
    </button>
  );
};
