"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@/components/Input/Input";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import { BookOpen } from "lucide-react";

interface IFormInput {
	username: string;
}

const FormSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters."
	})
});
const FormPage: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: ""
		}
	});

	const onSubmit: SubmitHandler<IFormInput> = (data: { username: string }) => {
		console.log(data);
	};

	return (
		<div className="p-4">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="flex flex-col gap-4 max-w-md mx-auto"
			>
				<Input
					{...register("username")}
					type="text"
					title="Username"
					description="Please enter your email address Please enter your email address Please enter your email address Please enter your email address Please enter your email address Please enter your email address Please enter your email address Please enter your email address Please enter your email address Please enter your email address Please enter your email address Please enter your email address"
					radius="4px"
					width="100%"
					inputSize="M"
					headerType="title_description"
					placeholder="Enter username"
					placeholderType="textfield_icon"
					icon={<BookOpen />}
					error={errors.username?.message}
				/>
				<button
					type="submit"
					className="py-2 px-4 bg-blue-500 text-white rounded"
				>
					Hello
				</button>
			</form>
		</div>
	);
};

export default FormPage;
