// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('selectRandomDropdownOpt',(element) => {
    element.then($select => {
        const options = $select.find('option')
        const randomIndex = Math.floor(Math.random() * options.length)
        cy.wrap($select).select(randomIndex)
    })
})
Cypress.Commands.add('selectRandomRadioBtn', (element) => {
    element.then($select =>{
        const count = $select.length
        const randomIndex = Math.floor(Math.random()*count)
        cy.wrap($select[randomIndex]).click()
    })
})
Cypress.Commands.add('login', (email, password) => {
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    
})
Cypress.Commands.add('elementVisible',(selector) =>{
    return cy.document().then((doc) => {
        const $ = Cypress.$;
        const $el = $(doc).find(selector);
        return $el.length > 0 && $el.is(':visible'); // <-- just return the value
    });
})


Cypress.Commands.add('assertText', (element, text) => {
    element.should("contain.text", text)
})
