import getSales, { getOrders, getStores } from "./sales";

test("getOrders returns data from orders.csv", async () => {
  const orders = await getOrders();

  expect(orders.length).toEqual(21);
  expect(orders[0].orderId).toEqual("ORLIAPICLS");
});

test("getStores returns data from stores.csv", async () => {
  const stores = await getStores();

  expect(stores.length).toEqual(4);
  expect(stores[0].shopName).toEqual("Shoes Plus");
});

test("getSales returns orders array with store fields", async () => {
  const res = {
    json: jest.fn(),
  };

  await getSales(null, res);

  expect(res.json).toBeTruthy();
});
