import websiteDetails from "../../fixtures/mainPage.json";
import productPage from "../page_objects/product.page";

describe("Cart actions", () => {
  beforeEach(() => {
    cy.errorHandler();
    cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
    cy.intercept('GET', 'https://aax-us-iad.amazon.com/x/**', { log: false }).as('stubbedRequest')
    cy.intercept('GET', 'https://aax-us-iad.amazon.com/e/**', { log: false }).as('stubbedRequest')
    cy.visit("/dp/B0CL61F39H?ref=cm_sw_r_cp_ud_dp_543322QCKCNS3M07MSST&ref_=cm_sw_r_cp_ud_dp_543322QCKCNS3M07MSST&social_share=cm_sw_r_cp_ud_dp_543322QCKCNS3M07MSST&th", {timeout: 30000});
    cy.url().should('include', '/dp/B0CL61F39H');
    cy.get('body').should('be.visible');
    });

//   afterEach(() => {
//     cy.clearCookies();
//     cy.clearLocalStorage();
    
//  });

  it("Should see product details", () => {
    productPage.productTitle.should('be.visible',{ timeout: 10000 } ).and("contain", "        PlayStation®5 console (slim)       ");
    productPage.productPrice.should("be.visible", { timeout: 10000 }).and("exist");
  });

  it("Should add to cart and change q-ty", () => {
     cy.intercept("POST", "https://www.amazon.com/cart/ref=ox_sc_update_quantity*").as("updateCart");
    // cy.wait('@pageDom', { timeout: 20000 })
    productPage.addToCartButton.should('be.visible').click();
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
    productPage.subtotalCheckoutPrice.should('be.visible').invoke("text").then((priceText) => {
      const price = parseFloat(priceText.replace(/[$,]/g, ""));
      cy.log(`Inital price: ${price}`);
      productPage.qtyDropDownButton.click();
      productPage.qtyDropDownOption.contains("2").click();
      cy.wait("@updateCart", {timeout: 50000}).its('response.statusCode').should('eq', 200);;
      productPage.subtotalCheckoutPrice.should('be.visible').invoke("text").then((newSubTotalText) => {
        const newSubTotal = parseFloat(newSubTotalText.replace(/[$,]/g, ""));
        expect(newSubTotal).to.eq(price * 2);
        cy.screenshot()
      });
    });
  });

  it("Should delete from cart", () => {
    // cy.wait('@pageDom', {timeout: 20000})
    productPage.addToCartButton.click();
    productPage.coveragePopUp.should("be.visible").and("contain", " Add to your order ");
    productPage.noThanksButton.click();
    productPage.goToCartButton.click();
    productPage.deleteButton.click();
    cy.contains("Your Amazon Cart is empty.");
    productPage.subtotalCheckoutPrice.eq(0).invoke("text").should("eq", "$0.00");
  });

  it("Should ask to Sign in if buying as guest", () => {
        // cy.wait('@pageDom',{timeout: 20000})
    productPage.addToCartButton.click();
    productPage.coveragePopUp.should("be.visible").and("contain", " Add to your order ");
    productPage.noThanksButton.click();
    productPage.goToCartButton.click();
    productPage.proceedToCheckoutButton.click();
    cy.url().should("contain", "/ap/signin");
    cy.contains("Sign in");
  });
});
