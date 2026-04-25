import { ProductCard } from '../../src/components/ProductCard';
import type { Product } from '../../src/types/product';

const mockProduct: Omit<Product, 'brand' | 'images'> = {
  id: 1,
  title: 'Essence Mascara Lash Princess',
  description: 'Popular mascara known for volumizing effects.',
  category: 'beauty',
  price: 9.99,
  rating: 2.56,
  stock: 99,
  thumbnail: 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp',
};

describe('ProductCard', () => {
  it('renders product data correctly', () => {
    cy.mount(
      <ProductCard
        product={mockProduct}
        isFavourite={false}
        onOpenDetails={cy.stub().as('onOpenDetails')}
        onToggleFavourite={cy.stub().as('onToggleFavourite')}
      />,
    );

    cy.get(`[data-testid="product-card-${mockProduct.id}"]`)
      .should('exist')
      .and('contain', mockProduct.title)
      .and('contain', `$${mockProduct.price}`);
  });

  it('calls onOpenDetails when show details button is clicked', () => {
    cy.mount(
      <ProductCard
        product={mockProduct}
        isFavourite={false}
        onOpenDetails={cy.stub().as('onOpenDetails')}
        onToggleFavourite={cy.stub().as('onToggleFavourite')}
      />,
    );

    cy.get(`[data-testid="show-details-${mockProduct.id}"]`).click();
    cy.get('@onOpenDetails').should('have.been.calledWith', mockProduct.id);
  });

  it('shows correct favourite button label based on isFavourite prop', () => {
    cy.mount(
      <ProductCard
        product={mockProduct}
        isFavourite={false}
        onOpenDetails={cy.stub()}
        onToggleFavourite={cy.stub()}
      />,
    );

    cy.get(`[data-testid="toggle-favourite-${mockProduct.id}"]`).should(
      'contain',
      'Add to favourites',
    );
  });
});
