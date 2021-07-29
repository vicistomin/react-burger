describe('constructor page functional test', function() {
  it('should be available on localhost:3000', function() {
    cy.visit('http://localhost:3000');
  });
  it('should drag and drop', function() {
    cy.get('[class^=burger-ingredients-card_ingredient_card__]').first().trigger('dragstart');
    cy.get('[class^=burger-constructor_emptyBun__]').first().trigger('drop');
  });
}); 