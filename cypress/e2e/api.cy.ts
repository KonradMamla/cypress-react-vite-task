import type { Product, ProductsResponse } from '../../src/types/product';

const API_BASE = 'https://dummyjson.com';

describe('DummyJSON API', () => {
  describe('GET /products', () => {
    it('returns a valid ProductsResponse shape', () => {
      cy.request<ProductsResponse>(`${API_BASE}/products?limit=12`).then(
        (response) => {
          expect(response.status).to.eq(200);

          const body = response.body;
          expect(body).to.include.keys(['products', 'total', 'skip', 'limit']);
          expect(body.products)
            .to.be.an('array')
            .and.have.length.greaterThan(0);
          expect(body.limit).to.eq(12);

          const first: Product = body.products[0];
          expect(first).to.include.keys([
            'id',
            'title',
            'price',
            'category',
            'thumbnail',
            'rating',
            'stock',
          ]);
          expect(first.id).to.be.a('number');
          expect(first.price).to.be.a('number');
        },
      );
    });
  });

  describe('GET /products/search', () => {
    it('returns matching products for query "phone"', () => {
      cy.request<ProductsResponse>(
        `${API_BASE}/products/search?q=phone&limit=12`,
      ).then((response) => {
        expect(response.status).to.eq(200);

        const products = response.body.products;
        expect(products).to.be.an('array').and.have.length.greaterThan(0);

        products.forEach((product: Product) => {
          expect(product).to.include.keys(['id', 'title', 'thumbnail']);

          const searchableText =
            `${product.title} ${product.description ?? ''}`.toLowerCase();
          expect(searchableText).to.include('phone');
        });
      });
    });
  });

  describe('GET /products/:id — error handling', () => {
    it('returns 404 for a non-existent product', () => {
      cy.request({
        url: `${API_BASE}/products/999999`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body).to.have.property('message');
      });
    });
  });
});
