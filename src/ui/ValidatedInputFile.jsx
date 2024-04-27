import { useId } from "react";
import styled from "styled-components";

import FormRow from "./FormRow";

const Label = styled.label`
  font-weight: 500;
`;

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }

  &:focus-visible {
    outline-offset: 2px;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

export default function ValidatedInputFile({
  label,
  error,
  field,
  accept = "image/*",
}) {
  const id = useId();
  const { disabled, name, onBlur, onChange, ref } = field;

  return (
    <FormRow>
      {label && <Label htmlFor={`${id}-${name}`}>{label}</Label>}

      <FileInput
        accept={accept}
        id={`${id}-${name}`}
        disabled={disabled}
        name={name}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.files?.[0])}
        ref={ref}
      />

      {error && <Error>{error}</Error>}
    </FormRow>
  );
}
