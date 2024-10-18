"use client";
import { Password } from "@/components/Password/Password";

const PasswordComponent = () => {
	return (
		<div className="w-[300px] m-auto mt-36">
			<Password
				title="Password"
				description="Enter your password"
				placeholder="Enter your password"
				width="100%"
				borderRadius="0.25rem"
				outline="#2563eb"
				showText="Show"
				hideText="Hide"
				maxLength={5}
			/>
		</div>
	);
};
export default PasswordComponent;
