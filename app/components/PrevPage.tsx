"use client";

import React from "react";
import styled from "styled-components";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const PrevPage = ({ onClick, disabled = false }: Props) => {
  return (
    <StyledPrevPage>
      <button
        className={`submit ${disabled ? "disabled" : ""}`}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        aria-disabled={disabled}
        data-label="prev"
        type="button"
      >
        prev
      </button>
    </StyledPrevPage>
  );
};

const StyledPrevPage = styled.div`
  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    text-transform: uppercase;
    border: 0.1vw solid rgb(50, 50, 50);
    box-shadow: 0 0 0.5vw black, 0 0 0.5vw 0.1vw transparent,
      0vw 0 2vw -0.5vw black, 0vw 0 2vw -0.5vw black,
      0 -1vw 1vw -1vw transparent inset;
    padding: 0.4vw 0.55vw;
    width: 8vw;
    height: 2vw;
    border-radius: 0.2vw;
    cursor: pointer;
    text-shadow: 0.05vw 0 0 white;
    font-size: 0.8vw;
    position: relative;
    overflow: hidden;
    background: rgba(0, 0, 0, 0.8);
    letter-spacing: 0.2vw;
    transition: 0.5s;
  }

  /* Disabled mode (no hover effects) */
  .submit.disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
    background: rgba(70, 70, 70, 0.4);
  }

  /* Use attr(data-label) so pseudo content is read from DOM and cannot mismatch */
  .submit::after,
  .submit::before {
    content: attr(data-label);
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: transparent;
    font-size: 0.8vw;
    text-transform: uppercase;
    /* reduced letter-spacing so initial render is stable */
    letter-spacing: 5.2vw;
    transition: 0.5s;
  }

  .submit::after {
    text-shadow: 1.8vw 1.8vw 1.2vw white;
  }

  .submit::before {
    text-shadow: 1.8vw -2vw 1.2vw white;
    transition: 0.8s;
  }

  .submit:hover:not(.disabled)::after,
  .submit:focus:not(.disabled)::after {
    letter-spacing: 0.28vw;
    text-shadow: 0.08vw 0vw 0 white;
  }

  .submit:hover:not(.disabled)::before,
  .submit:focus:not(.disabled)::before {
    letter-spacing: 0.28vw;
    text-shadow: 0.08vw 0vw 0.08vw white;
  }

  .submit:hover:not(.disabled),
  .submit:focus:not(.disabled) {
    box-shadow: 0 0 2vw black, 0 0 1.2vw 0.1vw black,
      4vw 0 2vw -0.5vw rgb(255, 0, 105),
      -4vw 0 2vw -0.5vw rgb(255, 0, 105),
      0 -1vw 1vw -1vw rgb(255, 0, 105) inset;
    transform: scale(1.15);
    background: rgba(0, 0, 0, 0.2);
    font-size: 1.25vw;
    letter-spacing: 1.28vw;
    padding: 0.4vw 1vw;
    text-shadow: 0 0 2vw white;
    border-bottom: 0.1vw solid rgb(255, 0, 105);
  }
      @media (max-width: 568px) {
    .submit {
      width: 20vw;
      height: 10vw;
      font-size: 3.5vw;
      padding: 2vw 4vw;
      letter-spacing: 1vw;
      border-radius: 1vw;
    }


    .submit:hover:not(.disabled),
    .submit:focus:not(.disabled) {
      font-size: 4vw;
      letter-spacing: 2vw;
      transform: scale(1.05);
    }
  }
`;

export default PrevPage;
