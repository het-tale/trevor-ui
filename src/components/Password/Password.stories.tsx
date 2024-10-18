import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Password } from "./Password";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Password",
	component: Password,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered"
	},
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	// tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	//   argTypes: {
	//     backgroundColor: { control: 'color' },
	//   },
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
	args: { onClick: fn() }
} satisfies Meta<typeof Password>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		title: "Title",
		description: "This is a brief Description",
		placeholder: "type password",
		width: "327px",
		height: "40px",
		borderRadius: "4px",
		outline: "#0000ff",
		disabled: false,
		errorMessage: "Error Message",
		showText: "Show Password",
		hideText: "Hide Password",
		maxLength: 8,
		inputMode: "numeric"
	}
};
