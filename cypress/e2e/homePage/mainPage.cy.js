import mainPage from "../page_objects/main.page"
import searchData from "../../fixtures/searchData.json"
import listingPage from "../page_objects/listing.page"
import websiteDetails from "../../fixtures/mainPage.json"

describe("Main Page functionality", () => {
  beforeEach(() => {
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.errorHandler()
    cy.visit("/");
  });

  it("Should Load main page", () => {
    cy.title().should('eq', websiteDetails.pageTitle);
  });

  it("Should navigate to search page and perform a search", () => {
    mainPage.searchBar.type(`${searchData.searchText}{enter}`)
    listingPage.gigabyteCheckBox.check({force:true})
    cy.url().should('include', searchData.browserUrlData);
    listingPage.searchResult.should('exist').and('be.visible')
   
    
    // cy.get('[id="p_123"]').click()
    // cy.get('[id="219979"]').check()
  });





});
