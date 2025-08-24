import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    label: "Full Name",
    placeholder: "e.g. Nidhi Sharma",
  },
};

export const Invalid: Story = {
  args: {
    label: "Email Address",
    placeholder: "e.g. nidhi@example.com",
    invalid: true,
    errorMessage: "Please enter a valid email address",
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    value: "nidhz_rocks",
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    label: "Password",
    loading: true,
    helperText: "Checking password strength...",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Phone Number",
    placeholder: "+91 98765 43210",
    helperText: "Include country code",
  },
};

export const WithClearButton: Story = {
  args: {
    label: "Search",
    placeholder: "Type to clear...",
    showClearButton: true,
  },
};

export const PasswordToggle: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
};
