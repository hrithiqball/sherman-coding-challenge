import { Table } from "antd";
import { memo, useState, useMemo, useCallback } from "react";
import { parse } from "date-fns";

import { getFlagEmoji } from "../utils";

const OverdueSalesTable = ({ orders = [], isLoading = false }: any) => {
	const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

	const columns = useMemo(
		() => [
			{
				title: "MARKETPLACE",
				render: (record: any) => {
					const flag = getFlagEmoji(record.store.country.slice(0, 2));

					return (
						<div
							style={{
								fontWeight: "normal",
								display: "flex",
								flexDirection: "row",
							}}
						>
							{`${flag} ${record.store.marketplace}`}
						</div>
					);
				},
				responsive: ["md"],
				sorter: (a: any, b: any) =>
					a.store.marketplace.localeCompare(b.store.marketplace),
			},
			{
				title: "STORE",
				render: (record: any) => record.store.shopName,
				responsive: ["md"],
				sorter: (a: any, b: any) =>
					a.store.shopName.localeCompare(b.store.shopName),
			},
			{
				title: "ORDER ID",
				dataIndex: "orderId",
				sorter: (a: any, b: any) => a.orderId.localeCompare(b.orderId),
			},
			{
				title: "ITEMS",
				dataIndex: "items",
				align: "center",
				sorter: (a: any, b: any) => a.items - b.items,
			},
			{
				title: "DESTINATION",
				dataIndex: "destination",
				responsive: ["md"],
				sorter: (a: any, b: any) => a.destination.localeCompare(b.destination),
			},
			{
				title: "DAYS OVERDUE",
				dataIndex: "latest_ship_date",
				render: (record: any) => {
					const today = new Date();

					const date = parse(record, "dd/MM/yyyy", new Date());
					const difference = today.getTime() - date.getTime();
					const days = Math.ceil(difference / (1000 * 3600 * 24));
					return (
						<p
							style={{
								fontWeight: "bold",
								color: today > date ? "red" : "green",
								textAlign: "end",
							}}
						>{`${today > date ? "-" : "+"}${days}`}</p>
					);
				},
				sorter: (a: any, b: any) => {
					const today = new Date();
					const dateA = parse(a.latest_ship_date, "dd/MM/yyyy", new Date());
					const dateB = parse(b.latest_ship_date, "dd/MM/yyyy", new Date());
					const differenceA = today.getTime() - dateA.getTime();
					const differenceB = today.getTime() - dateB.getTime();
					const daysA = Math.ceil(differenceA / (1000 * 3600 * 24));
					const daysB = Math.ceil(differenceB / (1000 * 3600 * 24));
					return daysA - daysB;
				},
			},
			{
				title: "ORDER VALUE",
				dataIndex: "orderValue",
				render: (record: any) => {
					return <p style={{ textAlign: "end" }}>${record}</p>;
				},
				sorter: (a: any, b: any) => a.orderValue - b.orderValue,
			},
			{
				title: "ORDER TAXES",
				dataIndex: "taxes",
				render: (record: any) => {
					return <p style={{ textAlign: "end" }}>{record}%</p>;
				},
				sorter: (a: any, b: any) => a.taxes - b.taxes,
			},
			{
				title: "ORDER TOTAL",
				render: (record: any) => {
					const total =
						record.orderValue * (1 + record.taxes / 100) * record.items;

					return <p style={{ textAlign: "end" }}>${total.toFixed(2)}</p>;
				},
				sorter: (a: any, b: any) => {
					const totalA = a.orderValue * (1 + a.taxes / 100) * a.items;
					const totalB = b.orderValue * (1 + b.taxes / 100) * b.items;
					return totalA - totalB;
				},
			},
		],
		[]
	);

	const onChange = useCallback((current: number, pageSize: number) => {
		setPagination({ current, pageSize });
	}, []);

	const showTotal = useCallback((total: any, range: any) => {
		return `${range[0]} - ${range[1]} of ${total}`;
	}, []);

	const paginationObj = useMemo(
		() => ({
			onChange,
			showTotal,
			pageSizeOptions: [5, 10],
			...pagination,
		}),
		[onChange, pagination, showTotal]
	);

	return (
		<Table
			size="small"
			// @ts-ignore
			columns={columns}
			loading={isLoading}
			dataSource={orders}
			pagination={paginationObj}
		/>
	);
};

export default memo(OverdueSalesTable);
