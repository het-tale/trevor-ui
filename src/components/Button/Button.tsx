import * as React from "react";
import styled, { css } from "styled-components";
import { cn } from "@/lib/utils";
import { FiLoader } from "react-icons/fi";
import { colorToRgb } from "@/utils/color";

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	asChild?: boolean;
	size?: "XS" | "S" | "M" | "L" | "XL";
	styletype?: "filled" | "outlined";
	buttontype?: "default" | "withIcon" | "onlyIcon";
	isLoading?: boolean;
	backgroundcolor?: string;
	textcolor?: string;
	bordercolor?: string;
	borderwidth?: string;
	borderradius?: string;
	padding?: string;
	width?: string;
	height?: string;
	disabled?: boolean;
	icon?: React.ReactNode;
	children?: React.ReactNode;
}

const sizes = {
	XS: "8px 12px",
	S: "16px 24px",
	M: "24px 36px",
	L: "32px 48px",
	XL: "40px 60px"
};

const StyledButton = styled.button<ButtonProps>`
	background-color: ${(props) =>
		props.styletype === "filled"
			? props.backgroundcolor
				? props.backgroundcolor
				: "#000"
			: "transparent"};
	color: ${(props) =>
		props.backgroundcolor === "transparent" ? "#000" : props.textcolor};
	border: ${(props) =>
		props.styletype === "outlined"
			? `solid ${props.borderwidth || "1px"} ${props.bordercolor}`
			: "none"};
	border-radius: ${(props) => props.borderradius};
	padding: ${(props) =>
		props.padding
			? props.padding
			: props.size
				? sizes[props.size]
				: sizes["S"]};
	min-width: ${(props) => props.width};
	min-height: ${(props) => props.height};

	&:hover {
		${(props) =>
			!props.disabled &&
			props.styletype === "filled" &&
			css`
				background-color: rgba(
					${colorToRgb(props.backgroundcolor || "#000")},
					0.8
				);
			`}
		${(props) =>
			!props.disabled &&
			props.styletype === "outlined" &&
			css`
				border-color: rgba(${colorToRgb(props.bordercolor || "")}, 0.8);
			`}
	}

	${(props) =>
		props.disabled &&
		css`
			opacity: 0.6;
			cursor: not-allowed;
		`}

	${(props) =>
		props.buttontype === "onlyIcon" &&
		css`
			padding: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		`}
`;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{ className, buttontype = "default", isLoading, icon, children, ...props },
		ref
	) => {
		const Comp = StyledButton;

		const renderContent = () => {
			if (isLoading) {
				return <FiLoader className="motion-safe:animate-spin" role="img" />;
			}
			if (buttontype === "onlyIcon" && icon) {
				return icon;
			}
			if (buttontype === "withIcon" && icon) {
				return (
					<div className="flex gap-2 rtl:flex-row-reverse">
						{icon}
						<span>{children}</span>
					</div>
				);
			}
			return children;
		};
		return (
			<Comp
				className={cn(
					"flex items-center justify-center space-x-2",
					`${className}`
				)}
				ref={ref}
				{...props}
			>
				{renderContent()}
			</Comp>
		);
	}
);

Button.displayName = "Button";

export { Button };
