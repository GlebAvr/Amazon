import websiteDetails from "../../fixtures/mainPage.json"
import productPage from "../page_objects/product.page";

describe("Cart actions", () => {
  beforeEach(() => {
    cy.errorHandler();
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.visit("dp/B0CL61F39H?ref=cm_sw_r_cp_ud_dp_940FB5F25FKW0XRRR0V4&ref_=cm_sw_r_cp_ud_dp_940FB5F25FKW0XRRR0V4&social_share=cm_sw_r_cp_ud_dp_940FB5F25FKW0XRRR0V4&th=1");
  });

  it("Should see product details", () => {
    productPage.productTitle.should("contain", "        PlayStation®5 console (slim)       ");
    productPage.productPrice.should("be.visible").and("exist");
  });

  it("Should add to cart and change q-ty", () => {
    productPage.addToCartButton.click();
    productPage.coveragePopUp.should("be.visible").and("contain", " Add to your order ");
    productPage.noThanksButton.click();
    productPage.addedToCartMessage
      .should("be.visible")
      .and(
        "contain",
        `
        
            Added to Cart
        
    `
      );
    productPage.goToCartButton.click();
    cy.url().should("contain", websiteDetails.cartLink);
    productPage.productTitleInCart.should("contain", "PlayStation®5 console (slim)");
    productPage.subtotalCheckoutPrice
      .invoke("text")
      .then((priceText) => {
        const price = parseFloat(priceText.replace(/[$,]/g, ""));
        cy.log(`Inital price: ${price}`);
        productPage.qtyDropDownButton.click();
        productPage.qtyDropDownOption.contains("2").click();
        cy.wait(1500)
        productPage.subtotalCheckoutPrice
          .invoke("text")
          .then((newSubTotalText) => {
            const newSubTotal = parseFloat(newSubTotalText.replace(/[$,]/g, ""));
            expect(newSubTotal).to.eq(price * 2);
          });
      });
  });
  
  it("Should delete from cart", () => {
    productPage.addToCartButton.click();
    productPage.coveragePopUp.should("be.visible").and("contain", " Add to your order ");
    productPage.noThanksButton.click();
    productPage.goToCartButton.click();
    productPage.deleteButton.click()
    cy.contains('Your Amazon Cart is empty.')
    //cy.get('[class="a-size-medium a-color-base sc-price sc-white-space-nowrap"]').invoke('text').should('eq','$0.00')
    productPage.subtotalCheckoutPrice.eq(0).invoke('text').should('eq','$0.00')

  });

  it("Should ask to Sign in if buying as guest", () => {
  productPage.addToCartButton.click();
    productPage.coveragePopUp.should("be.visible").and("contain", " Add to your order ");
    productPage.noThanksButton.click();
    productPage.goToCartButton.click();
    productPage.proceedToCheckoutButton.click()
    cy.url().should('contain', '/ap/signin')
    cy.contains('Sign in')

  })

});
