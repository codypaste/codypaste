import React, { useState } from "react";
import styled from "styled-components";
import { yupResolver } from "@hookform/resolvers/yup";
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
  password: yup
    .string()
    // eslint-disable-next-line no-template-curly-in-string
    .min(6, "Password must be at least ${min} characters long")
    .required("Password is required"),
  passwordAgain: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const RegisterFormContainer = styled.div`
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

export const RegisterForm = () => {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setIsSubmittingForm(true);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <RegisterFormContainer>
      <FormTitleLabel>Create your account</FormTitleLabel>
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
        <FormControlWithMargin isRequired isInvalid={errors.password}>
          <FormLabel htmlFor="country">Password</FormLabel>
          <Input
            name="password"
            type="password"
            ref={register}
            placeholder="Enter your password"
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControlWithMargin>
        <FormControlWithMargin isRequired isInvalid={errors.passwordAgain}>
          <FormLabel htmlFor="country">Password again</FormLabel>
          <Input
            name="passwordAgain"
            type="password"
            ref={register}
            placeholder="Enter your password again"
          />
          <FormErrorMessage>{errors.passwordAgain?.message}</FormErrorMessage>
        </FormControlWithMargin>
        <FormControlWithMargin>
          <Button
            isDisabled={hasErrors}
            isLoading={isSubmittingForm}
            type="submit"
          >
            Sign up
          </Button>
        </FormControlWithMargin>
      </Form>
    </RegisterFormContainer>
  );
};
