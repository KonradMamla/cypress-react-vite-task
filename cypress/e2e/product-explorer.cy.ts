import type { ProductsResponse } from '../../src/types/product';

describe('Product Explorer', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  describe('search', () => {
    it('filters products by search query and validates API response', () => {
      cy.intercept('GET', '**/products/search?*').as('searchRequest');

      cy.get('[data-testid="search-input"]').type('phone');

      cy.wait('@searchRequest').then((interception) => {
        const body = interception.response?.body as ProductsResponse;
        expect(interception.response?.statusCode).to.eq(200);
        expect(body.products).to.be.an('array').and.have.length.greaterThan(0);
      });

      cy.get('[data-testid="results-summary"]').should('contain', 'phone');
      cy.get('[data-testid^="product-card-"]').should(
        'have.length.greaterThan',
        0,
      );
    });
  });

  describe('search and category filter combined', () => {
    it('combines search query with category filter and shows filtered results', () => {
      cy.intercept('GET', '**/products/search?*').as('searchRequest');
      cy.intercept('GET', '**/products/category/**').as('categoryRequest');

      cy.get('[data-testid="search-input"]').type('a');
      cy.wait('@searchRequest');

      cy.get('[data-testid="category-select"]').select('beauty');
      cy.wait('@categoryRequest');

      cy.get('[data-testid="results-summary"]')
        .should('contain', 'beauty')
        .and('contain', 'a');

      cy.get('[data-testid="clear-filters-button"]').should('be.visible').click();

      cy.get('[data-testid="results-summary"]').should('not.contain', 'beauty');
      cy.get('[data-testid="search-input"]').should('have.value', '');
    });
  });

  describe('favourites', () => {
    it('persists favourite products in localStorage after page reload', () => {
      cy.get('[data-testid^="product-card-"]').should(
        'have.length.greaterThan',
        0,
      );
      cy.get('[data-testid="favourites-count"]').should('contain', '0');

      cy.get('[data-testid^="toggle-favourite-"]').first().click();

      cy.get('[data-testid="favourites-count"]').should('contain', '1');
      cy.get('[data-testid="favourites-preview"]').should('be.visible');

      cy.reload();

      cy.get('[data-testid="favourites-count"]').should('contain', '1');
      cy.get('[data-testid="favourites-preview"]').should('be.visible');
    });
  });
});
