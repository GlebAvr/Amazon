class MainPage {
get searchBar() {return cy.get('[name="field-keywords"]')}
get cartIcon() {return cy.get('[id="nav-cart"]')}
}

export default new MainPage()