import React, { useState } from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers";
import { useForm } from "react-hook-form";
import { mediaBreakpoints } from "config/styles";
import * as yup from "yup";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from "@chakra-ui/core";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail address must be valid")
    .required("E-mail is required"),
  password: yup.string().required("Password is required"),
});

const LoginFormContainer = styled.div`
  display: grid;
  grid-template:
    "label"
    "form";
  padding-inline-start: 0.5rem;
  padding-inline-end: 0.5rem;

  @media only screen and (min-width: ${mediaBreakpoints.xlarge}) {
    padding-inline-start: 2rem;
    padding-inline-end: 2rem;
  }
`;

const FormTitleLabel = styled.span`
  grid-area: label;
  font-weight: bold;
  margin-block-end: 1rem;
`;

const Form = styled.form`
  grid-area: form;
  margin-block-end: 0.5rem;

  @media only screen and (min-width: ${mediaBreakpoints.xlarge}) {
    margin-block-end: 2rem;
  }
`;

const FormControlWithMargin = styled(FormControl)`
  margin-block-end: 1rem;

  :last-of-type {
    margin-block-end: 0;
  }
`;

export const LoginForm = () => {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setIsSubmittingForm(true);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <LoginFormContainer>
      <FormTitleLabel>Sign in to your account</FormTitleLabel>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormControlWithMargin isRequired isInvalid={errors.email}>
          <FormLabel htmlFor="country">E-mail address</FormLabel>
          <Input
            name="email"
            ref={register}
            placeholder="Enter your e-mail address"
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControlWithMargin>
        <FormControlWithMargin isRequired>
          <FormLabel htmlFor="country">Password</FormLabel>
          <Input
            name="password"
            type="password"
            ref={register}
            placeholder="Enter your password"
          />
        </FormControlWithMargin>
        <FormControlWithMargin>
          <Button
            isDisabled={hasErrors}
            isLoading={isSubmittingForm}
            type="submit"
          >
            Sign in
          </Button>
        </FormControlWithMargin>
        <FormControlWithMargin>
          <Button variant="link">Forgot password?</Button>
        </FormControlWithMargin>
      </Form>
    </LoginFormContainer>
  );
};
