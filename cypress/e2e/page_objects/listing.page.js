class ListingPage {
        get searchResult() {return cy.get('[data-component-type="s-search-result"]')}
        get gigabyteCheckBox() {return  cy.get('[id="brandsRefinements"] [aria-label="GIGABYTE"] [type="checkbox"]')}
        get productLink() {return cy.get('[class="a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal"]')}
        get nextPageButton() {return cy.get('[class="s-pagination-item s-pagination-next s-pagination-button s-pagination-separator"]')}
        get addToCartButton() {return cy.get('[id="a-autoid-1-announce"]')}
        get itemContent() {return cy.get('[class="sc-list-item-content"]')}
        get itemTitle() {return cy.get('[class="a-truncate-cut"]')}
            }
    
    export default new ListingPage()