import { Image } from "@/components/image";
import { Link } from "@/components/link";

export const components = {
	a: Link,
	img: Image,
};

export function useMDXComponents(): MDXProvidedComponents {
	return components;
}
