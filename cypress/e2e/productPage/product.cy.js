import websiteDetails from "../../fixtures/mainPage.json";
import productPage from "../page_objects/product.page";

describe("Cart actions", () => {
  beforeEach(() => {
    cy.errorHandler();
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.intercept ('POST', 'https://www.amazon.com/dram/renderLazyLoaded').as('pageDom')
    cy.visit("dp/B0CL61F39H?ref=cm_sw_r_cp_ud_dp_940FB5F25FKW0XRRR0V4&ref_=cm_sw_r_cp_ud_dp_940FB5F25FKW0XRRR0V4&social_share=cm_sw_r_cp_ud_dp_940FB5F25FKW0XRRR0V4&th=1");
    
  });

  it("Should see product details", () => {
    cy.wait('@pageDom')
    productPage.productTitle.eq(0).should("contain", "        PlayStation®5 console (slim)       ");
    productPage.productPrice.should("be.visible").and("exist");
  });

  it("Should add to cart and change q-ty", () => {
    cy.intercept("POST", "cart/ref=ox_sc_update_quantity*").as("stableDom");
    cy.wait('@pageDom')
    productPage.addToCartButton.click();
    productPage.coveragePopUp.should("be.visible").and("contain", " Add to your order ");
    productPage.noThanksButton.click();
    productPage.addedToCartMessage.should("be.visible").and(
      "contain",
      `
        
            Added to Cart
        
    `
    );
    productPage.goToCartButton.click();
    cy.url().should("contain", websiteDetails.cartLink);
    productPage.productTitleInCart.should("contain", "PlayStation®5 console (slim)");
    productPage.subtotalCheckoutPrice.invoke("text").then((priceText) => {
      const price = parseFloat(priceText.replace(/[$,]/g, ""));
      cy.log(`Inital price: ${price}`);
      productPage.qtyDropDownButton.click();
      productPage.qtyDropDownOption.contains("2").click();
      cy.wait("@stableDom", { timeout: 10000 });
      productPage.subtotalCheckoutPrice.invoke("text").then((newSubTotalText) => {
        const newSubTotal = parseFloat(newSubTotalText.replace(/[$,]/g, ""));
        expect(newSubTotal).to.eq(price * 2);
      });
    });
  });

  it("Should delete from cart", () => {
    cy.wait('@pageDom')
    productPage.addToCartButton.click();
    productPage.coveragePopUp.should("be.visible").and("contain", " Add to your order ");
    productPage.noThanksButton.click();
    productPage.goToCartButton.click();
    productPage.deleteButton.click();
    cy.contains("Your Amazon Cart is empty.");
    productPage.subtotalCheckoutPrice.eq(0).invoke("text").should("eq", "$0.00");
  });

  it("Should ask to Sign in if buying as guest", () => {
    cy.wait('@pageDom')
    productPage.addToCartButton.click();
    productPage.coveragePopUp.should("be.visible").and("contain", " Add to your order ");
    productPage.noThanksButton.click();
    productPage.goToCartButton.click();
    productPage.proceedToCheckoutButton.click();
    cy.url().should("contain", "/ap/signin");
    cy.contains("Sign in");
  });
});
