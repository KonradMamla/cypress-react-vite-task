import { SearchBar } from '../../src/components/SearchBar';

describe('SearchBar', () => {
  it('renders input with value passed as prop', () => {
    cy.mount(<SearchBar value="phone" onChange={cy.stub().as('onChange')} />);
    cy.get('[data-testid="search-input"]').should('have.value', 'phone');
  });

  it('calls onChange with the typed value of the field', () => {
    const onChange = cy.stub().as('onChange');
    cy.mount(<SearchBar value="" onChange={onChange} />);

    cy.get('[data-testid="search-input"]').type('laptop');

    cy.get('@onChange')
      .should('have.been.called')
      .and('have.been.calledWith', 'laptop');
  });
});
