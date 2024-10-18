import * as React from "react";
import { Input } from "../Input/Input";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	title: string;
	description?: string;
	errorMessage?: string;
	width?: string;
	height?: string;
	borderRadius?: string;
	outline?: string;
	showText?: string;
	hideText?: string;
	placeholder?: string;
	disabled?: boolean;
}

const Password = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			title,
			description,
			errorMessage,
			width,
			height,
			borderRadius,
			outline,
			showText = "Show",
			hideText = "Hide",
			placeholder,
			disabled,
			maxLength,
			className,
			...props
		},
		ref
	) => {
		const [showPassword, setShowPassword] = React.useState(false);

		const handleToggle = () => {
			setShowPassword((prev) => !prev);
		};

		return (
			<Input
				type={showPassword ? "text" : "password"}
				placeholder={placeholder}
				title={title}
				description={description}
				error={errorMessage}
				width={width}
				height={height}
				radius={borderRadius}
				outline={outline}
				placeholderType="textfield_icon"
				disabled={disabled}
				maxLength={maxLength}
				inputMode="numeric"
				className={className}
				text={
					<span onClick={handleToggle} className="cursor-pointer">
						{showPassword ? hideText : showText}
					</span>
				}
				{...props}
				ref={ref}
			/>
		);
	}
);

Password.displayName = "Password";

export { Password };
