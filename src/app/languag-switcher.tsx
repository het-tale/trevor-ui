import { useRouter } from "next/router";

const LanguageSwitcher = () => {
	const router = useRouter();
	const { locales, pathname, query, asPath } = router;

	return (
		<div>
			{locales?.map((lng) => (
				<button
					key={lng}
					onClick={() =>
						router.push({ pathname, query }, asPath, { locale: lng })
					}
				>
					{lng}
				</button>
			))}
		</div>
	);
};

export default LanguageSwitcher;
