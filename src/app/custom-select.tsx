import React, {
	useState,
	useRef,
	useEffect,
	ChangeEvent,
	FocusEvent
} from "react";
import "./CustomSelect.css";
import { Check, Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface Option {
	value: string;
	label: string;
}

interface CustomSelectProps {
	options: Option[];
	placeholder: string;
	width: string;
	outline?: string;
	radius?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
	options,
	placeholder,
	width,
	outline,
	radius
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
		<div style={{ width: width }} ref={containerRef}>
			<div
				className="flex p-2 border rounded-sm cursor-text items-center"
				style={{ border: `1px solid ${outline}`, borderRadius: radius }}
			>
				{isFocused && <Search className="custom-select__icon" />}
				<input
					type="text"
					value={inputValue}
					onChange={handleInputChange}
					placeholder={placeholder}
					className="custom-select__input"
					onFocus={handleFocus}
					onBlur={handleBlur}
				/>
			</div>
			{isOpen && (
				<div className="custom-select__menu">
					{filteredOptions.length > 0 ? (
						filteredOptions.map((option) => (
							<div
								key={option.value}
								className="custom-select__option flex gap-1"
								onClick={() => handleOptionClick(option)}
							>
								<span>
									{selectedOption?.value === option.value && <Check />}
								</span>
								<span
									className={cn(
										selectedOption?.value !== option.value ? "ml-6" : ""
									)}
								>
									{option.label}
								</span>
							</div>
						))
					) : (
						<div className="custom-select__no-options">
							{inputValue && (
								<button
									onClick={handleCreateOption}
									className="custom-select__create-option"
								>
									<Plus /> Save my input
								</button>
							)}
						</div>
					)}
				</div>
			)}
		</div>
	);
};

export default CustomSelect;
