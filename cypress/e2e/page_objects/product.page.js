class ProductPage {
    get productTitle() {return cy.get('[id="productTitle"]', {timeout: 10000, force: true})}
    get productPrice() {return cy.get('[id="corePrice_feature_div"]', {timeout: 10000})}    
    get addToCartButton() {return cy.get('[id="add-to-cart-button"]', {timeout: 10000})}
    get coveragePopUp() {return cy.get('[id="attach-warranty-header"]')}
    get noThanksButton() {return cy.get('[id="attachSiNoCoverage"]')}
    get addedToCartMessage() {return cy.get('[id="NATC_SMART_WAGON_CONF_MSG_SUCCESS"]', {timeout: 10000})}
    get goToCartButton() {return cy.get('[id="sw-gtc"]', {timeout: 10000})}
    get subtotalCheckoutPrice() {return cy.get('[id="sc-subtotal-amount-activecart"] [class="a-size-medium a-color-base sc-price sc-white-space-nowrap"]')}
    get qtyDropDownButton() {return cy.get('[class="a-dropdown-container"]')}
    get qtyDropDownOption() {return cy.get('[role="listbox"]')}
    get productTitleInCart() {return cy.get('[class="a-truncate sc-grid-item-product-title a-size-base-plus"]')}
    get deleteButton() {return cy.get('[value="Delete"]')}
    get proceedToCheckoutButton() {return cy.get('[data-feature-id="proceed-to-checkout-action"]')}
    }
    
    export default new ProductPage()