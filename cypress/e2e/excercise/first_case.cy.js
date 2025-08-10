import contactUsPage from "../../support/pages/contactUsPage"
import homePage from "../../support/pages/homePage"
import signUpOrLoginPage from "../../support/pages/signUpOrLoginPage"
describe('Practice', function() {
    beforeEach('Go Home Page',function(){
        cy.visit(Cypress.env('baseUrl'))
        cy.fixture('users.json').as('testData')
        
    })
    specify('register a new account with valid information', function(){
        // Delete account if it is existed
        signUpOrLoginPage.checkExistedAccount(this.testData.registerData.email, this.testData.registerData.password, this.testData.expectedAssertion.incorrectAccount).then((result)=>{
            if(result){
                return
            }else{
                homePage.deleteAccount(this.testData.expectedAssertion.accountDeleted)
            }
        })
        // Step 1
        homePage.clickSignUpOrLoginBtn()
        signUpOrLoginPage.signUp1stStep(this.testData.registerData.fullName, this.testData.registerData.email, this.testData.expectedAssertion.newUserSignup)
        
        // Step 2
        signUpOrLoginPage.signUp2ndStep(this.testData.expectedAssertion.enterAccountInfo,this.testData.registerData.password, this.testData.registerData.firstName, this.testData.registerData.lastName, this.testData.registerData.address, this.testData.registerData.state, this.testData.registerData.city, this.testData.registerData.zipCode, this.testData.registerData.phoneNumber)

        // Step 3
        signUpOrLoginPage.signUp3rdStep(this.testData.expectedAssertion.accountCreated)
        
        homePage.deleteAccount(this.testData.expectedAssertion.accountDeleted)
    })
    it('Login with valid credential', function (){
        signUpOrLoginPage.checkExistedAccount(this.testData.loginData.email, this.testData.loginData.password, this.testData.expectedAssertion.incorrectAccount).then((result)=>{
            if(result){
                signUpOrLoginPage.signUpNewAccount(this.testData.loginData.fullName, this.testData.loginData.email, this.testData.expectedAssertion.signUpNewAccount, this.testData.expectedAssertion.enterAccountInfo,this.testData.loginData.password, this.testData.registerData.firstName, this.testData.registerData.lastName, this.testData.registerData.address, this.testData.registerData.state, this.testData.registerData.city, this.testData.registerData.zipCode, this.testData.registerData.phoneNumber, this.testData.expectedAssertion.accountCreated)
            } else {
                homePage.clickLogoutBtn()
            }
        })
        signUpOrLoginPage.login(this.testData.loginData.email, this.testData.loginData.password)
        homePage.deleteAccount(this.testData.expectedAssertion.accountDeleted)
    })
    it('Login with invalid credential', function(){
        homePage.clickSignUpOrLoginBtn()
        signUpOrLoginPage.login(this.testData.loginData.email, this.testData.loginData.password+1)
        signUpOrLoginPage.assertLoginErrMsg(this.testData.expectedAssertion.incorrectAccount)
    })
    it('Logout user', function(){
        signUpOrLoginPage.checkExistedAccount(this.testData.loginData.email, this.testData.loginData.password, this.testData.expectedAssertion.incorrectAccount).then((result)=>{
            if(result){
                signUpOrLoginPage.signUpNewAccount(this.testData.loginData.fullName, this.testData.loginData.email, this.testData.expectedAssertion.signUpNewAccount, this.testData.expectedAssertion.enterAccountInfo,this.testData.loginData.password, this.testData.registerData.firstName, this.testData.registerData.lastName, this.testData.registerData.address, this.testData.registerData.state, this.testData.registerData.city, this.testData.registerData.zipCode, this.testData.registerData.phoneNumber, this.testData.expectedAssertion.accountCreated)
            } else {
                homePage.clickLogoutBtn()
            }
        })
        signUpOrLoginPage.login(this.testData.loginData.email, this.testData.loginData.password)
        homePage.clickLogoutBtn()
    })
    it('Register with existed email', function(){
        signUpOrLoginPage.checkExistedAccount(this.testData.registerData.email, this.testData.registerData.password, this.testData.expectedAssertion.incorrectAccount).then((result)=>{
            if(result){
                signUpOrLoginPage.signUpNewAccount(this.testData.registerData.fullName, this.testData.registerData.email, this.testData.expectedAssertion.signUpNewAccount, this.testData.expectedAssertion.enterAccountInfo,this.testData.registerData.password, this.testData.registerData.firstName, this.testData.registerData.lastName, this.testData.registerData.address, this.testData.registerData.state, this.testData.registerData.city, this.testData.registerData.zipCode, this.testData.registerData.phoneNumber, this.testData.expectedAssertion.accountCreated)
            } else {
                homePage.clickLogoutBtn()
            }
        })
        signUpOrLoginPage.signUp1stStep(this.testData.registerData.fullName, this.testData.registerData.email, this.testData.expectedAssertion.newUserSignup)
        signUpOrLoginPage.assertSignUpErrMsg(this.testData.expectedAssertion.accountExisted)
    })
    it.only('Send contact us form', function(){
        homePage.clickContactUsBtn()
        contactUsPage.assertTitle(this.testData.expectedAssertion.contactUs)
        contactUsPage.sendContactUs(this.testData.contactUsData.name, this.testData.contactUsData.email, this.testData.contactUsData.subject,this.testData.contactUsData.message, this.testData.contactUsData.fileName)
        contactUsPage.assertSuccessfullMsg(this.testData.contactUsData.successfullMsg)
        contactUsPage.clickHomeBtn()
    })
})