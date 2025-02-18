// script.js

const products = [
    {
         id: 1,
         name: "Biodegradable Straw",
         price: 5.99,
         image: "https://via.placeholder.com/200/FF5733/FFFFFF?text=Straw",
         description: "Made from natural materials, these straws are perfect for eco-friendly living. They decompose naturally, reducing plastic waste.",
         stock: 10,
         isHotSelling: true,
         category: "kitchen"
     },
     {
         id: 2,
         name: "Reusable Water Bottle",
         price: 12.99,
         image: "https://via.placeholder.com/200/33FF57/FFFFFF?text=Bottle",
         description: "Stay hydrated with this durable, reusable water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. BPA-free.",
         stock: 5,
         isHotSelling: true,
         category: "outdoor"
     },
     {
         id: 3,
         name: "Eco-friendly Lunchbox",
         price: 9.99,
         image: "https://via.placeholder.com/200/5733FF/FFFFFF?text=Lunchbox",
         description: "This sustainable lunchbox is made from recycled materials and helps reduce your reliance on single-use plastics. Leak-proof and easy to clean.",
         stock: 8,
         isHotSelling: false,
         category: "kitchen"
     },
     {
         id: 4,
         name: "Organic Cotton Shopping Bag",
         price: 7.99,
         image: "https://via.placeholder.com/200/FFC300/FFFFFF?text=Bag",
         description: "Ditch plastic bags with this reusable organic cotton shopping bag. Strong and spacious, it's perfect for groceries and everyday errands.",
         stock: 15,
         isHotSelling: true,
         category: "accessories"
     },
     {
         id: 5,
         name: "Bamboo Toothbrush",
         price: 3.99,
         image: "https://via.placeholder.com/200/00C3FF/FFFFFF?text=Toothbrush",
         description: "A sustainable alternative to plastic toothbrushes. Made from biodegradable bamboo, it's gentle on your gums and the environment.",
         stock: 20,
         isHotSelling: false,
         category: "personal-care"
     },
     {
         id: 6,
         name: "Reusable Coffee Cup",
         price: 14.99,
         image: "https://via.placeholder.com/200/C300FF/FFFFFF?text=Cup",
         description: "Enjoy your coffee on the go without the waste. This reusable cup is made from durable, eco-friendly materials.",
         stock: 12,
         isHotSelling: false,
         category: "kitchen"
     }
 ];
 
 let cart = [];
 const deliveryCosts = {
     standard: 5.00,
     express: 10.00
 };
 
 // --- Utility Functions ---
 
 function showSection(sectionId) {
     const sections = document.querySelectorAll('.section');
     sections.forEach(section => section.style.display = 'none');
     document.getElementById(sectionId).style.display = 'block';
 }
 
 function getSelectedDeliveryOption() {
     return document.querySelector('input[name="delivery"]:checked')?.value || 'standard';
 }
 
 function getSelectedPaymentMethod() {
     return document.querySelector('input[name="payment"]:checked')?.value || 'card';
 }
 
 function calculateTotalCost() {
     let subtotal = cart.reduce((total, item) => {
         const product = products.find(p => p.id === item.id);
         return total + (product ? product.price * item.quantity : 0);
     }, 0);
 
     const deliveryOption = getSelectedDeliveryOption();
     const deliveryCost = deliveryCosts[deliveryOption] || 0;
     return subtotal + deliveryCost;
 }
 
 // --- Product Display ---
 
 function displayProducts(filteredProducts = products) {
     const productsContainer = document.getElementById('products-container');
     productsContainer.innerHTML = '';
 
     filteredProducts.forEach(product => {
         const productCard = document.createElement('div');
         productCard.classList.add('product-card');
         productCard.innerHTML = `
             ${product.isHotSelling ? '<span class="hot-badge">Hot!</span>' : ''}
             <img src="${product.image}" alt="${product.name}">
             <h3>${product.name}</h3>
             <p>Price: $${product.price.toFixed(2)}</p>
             <p>Stock: ${product.stock}</p>
             <input type="number" data-product-id="${product.id}" value="1" min="1" max="${product.stock}">
             <button class="add-to-cart-button">Add to Cart</button>
         `;
         productCard.addEventListener('click', (event) => {
             if (!event.target.classList.contains('add-to-cart-button') && event.target.type !== 'number') {
                 showProductDetail(product.id);
             }
         });
         productsContainer.appendChild(productCard);
     });
 
     const addToCartButtons = productsContainer.querySelectorAll('.add-to-cart-button');
     addToCartButtons.forEach(button => {
         button.addEventListener('click', (event) => {
             event.stopPropagation();
             const productId = parseInt(button.previousElementSibling.dataset.productId);
             const quantity = parseInt(button.previousElementSibling.value);
             addToCart(productId, quantity);
         });
     });
 }
 
 // --- Hot Selling Products (Home Page) ---
 
 function displayHotSellingProducts() {
     const container = document.getElementById('hot-products-container');
     container.innerHTML = '';
 
     const hotProducts = products.filter(product => product.isHotSelling);
     hotProducts.forEach(product => {
         const productCard = document.createElement('div');
         productCard.classList.add('product-card');
         productCard.innerHTML = `
             <span class="hot-badge">Hot!</span>
             <img src="${product.image}" alt="${product.name}">
             <h3>${product.name}</h3>
             <p>Price: $${product.price.toFixed(2)}</p>
             <input type="number" data-product-id="${product.id}" value="1" min="1" max="${product.stock}">
             <button class="add-to-cart-button">Add to Cart</button>
         `;
         productCard.addEventListener('click', (event) => {
              if (!event.target.classList.contains('add-to-cart-button') && event.target.type !== 'number') {
                 showProductDetail(product.id);
             }
         });
         container.appendChild(productCard);
     });
 
     const addToCartButtons = container.querySelectorAll('.add-to-cart-button');
     addToCartButtons.forEach(button => {
         button.addEventListener('click', (event) => {
             event.stopPropagation();
             const productId = parseInt(button.previousElementSibling.dataset.productId);
             const quantity = parseInt(button.previousElementSibling.value);
             addToCart(productId, quantity);
         });
     });
 }
 
 function showProductDetail(productId) {
     const product = products.find(p => p.id === productId);
     if (!product) {
         console.error("Product not found:", productId);
         return;
     }
 
     const modalContent = document.getElementById('product-detail-content');
     modalContent.innerHTML = `
         <img src="${product.image}" alt="${product.name}">
         <h3>${product.name}</h3>
         <p>Price: $${product.price.toFixed(2)}</p>
         <p>${product.description}</p>
     `;
 
     displayRelatedProducts(product.category);
     document.getElementById('product-detail-modal').style.display = 'flex';
 }
 
 function closeProductDetailModal() {
     document.getElementById('product-detail-modal').style.display = 'none';
 }
 
 function getProductsByCategory(category) {
     return products.filter(product => product.category === category);
 }
 
 // --- Related Products ---
 
 function displayRelatedProducts(category) {
     const container = document.getElementById('related-products-container').querySelector('.products');
     container.innerHTML = '';
 
     const relatedProducts = getProductsByCategory(category);
     const maxRelatedProducts = 6;
     let count = 0;
 
     for (const relatedProduct of relatedProducts) {
         if (count >= maxRelatedProducts) {
             break;
         }
          if (relatedProduct.id !== product.id) { // Exclude the current product
                 const productCard = document.createElement('div');
                 productCard.classList.add('product-card');
                 productCard.innerHTML = `
                     <img src="${relatedProduct.image}" alt="${relatedProduct.name}" style="width:100px; height:auto;">
                     <h3>${relatedProduct.name}</h3>
                     <p>$${relatedProduct.price.toFixed(2)}</p>
                 `;
                  productCard.addEventListener('click', () => showProductDetail(relatedProduct.id));
                 container.appendChild(productCard);
                 count++;
             }
 
     }
 }
 
 // --- Cart Functions ---
 
 function addToCart(productId, quantity) {
     const product = products.find(p => p.id === productId);
     if (!product) {
         alert('Product not found!');
         return;
     }
     if (quantity <= 0 || quantity > product.stock) {
         alert(`Invalid quantity. Available stock: ${product.stock}`);
         return;
     }
     const existingCartItem = cart.find(item => item.id === productId);
     if (existingCartItem) {
         existingCartItem.quantity += quantity;
     } else {
         cart.push({ id: productId, quantity: quantity });
     }
     product.stock -= quantity;
     updateCheckoutPage();
     updateProductStock(productId, product.stock);
     alert(`Added ${quantity} ${product.name}(s) to cart!`);
 }
 
 function removeFromCart(productId) {
     const cartItemIndex = cart.findIndex(item => item.id === productId);
     if (cartItemIndex === -1) {
         console.error("Item not found in cart:", productId);
         return;
     }
     const cartItem = cart[cartItemIndex];
     const product = products.find(p => p.id === productId);
     if (!product) {
         console.error("Product not found in removeFromCart:", productId);
         return;
     }
     product.stock += cartItem.quantity;
     cart.splice(cartItemIndex, 1);
     updateCheckoutPage();
     updateProductStock(productId, product.stock);
 }
 
 function updateProductStock(productId, newStock) {
     const productCards = document.querySelectorAll('.product-card');
     for (const productCard of productCards) {
         const inputElement = productCard.querySelector(`input[data-product-id="${productId}"]`);
         if (inputElement) {
             const stockElement = productCard.querySelector('p:nth-child(4)');
             if (stockElement) {
                 stockElement.textContent = `Stock: ${newStock}`;
                 inputElement.max = newStock;
                 if (newStock === 0) {
                     inputElement.disabled = true;
                     const addToCartButton = productCard.querySelector('.add-to-cart-button');
                     addToCartButton.disabled = true;
                     addToCartButton.textContent = 'Out of Stock';
                 }
                 return;
             }
         }
     }
 }
 
 // --- Checkout Page ---
 
 function updateCheckoutPage() {
     const checkoutContainer = document.getElementById('checkout-cart-container');
     checkoutContainer.innerHTML = '';
 
     if (cart.length === 0) {
         checkoutContainer.innerHTML = '<p>Your cart is empty.</p>';
         return;
     }
 
     let subtotal = 0;
     cart.forEach(item => {
         const product = products.find(p => p.id === item.id);
         if (!product) {
             console.error("Product not found:", item.id);
             return;
         }
         const itemTotal = product.price * item.quantity;
         subtotal += itemTotal;
         checkoutContainer.innerHTML += `
             <div>
                 <span>${product.name} x ${item.quantity}</span>
                 <span>$${itemTotal.toFixed(2)}</span>
                 <button class="remove-from-cart" data-product-id="${product.id}">Remove</button>
             </div>
         `;
     });
 
     const deliveryCost = deliveryCosts[getSelectedDeliveryOption()] || 0;
     const totalCost = subtotal + deliveryCost;
 
     checkoutContainer.innerHTML += `
         <div><span>Subtotal:</span><span>$${subtotal.toFixed(2)}</span></div>
         <div><span>Delivery (${getSelectedDeliveryOption()}):</span><span>$${deliveryCost.toFixed(2)}</span></div>
         <div><span>Total:</span><span>$${totalCost.toFixed(2)}</span></div>
     `;
     const removeButtons = checkoutContainer.querySelectorAll('.remove-from-cart');
         removeButtons.forEach(button => {
         button.addEventListener('click', () => {
             const productId = parseInt(button.dataset.productId);
                 removeFromCart(productId);
             });
         });
 }
 
 // --- Place Order (Checkout) with Map ---
 
 function placeOrder() {
     if (cart.length === 0) {
         alert('Your cart is empty!');
         return;
     }
 
     const deliveryOption = getSelectedDeliveryOption();
     const paymentMethod = getSelectedPaymentMethod();
     const totalCost = calculateTotalCost();
     const name = document.getElementById('checkout-name').value.trim();
     const address1 = document.getElementById('checkout-address1').value.trim();
     const address2 = document.getElementById('checkout-address2').value.trim();
     const city = document.getElementById('checkout-city').value.trim();
     const state = document.getElementById('checkout-state').value.trim();
     const postalcode = document.getElementById('checkout-postalcode').value.trim();
     const country = document.getElementById('checkout-country').value.trim();
 
     if (!name || !address1 || !city || !state || !postalcode || !country) {
         alert('Please fill in all address fields.');
         return;
     }
 
     // Construct the address string for the map
     const fullAddress = `${address1}, ${address2 ? address2 + ', ' : ''}${city}, ${state} ${postalcode}, ${country}`;
 
     // Generate Google Static Maps URL (replace YOUR_API_KEY with a real key if you deploy this)
     const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(fullAddress)}&zoom=14&size=600x300&maptype=roadmap&markers=color:red%7C${encodeURIComponent(fullAddress)}&key=YOUR_API_KEY`;
 
     // Update the map image src (Checkout Page)
     document.getElementById('checkout-map-image').src = mapUrl;
 
 
     let orderSummary = `Order Summary:\n${cart.map(item => {
         const product = products.find(p => p.id === item.id);
         return `${product.name} x ${item.quantity} - $${(product.price * item.quantity).toFixed(2)}`;
     }).join('\n')}\n\nDelivery: ${deliveryOption} - $${deliveryCosts[deliveryOption].toFixed(2)}\nPayment Method: ${paymentMethod}\nTotal: $${totalCost.toFixed(2)}\n\nShipping to:\n${fullAddress}`;
 
     alert(orderSummary + '\n\nConfirm Order?');
 
     cart = [];
     products.forEach(product => product.stock = getInitialStock(product.id));
     updateCheckoutPage();
     displayProducts();
     showSection('home');
     alert('Order placed!');
 }
 function getInitialStock(productId) {
     // A helper function to get original product stock.  Important for resetting.
     switch (productId) {
         case 1: return 10;
         case 2: return 5;
         case 3: return 8;
         case 4: return 15;
         case 5: return 20;
         case 6: return 12;
         default: return 0;
     }
 }
 // --- Contact Page Map ---
 function showContactPageMap() {
     // Replace with your actual store address and API key
     const storeAddress = "123 Main St, Anytown, CA 91234";
     const apiKey = "YOUR_API_KEY";  // Replace!
     const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(storeAddress)}&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C${encodeURIComponent(storeAddress)}&key=${apiKey}`;
     document.getElementById('contact-map-image').src = mapUrl;
 }
 
 // --- Contact Form ---
 
 const contactForm = document.getElementById('contact-form');
 if (contactForm) {
     contactForm.addEventListener('submit', (event) => {
         event.preventDefault();
         const name = document.getElementById('contact-name').value;
         const email = document.getElementById('contact-email').value;
         const message = document.getElementById('contact-message').value;
         alert(`Thank you, ${name}! (Simulated)`);
         contactForm.reset();
     });
 }
 
 // --- Auth (Login/Signup) ---
 
 const usersKey = 'ecoStoreUsers';
 const loggedInUserKey = 'ecoStoreLoggedInUser';
 
 async function sha256Hash(text) {
     const data = new TextEncoder().encode(text);
     const hashBuffer = await crypto.subtle.digest('SHA-256', data);
     const hashArray = Array.from(new Uint8Array(hashBuffer));
     return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
 }
 
 function isValidUsername(username) { return /^[a-zA-Z0-9_]{3,20}$/.test(username); }
 function isValidPassword(password) { return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(password); }
 function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
 
 // --- Modal Functions ---
 function showLoginModal() {
     const modalContent = document.getElementById('auth-modal-content');
     modalContent.innerHTML = `
         <div class="auth-container">
             <h2>Login</h2>
             <form id="login-form">
                 <div class="form-group">
                     <label for="login-username">Username:</label>
                     <input type="text" id="login-username" required>
                 </div>
                 <div class="form-group">
                     <label for="login-password">Password:</label>
                     <input type="password" id="login-password" required>
                 </div>
                 <div id="login-error-message" class="error-message"></div>
                 <button type="submit">Login</button>
             </form>
             <div class="auth-links">
                 <p>Don't have an account? <a href="#" onclick="showSignupModal()">Sign up</a></p>
                 <p><a href="#" onclick="closeAuthModalAndContinue()">Continue as Guest</a></p>
             </div>
         </div>
     `;
     document.getElementById('auth-modal').style.display = 'flex';
      const loginForm = document.getElementById('login-form'); // Get the form
     loginForm.addEventListener('submit', handleLogin);
 }
 
 function showSignupModal() {
     const modalContent = document.getElementById('auth-modal-content');
     modalContent.innerHTML = `
         <div class="auth-container">
             <h2>Sign Up</h2>
             <form id="signup-form">
                 <div class="form-group">
                     <label for="signup-username">Username:</label>
                     <input type="text" id="signup-username" required>
                 </div>
                 <div class="form-group">
                     <label for="signup-password">Password:</label>
                     <input type="password" id="signup-password" required>
                 </div>
                 <div class="form-group">
                     <label for="signup-email">Email:</label>
                     <input type="email" id="signup-email" required>
                 </div>
                 <div id="signup-error-message" class="error-message"></div>
                 <button type="submit">Sign Up</button>
             </form>
             <div class="auth-links">
                 <p>Already have an account? <a href="#" onclick="showLoginModal()">Login</a></p>
                 <p><a href="#" onclick="closeAuthModalAndContinue()">Continue as Guest</a></p>
             </div>
         </div>
     `;
     document.getElementById('auth-modal').style.display = 'flex';
     const signupForm = document.getElementById('signup-form'); // Get the newly created form
     signupForm.addEventListener('submit', handleSignup);
 }
 
 function closeAuthModal() {
     document.getElementById('auth-modal').style.display = 'none';
 }
 
 function closeAuthModalAndContinue() {
     closeAuthModal();
     showSection('home');
 }
 
 // --- Form Handlers ---
 
 async function handleLogin(event) {
     event.preventDefault();
     const usernameInput = document.getElementById('login-username');
     const passwordInput = document.getElementById('login-password');
     const errorMessage = document.getElementById('login-error-message');
 
     const username = usernameInput.value.trim();
     const password = passwordInput.value.trim();
 
     errorMessage.textContent = ''; // Clear previous errors
 
     if (!username || !password) {
         errorMessage.textContent = 'Please fill in all fields.';
         return;
     }
 
     const users = JSON.parse(localStorage.getItem(usersKey)) || [];
     const user = users.find(user => user.username === username);
 
     if (user) {
         const hashedPassword = await sha256Hash(password);
         if (user.password === hashedPassword) {
             localStorage.setItem(loggedInUserKey, username);
             updateLoginStatus();
             closeAuthModal();
             showSection('home');
             alert('Login successful!');
         } else {
              errorMessage.textContent = 'Invalid password.';
             passwordInput.focus();
         }
     }else{
         errorMessage.textContent = 'Invalid username.';
         usernameInput.focus();
     }
 }
 
 async function handleSignup(event) {
     event.preventDefault();
       const usernameInput = document.getElementById('signup-username');
     const passwordInput = document.getElementById('signup-password');
     const emailInput = document.getElementById('signup-email');
     const errorMessage = document.getElementById('signup-error-message');
 
     const username = usernameInput.value.trim();
     const password = passwordInput.value.trim();
     const email = emailInput.value.trim();
 
     errorMessage.textContent = '';
 
     if (!username || !password || !email) {
         errorMessage.textContent = "All fields are required.";
         return;
     }
     if (!isValidUsername(username)) {
         errorMessage.textContent = "Invalid username.";
         usernameInput.focus();
         return;
     }
     if (!isValidPassword(password)) {
         errorMessage.textContent = "Invalid password.";
         passwordInput.focus();
         return;
     }
     if (!isValidEmail(email)) {
         errorMessage.textContent = "Invalid email.";
         emailInput.focus();
         return;
     }
 
     let users = JSON.parse(localStorage.getItem(usersKey)) || [];
     if (users.find(u => u.username === username)) {
         errorMessage.textContent = "Username already taken.";
         usernameInput.focus();
         return;
     }
 
     const hashedPassword = await sha256Hash(password);
     const newUser = { username, password: hashedPassword, email };
     users.push(newUser);
     localStorage.setItem(usersKey, JSON.stringify(users));
     alert('Signup successful! Please log in.');
     showLoginModal();
 }
 
 // --- Logout ---
 function logout() {
     localStorage.removeItem(loggedInUserKey);
     updateLoginStatus();
      showSection('home')
 }
 
 // --- Profile Icon and Dropdown ---
 
 function toggleProfileDropdown() {
     document.getElementById('profile-dropdown').classList.toggle('show');
 }
 
 window.onclick = function(event) {
     if (!event.target.matches('#profile-icon')) {
         const dropdowns = document.getElementsByClassName("profile-dropdown-content");
         for (let i = 0; i < dropdowns.length; i++) {
             if (dropdowns[i].classList.contains('show')) {
                 dropdowns[i].classList.remove('show');
             }
         }
     }
 }
 
 // --- Update Login Status (UI) ---
 
 function updateLoginStatus() {
     const loggedInUsername = localStorage.getItem(loggedInUserKey);
     const profileIcon = document.getElementById('profile-icon');
      const userNameDisplay = document.getElementById('user-name');
 
     if (loggedInUsername) {
         profileIcon.title = `Logged in as ${loggedInUsername}`;
         userNameDisplay.textContent = `${loggedInUsername}`; // Set the username
     } else {
         profileIcon.title = 'Profile';
          userNameDisplay.textContent = '';
     }
 }
 
 // --- Search Functionality ---
 
 function searchProducts() {
     const searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
     if (!searchTerm) {
         displayProducts();
         return;
     }
     const filteredProducts = products.filter(product =>
         product.name.toLowerCase().includes(searchTerm) ||
         product.description.toLowerCase().includes(searchTerm)
     );
     displayProducts(filteredProducts);
     showSection('products');
 }
 
 // --- Initial Setup ---
 
 function showInitialAuthModal() {
     document.getElementById('auth-modal').style.display = 'flex';
     document.querySelectorAll('.section').forEach(s => s.style.display = 'none');
     document.querySelector('header').style.display = 'flex'; // Keep header visible
 }
 
 // ALWAYS show the auth modal on initial load if no user is logged in.
 // The previous version had a logic error here.
 if (!localStorage.getItem(loggedInUserKey)) {
     showInitialAuthModal();  // ALWAYS show the modal initially
 } else {
     // If a user IS logged in, update the UI and show the home section.
     updateLoginStatus();
     showSection('home');
 }
 
 
 
 // Call these on initial load (after auth modal check)
 displayProducts();
 displayHotSellingProducts();
 showContactPageMap(); // Show the contact page map
 
 // Event listeners
 document.querySelectorAll('#checkout-delivery-options input[name="delivery"]').forEach(radio => {
     radio.addEventListener('change', updateCheckoutPage);
 });
 document.getElementById('search-input').addEventListener('keyup', event => {
     if (event.key === 'Enter') {
         searchProducts();
     }
 });
