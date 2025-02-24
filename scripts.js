document.addEventListener("DOMContentLoaded", () => {
    const cart = [];
    const cartContainer = document.querySelector(".bg-white .flex.flex-col.justify-center");
    const cartTitle = document.querySelector(".text-orange-600");
    const addToCartButtons = document.querySelectorAll("button");
    const cartFooter = document.createElement("div");
    cartFooter.classList.add("w-full", "pt-4", "text-center");
    
    const totalPriceElement = document.createElement("p");
    totalPriceElement.classList.add("text-lg", "font-bold");
    cartFooter.appendChild(totalPriceElement);
    
    const confirmButton = document.createElement("button");
    confirmButton.textContent = "Confirm Order";
    confirmButton.classList.add("bg-orange-500", "text-white", "px-4", "py-2", "rounded", "hover:bg-orange-600", "transition", "rounded-full");
    confirmButton.addEventListener("click", () => {
        alert("Order confirmed! Thank you for your purchase.");
        cart.length = 0;
        updateCart();
    });
    cartFooter.appendChild(confirmButton);
    
    addToCartButtons.forEach((button, index) => {
        button.addEventListener("click", () => {
            const productImage = button.previousElementSibling;
            const productName = productImage.alt.replace(/-/g, " ").toUpperCase();
            const productPrice = (Math.random() * (10 - 3) + 3).toFixed(2);
            
            const existingProduct = cart.find(item => item.name === productName);
            if (existingProduct) {
                existingProduct.quantity += 1;
                existingProduct.totalPrice = (existingProduct.quantity * existingProduct.price).toFixed(2);
            } else {
                cart.push({ name: productName, quantity: 1, price: productPrice, totalPrice: productPrice });
            }
            
            updateCart();
        });
    });
    
    function updateCart() {
        cartContainer.innerHTML = "";
        let total = 0;
        
        if (cart.length === 0) {
            cartContainer.innerHTML = `
                <img src="assets/illustration-empty-cart.svg" alt="empty-img">
                Your added items will appear here
            `;
        } else {
            cart.forEach(item => {
                const cartItem = document.createElement("div");
                cartItem.classList.add("flex", "justify-between", "w-full", "py-2", "border-b");
                cartItem.innerHTML = `
                    <span>${item.name} (${item.quantity}) - $${item.totalPrice}</span>
                    <button class="text-red-500 remove-item" data-name="${item.name}">Remove</button>
                `;
                cartContainer.appendChild(cartItem);
                total += parseFloat(item.totalPrice);
            });
            
            totalPriceElement.textContent = `Total Price: $${total.toFixed(2)}`;
            cartContainer.appendChild(cartFooter);
        }
        
        cartTitle.textContent = `Your cart (${cart.length})`;
        attachRemoveEvent();
    }
    
    function attachRemoveEvent() {
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", () => {
                const productName = button.getAttribute("data-name");
                const productIndex = cart.findIndex(item => item.name === productName);
                
                if (productIndex !== -1) {
                    cart.splice(productIndex, 1);
                    updateCart();
                }
            });
        });
    }
});
