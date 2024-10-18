import { Input } from "@/components/Input/Input";
import { BookOpen } from "lucide-react";

const InputComponent = () => {
	return (
		<div className="w-[300px] m-auto mt-36">
			<Input
				type="text"
				placeholder="Enter your name"
				inputSize="M"
				radius="0.25rem"
				outline="#2563eb"
				headerType="title_description"
				title="Name"
				description="Enter your name Enter your name Enter your name Enter your name Enter your name Enter your name Enter your name Enter your name Enter your name Enter your name Enter your name Enter your name Enter your name"
				placeholderType="textfield_icon"
				// className="m-auto mt-36"
				width="100%"
				maxLength={5}
				icon={<BookOpen />}
			/>
		</div>
	);
};
export default InputComponent;
