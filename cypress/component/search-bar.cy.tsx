import { SearchBar } from '../../src/components/SearchBar';

describe('SearchBar', () => {
  it('renders current value', () => {
    cy.mount(<SearchBar value="phone" onChange={cy.stub().as('onChange')} />);

    cy.get('[data-testid="search-input"]').should('have.value', 'phone');
  });

  it.skip('candidate should add a meaningful interaction test', () => {
    // Suggested idea:
    // type into the input and assert callback calls.
  });
});
