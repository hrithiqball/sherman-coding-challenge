import { Row, Typography } from "antd";
import { memo, useState, useEffect } from "react";

import config from "../config";
import { formatOrders } from "../utils";
import OverdueSalesTable from "./OverdueSalesTable";

const OverdueSales = ({ style }: any) => {
	const [orders, setOrders] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [subTotal, setSubTotal] = useState("");
	const [taxTotal, setTaxTotal] = useState("");
	const [total, setTotal] = useState("");

	useEffect(() => {
		(async () => {
			function calculateTotal(orders: any) {
				let subTotal = 0;
				let taxTotal = 0;
				let total = 0;

				orders.forEach((order: any) => {
					const orderSubtotal = order.items * order.orderValue;
					subTotal += orderSubtotal;

					const orderTax = orderSubtotal * (order.taxes / 100);
					taxTotal += orderTax;

					const grandTotal = orderSubtotal + orderTax;
					total += grandTotal;
				});

				console.log(taxTotal);

				return {
					subTotal: subTotal.toFixed(2),
					taxTotal: taxTotal.toFixed(2),
					total: total.toFixed(2),
				};
			}

			try {
				setIsLoading(true);
				const resp = await fetch(`${config.apiUrl}/sales`, {
					method: "GET",
				});

				const body = await resp.json();

				if (!body?.orders?.length) {
					return setIsLoading(false);
				}

				setOrders(formatOrders(body.orders));

				const { subTotal, taxTotal, total } = calculateTotal(body.orders);
				setSubTotal(subTotal);
				setTaxTotal(taxTotal);
				setTotal(total);
				setIsLoading(false);
			} catch (error) {
				console.error("--------query sales error", error);
				setIsLoading(false);
			}
		})();
	}, []);

	return (
		<Row style={style}>
			<Typography.Paragraph strong>Overdue Orders</Typography.Paragraph>
			<OverdueSalesTable isLoading={isLoading} orders={orders} />

			<Typography.Paragraph>All Orders</Typography.Paragraph>

			<Typography.Paragraph
				style={{ display: "flex", flexDirection: "column" }}
			>
				<Typography.Text>
					Sub Total: <Typography.Text strong>${subTotal}</Typography.Text>
				</Typography.Text>
				<Typography.Text>
					Tax Total: <Typography.Text strong>${taxTotal}</Typography.Text>
				</Typography.Text>
				<Typography.Text>
					Total: <Typography.Text strong>${total}</Typography.Text>
				</Typography.Text>
			</Typography.Paragraph>
		</Row>
	);
};

export default memo(OverdueSales);
