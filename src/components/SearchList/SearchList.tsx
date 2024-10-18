"use client";

import React, {
	useState,
	useRef,
	useEffect,
	ChangeEvent,
	FocusEvent
} from "react";
import { Check, Plus, Search, CircleAlert, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import styled from "styled-components";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "../Button/Button";

const clampBorderRadius = (value: string, max: number) => {
	const numericValue = parseFloat(value);
	return `${Math.min(numericValue, max)}px`;
};

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
 * * ErrorMessage Component
 */
interface ErrorMessageProps {
	errorMessage?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage }) =>
	errorMessage ? (
		<div className="flex gap-2 items-start ">
			<CircleAlert className="text-[#ef3333] flex-shrink-0" size={20} />
			<p className="text-sm text-[#ef3333]">{errorMessage}</p>
		</div>
	) : null;

ErrorMessage.displayName = "ErrorMessage";

/**
 * * Input Component
 */

interface InputProps {
	value?: string;
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	onClick?: () => void;
	isFocused?: boolean;
	isOpen?: boolean;
	outline?: string;
	error?: string;
	radius?: string;
}

const InputField: React.FC<InputProps> = ({
	value,
	onChange,
	placeholder,
	onFocus,
	onBlur,
	onClick,
	isFocused,
	isOpen,
	outline,
	error,
	radius
}) => (
	<div
		className="flex rtl:flex-row-reverse p-2 border rounded-sm cursor-text items-center"
		style={{
			border: error ? "1px solid  #ef4444" : `1px solid ${outline}`,
			borderRadius: radius
		}}
	>
		{isFocused && <Search className="mr-2" color="#d1d5db" />}
		<input
			type="text"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className="w-full border-none outline-none rtl:text-right"
			onFocus={onFocus}
			onBlur={onBlur}
			onClick={onClick}
		/>
		<ChevronDown
			className={cn("cursor-pointer", isOpen ? "rotate-180" : "")}
			onClick={onClick}
		/>
	</div>
);

/**
 * * Option Component
 */
const OptionDiv = styled.div<{
	selected: boolean;
	hover: string;
	focus: string;
	radius: string;
	color: string;
}>`
	display: flex;
	padding: 8px;
	gap: 8px;
	cursor: pointer;
	border-radius: ${({ radius }) => radius};
	background-color: ${({ selected, focus }) =>
		selected ? focus : "transparent"};
	color: ${({ selected, color }) => (selected ? color : "inherit")};

	&:hover {
		background-color: ${({ hover }) => hover};
		color: white;
	}
`;

interface OptionProps {
	option: Option;
	isSelected: boolean;
	handleOptionClick: (option: Option) => void;
	hover: string;
	focus: string;
	radius: string;
	color: string;
}

const Option: React.FC<OptionProps> = ({
	option,
	isSelected,
	handleOptionClick,
	hover,
	focus,
	radius,
	color
}) => (
	<OptionDiv
		selected={isSelected}
		onClick={() => handleOptionClick(option)}
		hover={hover}
		focus={focus}
		radius={radius}
		color={color}
		className="flex rtl:flex-row-reverse items-center text-sm"
	>
		{isSelected && <Check className="h-4 w-4" />}
		<div className={cn(!isSelected ? "ml-4 rtl:mr-4" : "")}>{option.label}</div>
	</OptionDiv>
);

/**
 * * Dropdown Component
 */

interface DropdownProps {
	options: Option[];
	selectedOption: Option | null;
	handleOptionClick: (option: Option) => void;
	height?: string;
	outline?: string;
	radius?: string;
	hover?: string;
	focus?: string;
	color?: string;
	inputValue: string;
	handleCreateOption: () => void;
	saveText?: string;
}

const Dropdown: React.FC<DropdownProps> = ({
	options,
	selectedOption,
	handleOptionClick,
	height,
	outline,
	radius,
	hover,
	focus,
	color,
	inputValue,
	handleCreateOption,
	saveText
}) => (
	<ScrollArea className="rounded-md" style={{ height: height }}>
		<div
			className="bg-white mt-2 z-10 border"
			style={{
				border: `1px solid ${outline}`,
				borderRadius: clampBorderRadius(radius!, 14)
			}}
		>
			{options.length > 0 ? (
				options.map((option) => (
					<Option
						key={option.value}
						option={option}
						isSelected={selectedOption?.value === option.value}
						handleOptionClick={handleOptionClick}
						hover={hover!}
						focus={focus!}
						radius={radius!}
						color={color!}
					/>
				))
			) : (
				<div className="p-2 text-center">
					{inputValue && (
						<Button
							className="flex items-center items-center justify-center "
							backgroundcolor={focus}
							styletype="filled"
							borderradius={radius}
							textcolor={color}
							bordercolor={outline}
							borderwidth={"1px"}
							padding={"8px"}
							width="100%"
							onClick={handleCreateOption}
						>
							<Plus />
							<span>{saveText}</span>
						</Button>
					)}
				</div>
			)}
		</div>
	</ScrollArea>
);

/**
 * * Custom Select Component
 */
interface CustomSelectProps {
	options: Option[];
	placeholder: string;
	width?: string;
	height?: string;
	outline?: string;
	radius?: string;
	hover?: string;
	focus?: string;
	color?: string;
	error?: string;
	saveText?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
	options,
	placeholder,
	width,
	outline,
	radius,
	hover,
	height,
	focus,
	color,
	error,
	saveText
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [inputValue, setInputValue] = useState("");
	const [selectedOption, setSelectedOption] = useState<Option | null>(null);
	const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
	const [originalOptions, setOriginalOptions] = useState<Option[]>(options);
	const [isFocused, setIsFocused] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				containerRef.current &&
				!containerRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
				setIsFocused(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	useEffect(() => {
		setFilteredOptions(
			originalOptions.filter((option) =>
				option.label.toLowerCase().includes(inputValue.toLowerCase())
			)
		);
	}, [inputValue, originalOptions]);

	useEffect(() => {
		setFilteredOptions(originalOptions);
	}, [isFocused, isOpen]);

	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value.replace(/[^a-z0-9\s]/gi, "");
		setInputValue(value);
		setSelectedOption(null);
		setIsOpen(true);
	};

	const handleOptionClick = (option: Option) => {
		if (selectedOption !== null && selectedOption.value === option.value)
			setSelectedOption(null);
		else setSelectedOption(option);
		setInputValue(option.label);
		setIsOpen(false);
	};

	const handleCreateOption = () => {
		const newOption = { value: inputValue.toLowerCase(), label: inputValue };

		setOriginalOptions((prevOptions) => [...prevOptions, newOption]);
		setSelectedOption(newOption);
		setInputValue(newOption.label);
		setIsOpen(false);
		setIsFocused(false);
	};

	const handleFocus = () => {
		setIsFocused(true);
		setIsOpen(true);
	};

	const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
		if (!containerRef.current?.contains(event.relatedTarget)) {
			setIsFocused(false);
		}
	};

	return (
		<div style={{ width: width, maxHeight: height }} ref={containerRef}>
			<InputField
				value={inputValue}
				onChange={handleInputChange}
				placeholder={placeholder}
				onFocus={handleFocus}
				onBlur={handleBlur}
				onClick={() => {
					setIsOpen(!isOpen);
					setIsFocused(!isFocused);
				}}
				isFocused={isFocused}
				isOpen={isOpen}
				outline={outline}
				error={error}
				radius={radius}
			/>
			{isOpen && (
				<Dropdown
					options={filteredOptions}
					selectedOption={selectedOption}
					handleOptionClick={handleOptionClick}
					height={height}
					outline={outline}
					radius={radius}
					hover={hover}
					focus={focus}
					color={color}
					inputValue={inputValue}
					handleCreateOption={handleCreateOption}
					saveText={saveText}
				/>
			)}
		</div>
	);
};

/**
 * * SearchList Component
 */
export interface SearchListProps {
	className?: string;
	options: Option[];
	width?: string;
	height?: string;
	placeholder: string;
	borderRadius?: string;
	disabled?: boolean;
	title?: string;
	description?: string;
	errorMessage?: string;
	outline?: string;
	hover?: string;
	focus?: string;
	color?: string;
	saveText?: string;
}

const SearchList: React.FC<SearchListProps> = ({
	options,
	width,
	height,
	placeholder,
	borderRadius,
	disabled,
	title,
	description,
	errorMessage,
	outline,
	hover,
	focus,
	color,
	saveText
}) => {
	return (
		<div
			className={cn(
				"flex flex-col gap-1.5",
				disabled ? "cursor-not-allowed opacity-50" : ""
			)}
			style={{ maxWidth: width }}
		>
			<TitleAndDescription title={title} description={description} />
			<CustomSelect
				options={options}
				placeholder={placeholder}
				width={width}
				outline={outline}
				radius={borderRadius}
				hover={hover}
				height={height}
				focus={focus}
				color={color}
				error={errorMessage}
				saveText={saveText}
			/>

			<ErrorMessage errorMessage={errorMessage} />
		</div>
	);
};

SearchList.displayName = "SearchList";
export { SearchList };
