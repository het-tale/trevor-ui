"use client";
import { Button } from "@/components/Button/Button";
import { Landmark } from "lucide-react";

const ButtonComponent = () => {
	return (
		<div className="m-auto w-[300px] bg-black h-96">
			<Button
				size="S"
				styletype="filled"
				buttontype="withIcon"
				textcolor="#fff"
				backgroundcolor="#2563eb"
				borderradius="0.25rem"
				className="m-auto mt-64 flex"
				width="100%"
				height="50px"
				isLoading={false}
				icon={<Landmark />}
			>
				<p>Hasnaa</p>
				<p>Hasnaa</p>
			</Button>
		</div>
	);
};
export default ButtonComponent;
