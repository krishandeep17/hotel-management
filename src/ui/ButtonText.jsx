import styled from "styled-components";

const ButtonText = styled.button`
  display: flex;
  align-items: center;
  gap: 0.3rem;

  color: var(--color-brand-600);
  font-weight: 500;
  transition: color 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);

  & svg {
    transition: transform 0.3s;
  }

  &:hover,
  &:active {
    color: var(--color-brand-700);

    & svg {
      transform: translateX(-3px);
    }
  }
`;

export default ButtonText;
