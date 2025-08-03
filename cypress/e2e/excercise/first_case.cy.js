describe('Practice: Register new account', function() {
    before('Load fixture date', function(){
        cy.fixture('users.json').as('testData')
    })
    beforeEach('Go Home Page',function(){
        cy.visit('https://www.automationexercise.com/')
        
        cy.checkExistedAccount(this.testData.registerData.email, this.testData.registerData.password, this.testData.expectedAssertion.accountDeleted)
        
    })
    specify('register a new account with valid information', function(){
        // Step 1
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
        cy.get('.signup-form > h2').should('contain.text',this.testData.expectedAssertion.newUserSignup)
        cy.get('[data-qa="signup-name"]').type(this.testData.registerData.fullName)
        cy.get('[data-qa="signup-email"]').type(this.testData.registerData.email)
        cy.get('[data-qa="signup-button"]').click()
        // Step 2
        cy.get(':nth-child(1) > b').should('contain.text',this.testData.expectedAssertion.enterAccountInfo)
        cy.get('.radio-inline').then($genderRadioBtn =>{
            const count = $genderRadioBtn.length
            const randomIndex = Math.floor(Math.random()*count)
            cy.wrap($genderRadioBtn[randomIndex]).click()
        })
        cy.get('[data-qa="password"]').type(this.testData.registerData.password)
        cy.selectRandomOption('[data-qa="days"]')
        cy.selectRandomOption('[data-qa="months"]')
        cy.selectRandomOption('[data-qa="years"]')
        cy.get('#newsletter').click()
        cy.get('#optin').click()
        cy.get('[data-qa="first_name"]').type(this.testData.registerData.firstName)
        cy.get('[data-qa="last_name"]').type(this.testData.registerData.lastName)
        cy.get('[data-qa="address"]').type(this.testData.registerData.address)
        cy.get('[data-qa="first_name"]').type(this.testData.registerData.firstName)
        cy.selectRandomOption('#country')
        cy.get('[data-qa="state"]').type(this.testData.registerData.state)
        cy.get('[data-qa="city"]').type(this.testData.registerData.city)
        cy.get('[data-qa="zipcode"]').type(this.testData.registerData.zipCode)
        cy.get('[data-qa="mobile_number"]').type(this.testData.registerData.phoneNumber)
        cy.get('form[action="/signup"]').submit()
        cy.get('b').should('contain.text',this.testData.expectedAssertion.accountCreated)
        cy.get('[data-qa="continue-button"]').click()
        
        cy.deleteAccount(this.testData.expectedAssertion.accountDeleted)
    })
})