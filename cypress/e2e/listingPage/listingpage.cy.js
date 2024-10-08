import mainPage from "../page_objects/main.page";
import listingPage from "../page_objects/listing.page";

describe("Search result test", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.errorHandler();
    cy.visit("/s?k=geforce+rtx+4060");
    
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.reload(); 
 });

  it("Should add an item to the cart and view the cart", () => {
    cy.intercept("POST", "api/marketplaces/ATVPDKIKX0DER/cart/carts/**").as("stableDom");
    listingPage.addToCartButton.click();
    cy.wait("@stableDom", { timeout: 10000 });
    mainPage.cartIcon.click();
    listingPage.itemContent.should('be.visible')
    listingPage.itemTitle.should('include.text','4060')
  });

  it("Should be able to navigate to next search page", () => {
    listingPage.nextPageButton.click();
    cy.url().should("contain", "page=2");
  });
});
