import colorString from "color-string";

export function colorToRgb(color: string): string | null {
	const rgb = colorString.get.rgb(color);
	if (rgb) {
		return `${rgb[0]}, ${rgb[1]}, ${rgb[2]}`;
	} else {
		return null;
	}
}
