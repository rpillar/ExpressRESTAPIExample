
const orders = [
  {
      _id: "687E047E-7748-11EE-9856-BF1950F20DAD",
      userId: "3FB8CB46-7748-11EE-B82A-FDE3B601D4DF",
      date: "2023-10-10",
      lines: 0
  }
];

const orderLines = [
  {
    _id: "8F35C458-799B-11EE-8A0B-CD06094CEC90",
    orderId: "687E047E-7748-11EE-9856-BF1950F20DAD",
    item: {
      id: "654ADF02-78A1-11EE-B908-867666D56F3B",
      quantity: 1
    },
    paid: true,
    fulfilled: true
  }
]

const items = [
  {
    _id: "654ADF02-78A1-11EE-B908-867666D56F3B",
    name: "Stainless Steel Knife set",
    price: 19.99
  }
]

const users = [
  {
    _id: "3FB8CB46-7748-11EE-B82A-FDE3B601D4DF",
    api_key: "rwuy6434tgdgjhtiojiosi838tjue3",
    username: "johndoe",
    usage: [{ date: "2023-10-10", count: 10 }],
  }
];

const countries = [
  { _id: 1, name: "France" },
  { _id: 2, name: "Italy" },
];

module.exports = { 
  orders, 
  orderLines, 
  items, 
  users, 
  countries 
};