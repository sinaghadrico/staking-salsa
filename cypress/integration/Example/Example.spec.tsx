describe("Example Component", () => {
    it("Example", () => {
        cy.visit("/");
        cy.findByText("Press Click ( 0 )").should("be.visible");
    });

    it("close and open sidebar", () => {
        cy.get(".example__btn_Click").click();
        cy.findByText("Press Click ( 1 )").should("be.visible");
    });
});
