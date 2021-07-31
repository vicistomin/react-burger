describe('drag and drop in construtor works correctly', function() {
  before(function() {
    cy.visit('http://localhost:3000');
  });

  it('should load ingredients data', function() {
    cy.get('[class^=burger-ingredients-card_ingredient_card__]')
      .first()
      .as('bun');

    cy.get('@bun')
      .should('exist');

    cy.get('@bun')
      .find('img')
      .should('be.visible')
      .and(($img) => {
        // eslint-disable-next-line jest/valid-expect
        expect($img[0].naturalWidth).to.be.greaterThan(0)
      })
  })

  it('should drag and drop bun to the constructor', function() {
    cy.get('#bun')
      .find('[class^=burger-ingredients-card_ingredient_card__]')
      .first()
      .as('bun')

    cy.get('[class^=burger-constructor_burger_constructor_list__]')
      .children()
      .first()
      .as('topBun')

    cy.get('@bun').trigger('dragstart');
    cy.get('@topBun').trigger('drop');

    cy.get('@topBun')
      .find('.constructor-element__text')
      .should('contain', 'Краторная булка N-200i (верх)')
  });
  
  it('should drag and drop ingredients', function() {
    cy.get('#sauce')
      .find('[class^=burger-ingredients-card_ingredient_card__]')
      .first()
      .as('sauce')

    cy.get('#main')
      .find('[class^=burger-ingredients-card_ingredient_card__]')
      .first()
      .as('main')

    cy.get('#main')
      .find('[class^=burger-ingredients-card_ingredient_card__]')
      .last()
      .as('main2')

    cy.get('[class^=burger-constructor_burger_constructor_list__]')
      .children()
      .next()
      .first()
      .as('ingredientsList')

    // drop 1st ingredient
    cy.get('@sauce').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    // drop 2nd ingredient
    cy.get('@main').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    // drop 3rd ingredient
    cy.get('@main2').trigger('dragstart');
    cy.get('@ingredientsList').trigger('drop');

    // check the ingredients in the list
    cy.get('@ingredientsList')
      .find('.constructor-element__text')
      .should('contain', 'Соус Spicy-X')
      .should('contain', 'Филе Люминесцентного тетраодонтимформа')
      .should('contain', 'Сыр с астероидной плесенью')      
  });

  it('should rearrange ingredients in constructor', function() {
    cy.get('[class^=draggable-constructor-element_draggable_list_item__]')
      .first()
      .as('ingredient')

    cy.get('[class^=burger-constructor_burger_constructor_draggable_list__]')
      .first()
      .as('ingredientsList')

    cy.get('@ingredient').trigger('dragstart');
    cy.get('@ingredientsList').trigger('dragenter').trigger('drop');

    // the first main ingredient should be now on the top of constructor
    cy.get('@ingredientsList')
      .find('.constructor-element__text')
      .first()
      .should('contain', 'Филе Люминесцентного тетраодонтимформа')
  });

  it('should remove first ingredient from constructor', function() {
    cy.get('[class^=draggable-constructor-element_draggable_list_item__]')
      .first()
      .as('ingredient')

    cy.get('[class^=burger-constructor_burger_constructor_draggable_list__]')
      .first()
      .as('ingredientsList')

    cy.get('@ingredient')
      .find('.constructor-element__action')
      .click()

    // check for the deleted ingredients name in the list
    cy.get('@ingredientsList')
      .find('.constructor-element__text')
      .should('not.contain', 'Филе Люминесцентного тетраодонтимформа')
  });
}); 