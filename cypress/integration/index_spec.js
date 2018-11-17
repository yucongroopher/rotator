describe('Rotator initializes correctly', () => {
    it('starts with correct DOM', () => {
        cy.visit('/');

        cy.get('#tip-value')
            .should('contain', '0');

        cy.get('#protractor')
            .should('have.prop', 'style')
            .its('transform')
            .should('eq', 'rotate(0deg)');
    });
});

describe('Rotator works correctly', () => {
    it('rotates correctly by 90 degrees', () => {
        cy.visit('/');

        cy.get('#protractor')
            .trigger('mousedown', 'topRight')
            .trigger('mousemove', 'topRight')
            .trigger('mousemove', 'topLeft', { force: true })
            .trigger('mouseup', 'topLeft', { force: true });

        cy.get('#tip-value')
            .should('contain', '90');
    });
});