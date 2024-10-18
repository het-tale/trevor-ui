import * as React from "react";
import { cn } from "@/lib/utils";
import { CircleAlert } from "lucide-react";

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	title?: string;
	description?: string;
	error?: string;
	width?: string;
	height?: string;
	radius?: string;
	icon?: React.ReactNode;
	context?: string;
	outline?: string;
	inputSize?: "XS" | "S" | "M" | "L" | "XL";
	headerType?: "title" | "title_description";
	placeholderType?: "textfield" | "textfield_icon" | "textfield_context";
	maxLength?: number;
	inputMode?:
		| "none"
		| "search"
		| "text"
		| "tel"
		| "url"
		| "email"
		| "numeric"
		| "decimal"
		| undefined;
	text?: React.ReactNode;
}

const sizeClasses = {
	XS: "text-xs",
	S: "text-sm",
	M: "text-base",
	L: "text-lg",
	XL: "text-xl"
};

const calculatePadding = (borderRadius?: string) => {
	const radius = borderRadius ? parseInt(borderRadius, 10) : 0;
	if (radius >= 16) return "px-4";
	if (radius >= 12) return "px-3.5";
	if (radius >= 8) return "px-3";
	return "py-2 px-2";
};

/**
 * * Header Component
 */
const Header = ({
	title,
	description,
	headerType
}: {
	title?: string;
	description?: string;
	headerType: "title" | "title_description";
}) => (
	<>
		{headerType === "title" && title && (
			<p className="font-bold text-sm font-medium text-[#0a0a0a] rtl:text-right">
				{title}
			</p>
		)}
		{headerType === "title_description" && title && (
			<>
				<p className="font-bold text-sm font-medium text-[#0a0a0a] rtl:text-right">
					{title}
				</p>
				{description && (
					<p className="font-normal text-[#a3a3a3] text-xs rtl:text-right line-clamp-3">
						{description}
					</p>
				)}
			</>
		)}
	</>
);

Header.displayName = "Header";

/**
 * * Input Field Component
 */
export interface InputFieldProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	title?: string;
	description?: string;
	error?: string;
	width?: string;
	height?: string;
	radius?: string;
	icon?: React.ReactNode;
	context?: string;
	outline?: string;
	inputSize?: "XS" | "S" | "M" | "L" | "XL";
	headerType?: "title" | "title_description";
	placeholderType?: "textfield" | "textfield_icon" | "textfield_context";
	maxLength?: number;
	inputMode?:
		| "none"
		| "search"
		| "text"
		| "tel"
		| "url"
		| "email"
		| "numeric"
		| "decimal"
		| undefined;
	paddingClasses?: string;
}

const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
	(
		{
			type,
			maxLength,
			inputMode,
			className,
			paddingClasses,
			placeholder,
			radius,
			outline,
			inputSize,
			error,
			...props
		},
		ref
	) => (
		<input
			type={type}
			maxLength={maxLength}
			inputMode={inputMode}
			className={cn(
				"flex rounded-md bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#9ca3af] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 rtl:text-right",
				sizeClasses[inputSize!],
				paddingClasses,
				className,
				error ? "border-[#ef4444]" : "border-slate-200"
			)}
			placeholder={placeholder}
			ref={ref}
			style={{ borderRadius: radius, borderColor: error ? "#ef4444" : outline }}
			{...props}
		/>
	)
);
InputField.displayName = "InputField";

/**
 * * Placeholder with icon Component
 */
const PlaceholderIcon = ({
	icon,
	paddingClasses
}: {
	icon: React.ReactNode;
	paddingClasses: string;
}) => (
	<div className={cn("py-2 text-[#9ca3af] text-xs", paddingClasses)}>
		{icon}
	</div>
);
PlaceholderIcon.displayName = "PlaceholderIcon";
/**
 * * Placeholder with Text Component
 */
const PlaceholderText = ({
	text
}: {
	text: React.ReactNode;
	borderRadius: string;
}) => <div className={cn("py-2.5 text-[#9ca3af] text-xs px-2")}>{text}</div>;
/**
 * * placeholder with context Component
 */
const PlaceholderContext = ({
	context,
	paddingClasses
}: {
	context: string;
	paddingClasses: string;
}) => (
	<div className="flex gap-2 rtl:flex-row-reverse">
		<div className="border-r border-[#9ca3af] mt-1 mb-1 h-8"></div>
		<p className={cn("py-2 text-[#9ca3af]", paddingClasses)}>{context}</p>
	</div>
);
PlaceholderContext.displayName = "PlaceholderContext";

/**
 * * ErrorMessage Component
 */

const ErrorMessage = ({ error }: { error: string }) => (
	<div className="flex gap-2 items-start rtl:flex-row-reverse">
		<CircleAlert className="text-[#ef3333] flex-shrink-0" size={20} />
		<p className="text-sm text-[#ef3333]">{error}</p>
	</div>
);

ErrorMessage.displayName = "ErrorMessage";

/**
 * * Input Component
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
	(
		{
			className,
			type,
			inputSize = "M",
			headerType = "title",
			placeholderType = "textfield",
			title,
			description,
			error,
			width,
			height,
			radius,
			icon,
			context,
			outline,
			maxLength,
			inputMode,
			placeholder,
			text,
			...props
		},
		ref
	) => {
		const paddingClasses = calculatePadding(radius);

		return (
			<div
				className={cn(
					"flex flex-col gap-1.5",
					props.disabled && "cursor-not-allowed opacity-30",
					className
				)}
				style={{ maxWidth: width, maxHeight: height }}
			>
				<Header
					title={title}
					description={description}
					headerType={headerType}
				/>
				{["textfield_icon", "textfield_context"].includes(placeholderType) ? (
					<div
						className={cn(
							"relative flex rtl:flex-row-reverse justify-between px-1 border",
							error ? "border-[#ef4444]" : "border-slate-200"
						)}
						style={{
							borderRadius: radius,
							minWidth: width,
							minHeight: height,
							borderColor: error ? "#ef4444" : outline
						}}
					>
						<InputField
							type={type}
							maxLength={maxLength}
							inputMode={inputMode}
							inputSize={inputSize}
							paddingClasses={paddingClasses}
							placeholder={placeholder}
							radius={radius}
							outline={outline}
							error={error}
							{...props}
							ref={ref}
						/>
						{icon && !context && !text && (
							<PlaceholderIcon icon={icon} paddingClasses={paddingClasses} />
						)}
						{context && !icon && !text && (
							<PlaceholderContext
								context={context}
								paddingClasses={paddingClasses}
							/>
						)}
						{text && !context && !icon && (
							<PlaceholderText text={text} borderRadius={radius!} />
						)}
					</div>
				) : (
					<InputField
						type={type}
						maxLength={maxLength}
						inputMode={inputMode}
						inputSize={inputSize}
						paddingClasses={paddingClasses}
						placeholder={placeholder}
						radius={radius}
						outline={outline}
						error={error}
						{...props}
						ref={ref}
					/>
				)}
				{error && <ErrorMessage error={error} />}
			</div>
		);
	}
);

Input.displayName = "Input";

export {
	Input,
	Header,
	PlaceholderIcon,
	PlaceholderContext,
	ErrorMessage,
	InputField
};
