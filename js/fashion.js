// Variable Use In This Website
let showNav = document.querySelector('.open-nav');
let hideNav = document.querySelector('.close-nav');
let links = document.querySelector('.links');
let openSocial = document.querySelector('.social-media');
let goUp = document.querySelector('.scroll-top');
let card = document.querySelector('.card-salah');
let searchIcon = document.querySelector('.icon-search');
let searchBox = document.querySelector('.search-part');
let openCard = document.querySelector('.shopping-card');
let closeCard = document.querySelector('.close-salah');
let quantitySalah = document.querySelector('.quantity');
let darkMode = document.querySelector('.dark-mode');
let lightMode = document.querySelector('.light-mode');
let mainBody = document.getElementsByTagName('body')[0];
let header = document.getElementsByTagName('header')[0];

let about = document.querySelector('.about');
let shopping = document.querySelector('.shopping');
let testimonial = document.querySelector('.testimonial');
let contact = document.querySelector('.contact');
let footer = document.getElementsByTagName('footer')[0];

// Dark Mode 
darkMode.addEventListener('click', () => {
    mainBody.classList.add('dark');
    header.classList.add('dark');
    about.classList.add('dark');
    shopping.classList.add('dark');
    testimonial.classList.add('dark');
    contact.classList.add('dark');
    footer.classList.add('dark');
    darkMode.style.display = 'none';
    lightMode.style.display = 'block';
});

// Light Mode 
lightMode.addEventListener('click', () => {
    mainBody.classList.remove('dark');
    header.classList.remove('dark');
    about.classList.remove('dark');
    shopping.classList.remove('dark');
    testimonial.classList.remove('dark');
    contact.classList.remove('dark');
    footer.classList.remove('dark');
    darkMode.style.display = 'block';
    lightMode.style.display = 'none';
});

// Search Icon
searchIcon.addEventListener('click', () => {
    searchBox.classList.toggle('show-search'); 
})




// Show The Navbar Links
showNav.addEventListener('click', () => {
    showNav.style.display = 'none';
    links.classList.toggle('mobile');
    hideNav.style.display = 'inline-block';
});

// hide The Navbar Links
hideNav.addEventListener('click', () => {
    hideNav.style.display = 'none';
    links.classList.toggle('mobile');
    showNav.style.display = 'inline-block';
}); 

// Open Card Shopping
openCard.addEventListener('click', () => {
    card.classList.add('active');
})

// Close Card Shopping
closeCard.addEventListener('click', () => {
    card.classList.remove('active');
})

// Open Social Media
openSocial.addEventListener('click', () => {
    openSocial.classList.toggle('show-media');
});

// Go To Top Screent
window.onscroll = () => {
    if (window.scrollY >= 900) {
        goUp.style.display = 'block';
    } else {
        goUp.style.display = 'none';
    }      
}
goUp.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// Slider Testimonials Width Swiper Js Plugin
let swiper = new Swiper('.slide-content', {
    slidesPreview: 3,
    spaceBetween: 25,
    loop: true,
    currentSlide: 'true',
    fade: 'true',
    grapCursor: 'true',
    pagination: {
        el: 'swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        520: {
            slidesPerView: 2,
        },
        950: {
            slidesPerView: 3,
        },
    },
});

/* Start Card Shopping Start */

// Check Sure if Dom Content is Loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

// Main Function 
function ready() {

    // Remove Items From Cart
    let removeCartButton = document.getElementsByClassName('remove-card');
    for (let i = 0; i < removeCartButton.length; i++) {
        let button = removeCartButton[i];
        button.addEventListener('click', removeItemCart);
    }

    // Change Quantity Input
    let quantityInput = document.getElementsByClassName('card-quantity');
    for (let i = 0; i < quantityInput.length; i++) {
        let input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }
    
    // Add Product To Cart
    let addToCart = document.getElementsByClassName('add-card');
    for (let i = 0; i < addToCart.length; i++) {
        let button = addToCart[i];
        button.addEventListener('click', addCartClicked);
    }

    // Button Buy Working
    document.getElementsByClassName('btn-buy')[0].addEventListener('click' ,buyButtonClicked )
}

// Remove Items From Cart
function removeItemCart(event) {
    let button = event.target;
    button.parentElement.remove();
    updateTotoal();
}

// Change Quantity Input 
function quantityChanged(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 1) {
        input.value = 1;
    }
    updateTotoal();
}

// Add  To Cart 
function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let productImg = shopProducts.getElementsByClassName('img-shog')[0].src;
    let productTitle = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let productPrice = shopProducts.getElementsByClassName('product-price')[0].innerText;
    
    addProductToCart(productImg, productTitle, productPrice);
    updateTotoal();
}

// Add Product To Cart
function addProductToCart(productImg, productTitle, productPrice) {
    let cardShopBox = document.createElement('div');
    cardShopBox.classList.add('card-box');
    let cardItems = document.getElementsByClassName('card-boxes')[0];
    let cardItemsNames = cardItems.getElementsByClassName('product-title');
    for (let i = 0; i < cardItemsNames.length; i++) {
        if (cardItemsNames[i].innerText == productTitle) {
            
            alert('You have already add this item to cart');
            return;
        }
    }
    let cardBoxContent = `
        <img class="product-img" src="${productImg}" alt="img-cart">
        <div class="detial-box">
            <div class="product-title">${productTitle}</div>
            <div class="product-price">${productPrice}</div>
            <input type="number" value="1" class="card-quantity">
        </div>
        <i class="fa-regular fa-trash-can card-remove"></i>
    `;
    cardShopBox.innerHTML = cardBoxContent;
    cardItems.append(cardShopBox);
    cardShopBox.getElementsByClassName('card-quantity')[0].addEventListener('change', quantityChanged);
    cardShopBox.getElementsByClassName('card-remove')[0].addEventListener('click', removeItemCart);
}


// Button Buy Working
function buyButtonClicked() {
    alert('Your Order is Done! ');
    let cartContent = document.getElementsByClassName('card-boxes')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotoal();
}

// Update Total
function updateTotoal() {
    let total = 0;
    let cardContent = document.getElementsByClassName('card-boxes')[0];
    let cardBoxes = cardContent.getElementsByClassName('card-box');
    for (let i = 0; i < cardBoxes.length; i++) {
        let cardBox = cardBoxes[i];
        let priceProduct = cardBox.getElementsByClassName('product-price')[0];
        let quantityProduct = cardBox.getElementsByClassName('card-quantity')[0];

        let price = parseFloat(priceProduct.innerText.replace('$', ''));
        let quantity = quantityProduct.value;

        total = total + price * quantity;
    }
    // If total conatin sents
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerHTML = '$' + total;
}


/* End Card Shopping Start */

// Add Some Animation

const observer = new IntersectionObserver(enteries => {
    enteries.forEach(entry => {
        // define and get the element to use animation
        const textIntro = entry.target.querySelector('.intro');
        const textDesc = entry.target.querySelector('.description');
        if (entry.isIntersecting) {
            textIntro.classList.add('move-y');
            textDesc.classList.add('move-x');
            return
        }
        textIntro.classList.remove('move-y');
        textDesc.classList.remove('move-x');
    })
});

observer.observe(document.querySelector('.text'));

const observer1 = new IntersectionObserver(enteries => {
    enteries.forEach(entry => {
        // define and get the element to use animation
        const videoShop = entry.target.querySelector('.about-video');
        if (entry.isIntersecting) {
            videoShop.classList.add('scale');
            return
        }
        videoShop.classList.remove('scale');
    })
});

observer1.observe(document.querySelector('.video-box'));

const observer2 = new IntersectionObserver(enteries => {
    enteries.forEach(entry => {
        // define and get the element to use animation
        const cards = entry.target.querySelectorAll('.card-shop');
        if (entry.isIntersecting) {
            cards.forEach(card => {
                card.classList.add('scale');
            })
            return
        }
        cards.forEach(card => {
            card.classList.remove('scale');
        })
    })
});

observer2.observe(document.querySelector('.cards-shop'));