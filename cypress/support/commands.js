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
Cypress.Commands.add('selectRandomOption',(element) => {
    cy.get(element).then($select => {
        const options = $select.find('option')
        const randomIndex = Math.floor(Math.random() * options.length)
        const randomOption = options.eq(randomIndex).val()
        cy.log(randomOption)
        cy.get(element).select(randomIndex)
    })
})
Cypress.Commands.add('login', (email, password) => {
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    cy.get('[data-qa="login-email"]').type(email)
    cy.get('[data-qa="login-password"]').type(password)
    cy.get('form[action="/login"]').submit()
})
Cypress.Commands.add('elementVisible',(selector) =>{
    cy.document().then((document) =>{
        const $document = Cypress.$(document)
        const element = $document.find(selector)
        if(element.length>0){
            return true
        }else{
            return false
        }
    })
})
Cypress.Commands.add('deleteAccount',(deletedTxt)=>{
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
    cy.get('b').should('contain.text',deletedTxt)
    cy.get('[data-qa="continue-button"]').click()
})
Cypress.Commands.add('checkExistedAccount', (email, password, deleted) => {
    cy.login(email, password)
    cy.elementVisible(':nth-child(10) > a').then($visible => {
        if ($visible){
            cy.deleteAccount(deleted)
        }
    })
    
})