export const formatOrders = (orders: any) => {
	if (!orders?.length) return;

	return orders.map((order: any, index: number) => {
		return {
			key: `${order.Id}-${index}`,
			...order,
		};
	});
};

export const getFlagEmoji = (countryCode: string) => {
	if (!countryCode) return;

	const codePoints = countryCode
		.trim()
		.toUpperCase()
		.split("")
		.map((char: string) => 127397 + char.charCodeAt(0));
	return String.fromCodePoint(...codePoints);
};
