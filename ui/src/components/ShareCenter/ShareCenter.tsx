import React, { useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  Checkbox,
  Select,
} from "@chakra-ui/core";

const FormControlWithMargin = styled(FormControl)`
  margin-block-end: 1rem;

  :last-of-type {
    margin-block-end: 0;
  }
`;

const ShareCenterContainer = styled.div`
  padding: 1rem;
  height: 100%;
`;

export const ShareCenter = () => {
  const [isSubmittingForm, setIsSubmittingForm] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    // resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    setIsSubmittingForm(true);
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <ShareCenterContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControlWithMargin isInvalid={errors.title}>
          <FormLabel htmlFor="country">Title</FormLabel>
          <Input name="title" ref={register} placeholder="Untitled project" />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControlWithMargin>
        <FormControlWithMargin>
          <Checkbox size="lg">Secure with password</Checkbox>
        </FormControlWithMargin>
        <FormControlWithMargin>
          <Checkbox size="lg" defaultIsChecked>
            Encrypt
          </Checkbox>
        </FormControlWithMargin>
        <FormControlWithMargin>
          <Checkbox size="lg" defaultIsChecked>
            Save to your collection
          </Checkbox>
        </FormControlWithMargin>
        <FormControlWithMargin>
          <FormLabel htmlFor="deleteAfter">Delete after</FormLabel>
          <Select id="deleteAfter">
            <option value="option1">Never - keep forever</option>
            <option value="option1">Delete on first visit</option>
            <option value="option2">5 minutes</option>
            <option value="option3">15 minutes</option>
            <option value="option3">1 hour</option>
            <option value="option3">12 hours</option>
            <option value="option3">1 day</option>
            <option value="option3">30 days</option>
            <option value="option3">3 months</option>
            <option value="option3">6 months</option>
            <option value="option3">1 year</option>
          </Select>
        </FormControlWithMargin>
        <FormControlWithMargin>
          <Button
            variantColor="red"
            isDisabled={hasErrors}
            isLoading={isSubmittingForm}
            type="submit"
          >
            Create
          </Button>
        </FormControlWithMargin>
      </form>
    </ShareCenterContainer>
  );
};
