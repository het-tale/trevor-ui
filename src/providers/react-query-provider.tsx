"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * ReactQueryProvider is a higher-order component that wraps the application or a part of it
 * with the QueryClientProvider from 'react-query'. This is necessary to use the features of
 * 'react-query' such as data fetching, caching, synchronization and updates in the child components.
 *
 * @param {Object} props - The properties that define the component.
 * @param {React.ReactNode} props.children - The child components that this provider will wrap.
 *
 * @returns {React.ReactNode} The QueryClientProvider component wrapping the child components.
 */

export default function ReactQueryProvider({
	children
}: {
	children: React.ReactNode;
}) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
