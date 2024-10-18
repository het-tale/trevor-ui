"use client";

import * as React from "react";
import { CircleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "../ui/dropdown-menu";
import {
	Select as SelectComp,
	SelectGroup,
	SelectTrigger,
	SelectContent
} from "../ui/select";

interface Option {
	value: string;
	label: string;
}

/**
 * * TitleAndDescription Component
 */
interface TitleAndDescriptionProps {
	title?: string;
	description?: string;
}

const TitleAndDescription: React.FC<TitleAndDescriptionProps> = ({
	title,
	description
}) => (
	<>
		{title && <p className="items-start text-sm font-medium">{title}</p>}
		{description && (
			<p className={cn("font-normal text-[#a3a3a3] text-xs line-clamp-3")}>
				{description}
			</p>
		)}
	</>
);

TitleAndDescription.displayName = "TitleAndDescription";

/**
 * * Trigger Component
 */
interface TriggerProps {
	selectedOptions: string[];
	options: Option[];
	placeholder?: string;
	className?: string;
	disabled?: boolean;
	width?: string;
	borderRadius?: string;
	outline?: string;
	multiSelectText?: string;
	error?: string;
}

const Trigger: React.FC<TriggerProps> = ({
	selectedOptions,
	options,
	placeholder,
	className,
	disabled,
	width,
	borderRadius,
	outline,
	multiSelectText,
	error
}) => {
	const displayText =
		selectedOptions.length === 1
			? options.find((o) => o.value === selectedOptions[0])?.label
			: selectedOptions.length > 1
				? `${selectedOptions.length} ${multiSelectText}`
				: placeholder;

	return (
		<DropdownMenuTrigger asChild>
			<SelectTrigger
				style={{
					minWidth: width,
					borderRadius: borderRadius,
					borderColor: error ? "#ef4444" : outline
				}}
				className={className}
				disabled={disabled}
			>
				<span className="text-sm">{displayText}</span>
			</SelectTrigger>
		</DropdownMenuTrigger>
	);
};

Trigger.displayName = "Trigger";

/**
 * * Item Component
 */
interface ItemProps {
	option: Option;
	isSelected: boolean;
	handleOptionSelect: (option: Option) => void;
	isHovered: boolean;
	setIsHovered: (isHovered: boolean) => void;
	focusColor?: string;
	hoverColor?: string;
	textColor?: string;
	disabled?: boolean;
}

const Item: React.FC<ItemProps> = ({
	option,
	isSelected,
	handleOptionSelect,
	isHovered,
	setIsHovered,
	focusColor,
	hoverColor,
	textColor,
	disabled
}) => {
	return (
		<DropdownMenuCheckboxItem
			key={option.value}
			checked={isSelected}
			onCheckedChange={() => handleOptionSelect(option)}
			disabled={disabled}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			style={{
				backgroundColor: isSelected
					? focusColor
					: isHovered
						? hoverColor
						: "transparent",
				color: isSelected || isHovered ? textColor : "inherit"
			}}
			className="cursor-pointer mb-1"
		>
			{option.label}
		</DropdownMenuCheckboxItem>
	);
};

Item.displayName = "Item";

/**
 * * Content Component
 */
interface ContentProps {
	options: Option[];
	selectedOptions: string[];
	handleOptionSelect: (option: Option) => void;
	limit?: number;
	width?: string;
	borderRadius?: string;
	focusColor?: string;
	hoverColor?: string;
	textColor?: string;
}

const Content: React.FC<ContentProps> = ({
	options,
	selectedOptions,
	handleOptionSelect,
	limit,
	width,
	borderRadius,
	focusColor,
	hoverColor,
	textColor
}) => {
	const [isHoveredIndex, setIsHoveredIndex] = React.useState<number | null>(
		null
	);

	return (
		<SelectContent>
			<DropdownMenuContent
				style={{ minWidth: width, borderRadius: borderRadius }}
			>
				<SelectGroup>
					{options.map((option, index) => (
						<Item
							key={option.value}
							option={option}
							isSelected={selectedOptions.includes(option.value)}
							handleOptionSelect={handleOptionSelect}
							isHovered={isHoveredIndex === index}
							setIsHovered={(isHovered) =>
								setIsHoveredIndex(isHovered ? index : null)
							}
							focusColor={focusColor}
							hoverColor={hoverColor}
							textColor={textColor}
							disabled={
								selectedOptions.length === limit &&
								!selectedOptions.includes(option.value)
							}
						/>
					))}
				</SelectGroup>
			</DropdownMenuContent>
		</SelectContent>
	);
};

Content.displayName = "Content";

/**
 * * ErrorMessage Component
 */
interface ErrorMessageProps {
	errorMessage?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) =>
	errorMessage ? (
		<div className="flex gap-2 items-start">
			<CircleAlert className="text-[#ef3333] flex-shrink-0" size={20} />
			<p className="text-sm text-[#ef3333]">{errorMessage}</p>
		</div>
	) : null;

ErrorMessage.displayName = "ErrorMessage";

/**
 * * Select Component
 */
export interface SelectProps {
	className?: string;
	options?: Option[];
	width?: string;
	height?: string;
	placeholder?: string;
	borderRadius?: string;
	disabled?: boolean;
	title?: string;
	description?: string;
	errorMessage?: string;
	outline?: string;
	limit?: number;
	focus?: string;
	hover?: string;
	color?: string;
	multiSelectText?: string;
}

const clampBorderRadius = (value: string, max: number) => {
	const numericValue = parseFloat(value);
	return `${Math.min(numericValue, max)}px`;
};

const Select: React.FC<SelectProps> = ({
	className,
	options = [],
	width,
	height,
	placeholder,
	borderRadius = "4px",
	disabled,
	title,
	description,
	errorMessage,
	outline,
	limit,
	focus,
	hover,
	color,
	multiSelectText
}) => {
	const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

	const handleOptionSelect = (option: Option) => {
		if (selectedOptions.includes(option.value)) {
			setSelectedOptions(
				selectedOptions.filter((value) => value !== option.value)
			);
		} else {
			if (limit && selectedOptions.length === limit) {
				return;
			}
			setSelectedOptions([...selectedOptions, option.value]);
		}
	};

	const clampedBorderRadius = clampBorderRadius(borderRadius, 14);
	return (
		<div
			className={cn(
				"flex flex-col gap-1.5",
				disabled ? "cursor-not-allowed opacity-50" : ""
			)}
			style={{ maxWidth: width, maxHeight: height }}
		>
			<TitleAndDescription title={title} description={description} />
			<SelectComp>
				<DropdownMenu>
					<Trigger
						selectedOptions={selectedOptions}
						options={options}
						placeholder={placeholder}
						className={className}
						disabled={disabled}
						width={width}
						borderRadius={borderRadius}
						outline={outline}
						multiSelectText={multiSelectText}
						error={errorMessage}
					/>
					<Content
						options={options}
						selectedOptions={selectedOptions}
						handleOptionSelect={handleOptionSelect}
						limit={limit}
						width={width}
						borderRadius={clampedBorderRadius}
						focusColor={focus}
						hoverColor={hover}
						textColor={color}
					/>
				</DropdownMenu>
			</SelectComp>
			<ErrorMessage errorMessage={errorMessage} />
		</div>
	);
};

Select.displayName = "Select";

export { TitleAndDescription, Trigger, Item, Content, ErrorMessage, Select };
