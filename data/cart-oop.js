const cart = {
    cartItem: undefined,

    loadCart() {
        this.cartItem = JSON.parse(localStorage.getItem('cart')) || [
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 2,
                deliveryOptionsId: '1'
            },
            {
                productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
                quantity: 4,
                deliveryOptionsId: '2'
            }
        ];
    },

    saveToStorage() {
        localStorage.setItem('cart', JSON.stringify(this.cartItem));
    },

    addToCart(productId, selected) {

        let matchingItem;
        this.cartItem.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        if (matchingItem) {
            matchingItem.quantity += selected;
        } else {
            this.cartItem.push({
                productId: productId,

                quantity: selected,
                deliveryOptionsId: '2'
            });
        }

        this.saveToStorage();
    },

    removeFromCart(productId) {
        const newCart = [];
        this.cartItem.forEach((item) => {
            if (item.productId !== productId && item.quantity !== 0) {
                newCart.push(item);
            }

        });

        this.cartItem = newCart;

        this.saveToStorage();
    },

    calculateCartQuantity() {
        this.loadCart();
        let cartQuantity = 0;
        this.cartItem.forEach((product) => {
            cartQuantity += product.quantity;
        });

        return cartQuantity;
    },

    updateQuantity(productId, quantity) {
        let matchingItem;

        this.cartItem.forEach((item) => {
            if (productId === item.productId) {
                matchingItem = item
            }
        });

        matchingItem.quantity = quantity;
        saveToStorage();
    },

    updateDeliveryOptionId(productId, deliveryId) {
        let matchingItem;
        this.cartItem.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        });

        matchingItem.deliveryOptionsId = deliveryId;

        saveToStorage();
    }
};

cart.loadCart();
console.log(cart);