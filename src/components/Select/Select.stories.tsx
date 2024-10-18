import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Select",
	component: Select,
	parameters: {
		// Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
		layout: "centered"
	}
	// This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
	// tags: ['autodocs'],
	// More on argTypes: https://storybook.js.org/docs/api/argtypes
	//   argTypes: {
	//     backgroundColor: { control: 'color' },
	//   },
	// Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		title: "Select",
		placeholder: "placeholder",
		width: "327px",
		height: "40px",
		borderRadius: "4px",
		disabled: false,
		outline: "#0000ff",
		options: [
			{ value: "react", label: "React" },
			{ value: "vue", label: "Vue" },
			{ value: "angular", label: "Angular" },
			{ value: "next", label: "Next" }
		],
		focus: "#00ff00",
		color: "#ffffff",
		hover: "#ff0000",
		multiSelectText: "Select multiple options"
	}
};
