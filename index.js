/*

This is how an item object should look like

{
      id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
      name: "beetroot",
      price: 0.35 <- You can come up with your own prices
    }

*/

function createElm(tag, attObj) {
  const elm = document.createElement(tag);
  for (const key of Object.keys(attObj)) {
    elm[key] = attObj[key];
  }
  return elm;
}

// Create a state object
let state = {
  items: [],
  cart: [],
};

// - Create action functions that update state

function fakeSeverItems() {
  const itemsServer = [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.5,
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.5,
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.5,
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.5,
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.5,
    },
    {
      id: "007-bell-pepper",
      name: "bellpepper",
      price: 0.5,
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.5,
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.5,
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.5,
    },
  ];
  state.items = itemsServer;
  render();
}

function createShopItem(item) {
  const itemEl = document.createElement("li");
  const storeIcon = createElm("div", { className: "store--item-icon" });
  const imgIcon = createElm("img", {
    src: `assets/icons/${item.id}.svg`,
    alt: item.name,
  });
  const addToCartButton = createElm("button", { innerText: "Add to cart" });
  storeIcon.append(imgIcon);
  itemEl.append(storeIcon, addToCartButton);
  addToCartButton.addEventListener("click", function () {
    addItemToCart(item);
    const cartContainer = document.querySelector(".cart--item-list");
    cartContainer.innerHTML = "";
    cartItems();
  });

  return itemEl;
}

function addItemToCart(targetItem) {
  let itemIsInCart = false;
  for (const item of state.cart) {
    if (item.id === targetItem.id) {
      itemIsInCart = true;
      item.quantity++;
    }
  }
  if (!itemIsInCart) {
    const itemToCart = {
      id: targetItem.id,
      name: targetItem.name,
      price: targetItem.price,
      quantity: 1,
    };
    state.cart.push(itemToCart);
  }
}

function createShopItems() {
  const shopItemsList = document.querySelector(".store--item-list");
  for (const item of state.items) {
    const shopitem = createShopItem(item);
    shopItemsList.append(shopitem);
  }
}

function cartItem(item) {
  const itemEl = document.createElement("li");
  const imgEl = createElm("img", {
    classNam: "cart--item-icon",
    src: `assets/icons/${item.id}.svg`,
    alt: item.name,
  });
  const itemName = createElm("p", { innerText: item.name });
  const removeItemBtn = createElm("button", {
    className: "quantity-btn remove-btn center",
    innerText: "-",
  });
  removeItemBtn.addEventListener("click", function () {
    const quantity = (item.quantity -= 1);
    state.cart.quantity = quantity;
    if (quantity <= 0) {
      let itemIndex = state.cart.indexOf(state.cart.id === item.id);
      state.cart.splice(itemIndex, 1);
      return itemEl.remove();
    }
    const ulEl = document.querySelector(".cart--item-list");
    ulEl.innerHTML = "";
    cartItems();
  });
  const quanityOfItems = createElm("span", {
    className: "quantity-text center",
    innerText: item.quantity,
  });
  const addItemBtn = createElm("button", {
    className: "quantity-btn add-btn center",
    innerText: "+",
  });
  addItemBtn.addEventListener("click", function () {
    const quantity = (item.quantity += 1);
    state.cart.quantity = quantity;
    const ulEl = document.querySelector(".cart--item-list");
    ulEl.innerHTML = "";
    console.log(state.cart.quantity);
    cartItems();
  });
  itemEl.append(imgEl, itemName, removeItemBtn, quanityOfItems, addItemBtn);
  return itemEl;
}

function updateCartPrice() {
  const priceEl = document.querySelector(".total-number");
  let priceTotal = 0;
  priceEl.innerText = `£${priceTotal}`;
  for (const itemPrice of state.cart) {
    const price = itemPrice.price;
    const quantity = itemPrice.quantity;
    priceTotal += calculateCartItems(quantity, price);
  }
  priceEl.innerText = `£${priceTotal}`;
}

function calculateCartItems(items, price) {
  return items * price;
}

function cartItems() {
  const cartItemsList = document.querySelector(".cart--item-list");
  updateCartPrice();
  for (const item of state.cart) {
    const cartItemEl = cartItem(item);
    cartItemsList.append(cartItemEl);
  }
}

function render() {
  createShopItems();
  cartItems();
}
function init() {
  render();
  fakeSeverItems();
}

init();
