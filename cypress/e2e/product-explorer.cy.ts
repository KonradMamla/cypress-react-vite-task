describe('Product Explorer starter', () => {
  it('should load the app shell', () => {
    cy.visit('/');

    cy.contains('Product Explorer').should('be.visible');
    cy.get('[data-testid="search-input"]').should('be.visible');
    cy.get('[data-testid="category-select"]').should('be.visible');
    cy.get('[data-testid="app-capabilities"]').should('be.visible');
  });

  it.skip('candidate should replace this with a real E2E scenario', () => {
    // Suggested scenario:
    // 1. search for a product
    // 2. verify request + response
    // 3. filter by category
    // 4. open product details
    // 5. add to favourites
    // 6. reload and assert persistence
  });
});
