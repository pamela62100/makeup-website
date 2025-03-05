function openLoginModal() {
    const wrapper = document.querySelector(".wrapper");
    const loginLink = document.querySelector(".login-link");
    const registerLink = document.querySelector(".register-link");
    const btnPopup = document.querySelector(".btnlogin");
    const iconClose = document.querySelector(".icon-close");
    registerLink.addEventListener('click', () => {
        wrapper.classList.add('active');
    });
    loginLink.addEventListener('click', () => {
        wrapper.classList.remove('active');
    });
    btnPopup.addEventListener('click', () => {
        wrapper.classList.add('active-popup');
    });
    iconClose.addEventListener('click', () => {
        wrapper.classList.remove('active-popup');
    });
}


function addToCart() {
    let cartItems = [];
    const cart = document.querySelector('.cart');
    const cartSidebar = document.querySelector('.sidebar');
    const cartCount = document.getElementById('count');
    const cartItemContainer = document.getElementById('cartItem');
    const totalDisplay = document.getElementById('total');

    // Product data
    const products = [
        { name: "Foundation", price: 30, image: "images/foundation.jpg" },
        { name: "Lipstick", price: 20, image: "images/lipstick.jpg" },
        { name: "Mascara", price: 25, image: "images/mascara.jpg" },
        { name: "Blush", price: 18, image: "images/blush.jpg" },
        { name: "Powder", price: 18, image: "images/powder.jpg" },
        { name: "Setting spray", price: 17, image: "images/settingspray.jpg" },
        { name: "Highlighter", price: 35, image: "images/highlighter.jpg" },
        { name: "Contour", price: 54, image: "images/contour.jpg" },
        { name: "Eyeliner", price: 22, image: "images/eyeliner.jpg" },
        { name: "Concealer", price: 35, image: "concealer.jpg" },
        { name: "False lashes", price: 5, image: "images/falselashes.jpg" },
        { name: "Makeup remover", price: 13, image: "images/makeupremover.jpg" }
    ];

    // Toggle the cart sidebar when clicked
    cart.addEventListener('click', () => {
        cartSidebar.classList.toggle('active'); // Toggle the 'active' class
    });

    const addToCartButtons = document.querySelectorAll('.product-card button');
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const product = products[index]; // Get the product based on the button clicked
            cartItems.push(product); // Add product to the cart array
            updateCart(); // Update the cart count and items

            // Disable the button and change its text to "Added"
            button.classList.add('active'); // Use 'active' to show it's added to the cart
            button.textContent = 'Added'; // Change the button text to 'Added'
        });
    });

    // Function to update the cart
    function updateCart() {
        // Update the cart count
        cartCount.textContent = cartItems.length;

        // If cart is empty, display message
        if (cartItems.length === 0) {
            cartItemContainer.innerHTML = "Your cart is empty.";
        } else {
            // Display cart items dynamically
            cartItemContainer.innerHTML = cartItems.map((item, index) => {
                return `<div class="cart-item">
                            <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                            <span>${item.name}</span>
                            <span>$${item.price}</span>
                            <button class="remove-item" data-index="${index}">Remove</button>
                        </div>`;
            }).join('');

            // An event listener is added to each "Remove" button.
            // When the button is clicked, the event listener reads the data-index attribute to know which item in the cart to remove.
            // The item is removed from the cartItems array using .splice(index, 1).
            // The cart is updated, and the "Add to Cart" button is reset.
            const removeButtons = document.querySelectorAll('.remove-item');
            removeButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    const index = e.target.dataset.index;
                    cartItems.splice(index, 1); // Remove the item from the cart
                    updateCart(); // Update the cart display after removal

                    // Reset the corresponding 'Add to Cart' button
                    addToCartButtons[index].classList.remove('active');
                    addToCartButtons[index].textContent = 'Add to Cart';
                });
            });
        }

        // Calculate the total price of the cart
        const total = cartItems.reduce((sum, item) => sum + item.price, 0);
        totalDisplay.textContent = `$${total.toFixed(2)}`;
    }
}

// Initial call to set up event listeners and handle cart updates
addToCart();

// Call the function to open the login modal
openLoginModal();