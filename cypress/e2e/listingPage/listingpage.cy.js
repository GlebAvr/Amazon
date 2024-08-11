import mainPage from "../page_objects/main.page"
import listingPage from "../page_objects/listing.page"

describe("Search result test", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.errorHandler()
    cy.visit('/s?k=geforce+rtx+4060');
  })

  it("Should add an item to the cart and view the cart", () => {
    listingPage.addToCartButton.click()
    cy.wait(1500)
    mainPage.cartIcon.click()
  });

  it("Should be able to navigate to next search page", () => {
    listingPage.nextPageButton.click()
    cy.url().should('contain','page=2')
  });


})