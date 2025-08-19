describe("template spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("title should be correct", () => {
    cy.get("[cy-data='title-page']").should(
      "contain",
      "Welcome to the Rick and Morty API"
    );
  });

  it("should display favorites button", () => {
    cy.get("[cy-data='favorites-button']").should("be.visible");
  });

  it("should search character", () => {
    cy.get("input").type("Rick Sanchez");
    cy.wait(1000);
    cy.get("[cy-data='character-item-1']").should("be.visible");
  });

  it("should reset search", () => {
    cy.contains("Reset").click();
    cy.get("input").should("have.value", "");
    cy.get("[cy-data='character-item-1']").should("exist");
  });
});
