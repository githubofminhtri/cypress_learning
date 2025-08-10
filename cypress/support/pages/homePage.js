class homePage {
    clickSignUpOrLoginBtn(){
        return cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    }
    
    clickDeleteBtn(){
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
    }
    getDeleteHeader(){
        return cy.get('b')
    }
    clickContinueBtn(){
        cy.get('[data-qa="continue-button"]').click()
    }
    deleteAccount(expectedDeletedHeader){
        this.clickDeleteBtn()
        cy.assertText(this.getDeleteHeader(), expectedDeletedHeader)
        this.clickContinueBtn()
        cy.url().should("eq",Cypress.env('baseUrl'))
    }
    clickLogoutBtn(){
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
        cy.url().should("eq",Cypress.env('baseUrl')+'login')
    }
    clickContactUsBtn(){
        cy.get('.shop-menu > .nav > :nth-child(8) > a').click()
    }
}
export default new homePage()