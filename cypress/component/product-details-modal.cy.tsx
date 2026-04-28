import { ProductDetailsModal } from '../../src/components/ProductDetailsModal';
import type { Product } from '../../src/types/product';

const mockProduct: Omit<Product, 'brand' | 'images'> = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description: 'Popular mascara known for volumizing effects.',
  category: 'beauty',
  price: 9.99,
  rating: 2.56,
  stock: 99,
  thumbnail:
    'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
};

describe('ProductDetailsModal', () => {
  it('renders product details when open', () => {
    cy.mount(
      <ProductDetailsModal
        open={true}
        loading={false}
        error={null}
        product={mockProduct}
        onClose={cy.stub()}
      />,
    );

    cy.get('[data-testid="product-details-modal"]').should('exist');
    cy.get('[data-testid="details-content"]').within(() => {
      cy.contains(mockProduct.title).should('be.visible');
      cy.contains(`$${mockProduct.price}`).should('be.visible');
    });
  });

  it('calls onClose when close button is clicked', () => {
    cy.mount(
      <ProductDetailsModal
        open={true}
        loading={false}
        error={null}
        product={mockProduct}
        onClose={cy.stub().as('onClose')}
      />,
    );

    cy.get('[data-testid="close-details-modal"]').click();
    cy.get('@onClose').should('have.been.called');
  });

  it('shows loading state when loading is true', () => {
    cy.mount(
      <ProductDetailsModal
        open={true}
        loading={true}
        error={null}
        product={null}
        onClose={cy.stub()}
      />,
    );

    cy.get('[data-testid="details-loading"]').should('be.visible');
    cy.get('[data-testid="details-content"]').should('not.exist');
  });

  it('does not render when open is false', () => {
    cy.mount(
      <ProductDetailsModal
        open={false}
        loading={false}
        error={null}
        product={mockProduct}
        onClose={cy.stub()}
      />,
    );

    cy.get('[data-testid="product-details-modal"]').should('not.exist');
  });
});
