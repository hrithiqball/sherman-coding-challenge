import { Request, Response } from "express";
import csv from "csv-parser";
import fs from "fs";

export const getOrders = async () => {
  const orders: any = [];

  await new Promise((resolve: any, reject: any) => {
    fs.createReadStream("./data/orders.csv")
      .pipe(csv())
      .on("data", (data: any) => orders.push(data))
      .on("end", () => resolve());
  });

  return orders;
};

export const getStores = async () => {
  const stores: any = [];

  await new Promise((resolve: any, reject: any) => {
    fs.createReadStream("./data/stores.csv")
      .pipe(csv())
      .on("data", (data: any) => stores.push(data))
      .on("end", () => resolve());
  });

  return stores;
};

const getSales = async (req: Request, res: Response) => {
  try {
    const orders = await getOrders();
    const stores = await getStores();

    if (!orders?.length) {
      return res.send({
        orders: [],
      });
    }

    const paddedOrders = stores?.length
      ? orders.map((order: any) => ({
          ...order,
          store: stores.find((store: any) => store.storeId === order.storeId),
        }))
      : orders;

    return res.json({
      orders: paddedOrders,
    });
  } catch (error) {
    console.log("--------Failed to getSales.", error);
    return res.status(500).json("Internal Server Error");
  }
};

export default getSales;
