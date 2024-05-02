import { useId } from "react";
import styled from "styled-components";

const Label = styled.label`
  font-weight: 500;
`;

const Input = styled.input`
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  padding: 0.8rem 1.2rem;
  box-shadow: var(-shadow-sm);
`;

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  resize: none;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function ValidatedInputField({
  type,
  name,
  label,
  register,
  error,
  ...props
}) {
  const id = useId();

  return (
    <>
      {label && <Label htmlFor={`${id}-${name}`}>{label}</Label>}

      {type !== "textarea" ? (
        <Input
          type={type}
          id={`${id}-${name}`}
          {...register(name, { valueAsNumber: type === "number" })}
          {...props}
        />
      ) : (
        <Textarea
          id={`${id}-${name}`}
          rows={3}
          {...register(name)}
          {...props}
        ></Textarea>
      )}

      {error && <Error>{error}</Error>}
    </>
  );
}
