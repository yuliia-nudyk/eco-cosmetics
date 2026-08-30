'use strict';

const shopSection = document.querySelector('.page__shop');
const productFlowHashes = [
  '#goods-card',
  '#shipping',
  '#payment',
  '#confirmation'
];

// #region hash-based UI state

window.addEventListener('hashchange', updateMenuVisibility);
window.addEventListener('hashchange', updateShopOverlayVisibility);

function updateMenuVisibility () {
  document.body.classList.toggle(
    'page__body--with-menu',
    window.location.hash === '#menu'
  );
}

function updateShopOverlayVisibility () {
  const isProductFlow = productFlowHashes.includes(window.location.hash);

  document.body.classList.toggle('page__shop--with-menu', isProductFlow);
  shopSection.classList.toggle('page__shop--with-menu', isProductFlow);
}

// #endregion

// #region auto-close menu on desktop

const desktopMediaQuery = window.matchMedia('(min-width: 1280px)');

desktopMediaQuery.addEventListener('change', closeMenuOnDesktop);
closeMenuOnDesktop(desktopMediaQuery);

function closeMenuOnDesktop (event) {
  if (event.matches && window.location.hash === '#menu') {
    window.location.hash = '';
  }
}

// #endregion

//#region categories

const categories = document.querySelectorAll('.shopping-categories__category');
const categoryCards = document.querySelectorAll('.product-cards');
const allProductsButton = document.querySelector('.shop__button');

initCategories();
makeInactive();
categories[0].click();

allProductsButton.addEventListener('click', goToNextCategory);

function initCategories () {
  categories.forEach((category, index) => {
    category.addEventListener('click', () => {
      removeActive();
      makeInactive();

      category.classList.add('shopping-categories__category--active');
      categoryCards[index].classList.remove('product-cards--inactive');
    });
  });
}

function removeActive () {
  categories.forEach(category => {
    category.classList.remove('shopping-categories__category--active');
  });
}

function makeInactive () {
  categoryCards.forEach(card => {
    card.classList.add('product-cards--inactive');
  });
}

function goToNextCategory () {
  const activeIndex = [...categories].findIndex(category =>
    category.classList.contains('shopping-categories__category--active')
  );

  const nextIndex = (activeIndex + 1) % categories.length;

  categories[nextIndex].click();
}

//#endregion

//#region productCardsDetails

const productDetails = {
  1: {
    weight: '100 ml',
    ingredients:
      'Caprylic/Capric Triglyceride, Olea Europaea (Olive) Fruit oil, Vitis Vinifera (Grape) Seed Oil, Prunus Amygdalus Dulcis (Sweet Almond) Oil, Simmondsia Chinensis (Jojoba).',
    application:
      'Shake before use. Apply a small amount of hydrophilic oil on dry skin. Massage for a few minutes, during which time the hydrophilic oil will thoroughly dissolve grease, cosmetics and dirt. Wet your hands with water and massage your face again, turning the oil into an emulsion. Rinse under running water. Then wash with washing foam.'
  },
  2: {
    weight: '113 g',
    ingredients: 'Squalane, Avocado oil',
    application:
      'Apply a small amount of cream with massage movements on the previously cleansed skin of the face, rubbing until completely absorbed'
  },
  3: {
    weight: '138 g',
    ingredients: 'Bamboo, Red clay, Rice powder',
    application:
      'Pour a small amount of powder on your hand, add a little water and dilute to a paste. Apply to a moisturized face, gently spread over the entire face, massage and rinse. Can be applied two to three times a week.'
  },
  4: {
    weight: '200 ml',
    ingredients:
      'SR-SPIDER POLYPEPTIDE-1, PatcH2O, Natural plant ethers and jojoba oil',
    application:
      'Apply a small amount to clean, slightly damp skin. Use the balm every day, morning or evening. Pay special attention to very dry areas such as elbows, knees and feet.'
  },
  5: {
    weight: '250 g',
    ingredients: 'Inulin, Aloe extract, Chamomilla Flower Extract',
    application:
      'Apply a small amount of the product to wet skin with a sponge or hands, after a 1-2 minute massage, rinse thoroughly with water. Suitable for daily use.'
  },
  6: {
    weight: '200 ml',
    ingredients: 'Babassu oil, Rosehip oil, Damask rose absolute',
    application:
      'Apply a small amount of the scrub to previously wet skin. Massage and rinse with warm water.'
  },
  7: {
    weight: '30 g',
    ingredients:
      'cocosulfate, aloe hydrolate, sweet almond oil, wheat proteins, chamomile grass, lavender essential oil.',
    application:
      'Foam the shampoo in your hands and apply foam on the hair or draw a block over wet hair, foam, massage, rinse, apply balm or conditioner.'
  },
  8: {
    weight: '250ml, 50ml',
    ingredients:
      'Micellar Moisturizing Shampoo Aloe Hillary, Multiactive complex with hop cones extract Hillary MULTI-ACTIVE HOP CONES, Hair comb, wooden',
    application:
      'Apply the shampoo with massaging movements on wet hair, lather, leave for 1-2 minutes, then rinse thoroughly with warm water. Repeat twice. Suitable for daily use. Attention! Avoid contact with eyes. In case of contact with eyes, rinse immediately with water.'
  },
  9: {
    weight: '50 ml',
    ingredients:
      'CONSENTRATE SERENOA (SERENOA), Palm tree extract, Arginine, Wheat proteins',
    application:
      'Apply to a clean scalp, paying special attention to the roots of the hair. The product does not require rinsing. It is recommended after application to massage the scalp for several minutes with gentle movements. Use everytime after shampooing.'
  },
  10: {
    weight: '200 g',
    ingredients: 'Bispol Cedarwood & Vanilla',
    application:
      'During the burning, be careful not to place the candle in a draft: the wax could melt unevenly and you risk a decentering of its wick. To avoid the formation of a "well", leave your candle burning until the entire surface is liquid. This will also prevent poor combustion and it will allow maximum scent from it.'
  },
  11: {
    weight: '200 g',
    ingredients: 'Natural soy wax, natural coconut wax, natural perfume oil',
    application:
      'To extinguish the candle , instead of blowing on it, it is possible to extinguish it by dipping the wick in the melted wax using small pliers then straightening it. Recenter it quickly if necessary to prevent the glass from darkening. The wick will thus be coated with wax and ignition will be easier the next time it is used'
  },
  12: {
    weight: '600 g',
    ingredients: 'Coastal Sunset, Solar Ylang, Evening Onyx',
    application:
      "Do not move the candle until the melted wax has set. You can protect your candle from dust and help preserve its scent with a glass bell. Once your candle is consumed, you can clean the glass with hot water, so don't hesitate to reuseyour container for other uses."
  }
};

//#endregion

//#region goods card

const PRODUCT_URL_PARAM = 'product';

initProductCards();
restoreSelectedProductFromURL();

function initProductCards () {
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach(card => {
    card.addEventListener('click', () => {
      const product = getProductDataFromCard(card);

      selectProduct(product);
    });
  });
}

function getProductDataFromCard (card) {
  const id = card.dataset.id;
  const details = productDetails[id];

  return {
    id,
    title: card.querySelector('.product-card__title').textContent,
    price: card.querySelector('.product-card__price').textContent,
    photoSrc: card.querySelector('.product-card__photo').src,
    ...details
  };
}

function selectProduct (product) {
  renderGoodsCard(product);

  const url = new URL(window.location);
  url.searchParams.set(PRODUCT_URL_PARAM, product.id);
  history.replaceState(null, '', url);
}

function renderGoodsCard (product) {
  document.querySelector('.goods-card__title').textContent = product.title;
  document.querySelector('.goods-card__price').textContent = product.price;
  document.querySelector('.goods-card__photo').src = product.photoSrc;
  document.querySelector('.goods-card__weight').textContent = product.weight;
  document.querySelector(
    '.goods-card__ingredients'
  ).textContent = `Ingredients: ${product.ingredients}`;
  document.querySelector(
    '.goods-card__application'
  ).textContent = `Application: ${product.application}`;
}

function restoreSelectedProductFromURL () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get(PRODUCT_URL_PARAM);

  if (id === null) {
    return;
  }

  const card = document.querySelector(`.product-card[data-id="${id}"]`);

  if (card) {
    renderGoodsCard(getProductDataFromCard(card));
  }
}

//#endregion

//#region reset & cleanup

const backToShopButton = document.querySelector('.confirmation__back-button');

backToShopButton.addEventListener('click', resetPurchaseFlow);

function resetPurchaseFlow () {
  document.querySelector('.buying-form').reset();
  document.querySelector('.payment-selection').reset();

  const paymentError = document.querySelector('.payment-selection__error');
  if (paymentError) {
    paymentError.classList.add('hidden');
  }
}

function clearProductParam () {
  const url = new URL(window.location);

  if (url.searchParams.has(PRODUCT_URL_PARAM)) {
    url.searchParams.delete(PRODUCT_URL_PARAM);
    history.replaceState(null, '', url);
  }
}

window.addEventListener('hashchange', () => {
  if (!productFlowHashes.includes(window.location.hash)) {
    clearProductParam();
  }
});

//#endregion

//#region checkout forms

setupFormNavigation('.buying-form', '#payment');
setupPaymentValidation();

function setupFormNavigation (formSelector, nextHash) {
  const form = document.querySelector(formSelector);

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (form.checkValidity()) {
      window.location.hash = nextHash;
    } else {
      form.reportValidity();
    }
  });
}

function setupPaymentValidation () {
  const paymentForm = document.querySelector('.payment-selection');
  const errorMessage = document.querySelector('.payment-selection__error');
  const paymentInputs = document.querySelectorAll(
    'input[name="payment-methods"]'
  );

  paymentInputs.forEach(input => {
    input.addEventListener('change', () => {
      errorMessage.classList.add('hidden');
    });
  });

  paymentForm.addEventListener('submit', event => {
    event.preventDefault();

    const isSelected = [...paymentInputs].some(input => input.checked);

    if (isSelected) {
      window.location.hash = '#confirmation';
    } else {
      errorMessage.classList.remove('hidden');
    }
  });
}

//#endregion

//#region contact form

const contactForm = document.querySelector('.form');

contactForm.addEventListener('submit', function (event) {
  event.preventDefault();
  contactForm.reset();
});

//#endregion
