class ProductPage {
    get productTitle() {return cy.get('[id="title"] [id="productTitle"]')}
    get productPrice() {return cy.get('[id="corePrice_feature_div"]')}    
    get addToCartButton() {return cy.get('[id="add-to-cart-button"]')}
    get addToCartButton2() {return cy.get('[name="submit.add-to-cart"]')}
    get coveragePopUp() {return cy.get('[id="attach-warranty-header"]')}
    get noThanksButton() {return cy.get('[id="attachSiNoCoverage"]')}
    get addedToCartMessage() {return cy.get('[id="NATC_SMART_WAGON_CONF_MSG_SUCCESS"]')}
    get goToCartButton() {return cy.get('[id="sw-gtc"]')}
    get subtotalCheckoutPrice() {return cy.get('[id="sc-subtotal-amount-activecart"] [class="a-size-medium a-color-base sc-price sc-white-space-nowrap"]')}
    get qtyDropDownButton() {return cy.get('[class="a-dropdown-container"]')}
    get qtyDropDownOption() {return cy.get('[role="listbox"]')}
    get productTitleInCart() {return cy.get('[class="a-truncate sc-grid-item-product-title a-size-base-plus"]')}
    get deleteButton() {return cy.get('[value="Delete"]')}
    get proceedToCheckoutButton() {return cy.get('[data-feature-id="proceed-to-checkout-action"]')}
    }
    
    export default new ProductPage()