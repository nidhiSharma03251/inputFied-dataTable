import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "./DataTable";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};


const StorybookDataTable = (props: any) => (
  <DataTable<User> {...props} />
);

const meta: Meta<typeof StorybookDataTable> = {
  title: "Components/DataTable",
  component: StorybookDataTable,
  tags: ["autodocs"],
  argTypes: {
    loading: {
      control: 'boolean',
    },
    selectable: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof StorybookDataTable>;

const baseArgs = {
  data: [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
    { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'User' },
    { id: 4, name: 'Mary Brown', email: 'mary.brown@example.com', role: 'Editor' },
    { id: 5, name: 'Susan White', email: 'susan.white@example.com', role: 'Admin' },
  ],
  columns: [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'email', title: 'Email', dataIndex: 'email', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  ],
};

export const Default: Story = {
  args: {
    ...baseArgs,
  },
};

export const Selectable: Story = {
  args: {
    ...baseArgs,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    ...baseArgs,
    data: [],
  },
};
