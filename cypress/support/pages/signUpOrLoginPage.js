import homePage from "./homePage"

class signUpOrLoginPage{
    enterLoginEmail(email){
        cy.get('[data-qa="login-email"]').type(email)
    }
    enterLoginPassword(password){
        cy.get('[data-qa="login-password"]').type(password)
    }
    clickLoginBtn(){
        cy.get('[data-qa="login-button"]').click()
    }
    enterSignUpName(name){
        cy.get('[data-qa="signup-name"]').type(name)
    }
    enterSignUpEmail(email){
        cy.get('[data-qa="signup-email"]').type(email)
    }
    
    clickSignUpBtn(){
        cy.get('[data-qa="signup-button"]').click()
    }
    getSignUpHeader1stStep(){
        return cy.get('.signup-form > h2')
    }
    getSignUpHeader2ndStep(){
        return cy.get(':nth-child(1) > b')
    }
    genderRadioBtn(){
        return cy.get('.radio-inline')
    }
    enterSignUpPassword(password){
        cy.get('[data-qa="password"]').type(password)
    }
    getDaysDDl(){
        return cy.get('[data-qa="days"]')
    }
    getMonthsDDl(){
        return cy.get('[data-qa="months"]')
    }
    getYearsDDl(){
        return cy.get('[data-qa="years"]')
    }
    checkAllCbx(){
        cy.get('[type="checkbox"]').check()
    }
    enterFirstName(firstName){
        cy.get('[data-qa="first_name"]').type(firstName)
    }
    enterLastName(lastName){
        cy.get('[data-qa="last_name"]').type(lastName)
    }
    enterAddress(address){
        cy.get('[data-qa="address"]').type(address)
    }
    enterState(state){
        cy.get('[data-qa="state"]').type(state)
    }
    enterCity(city){
        cy.get('[data-qa="city"]').type(city)
    }
    enterZipCode(zipcode){
        cy.get('[data-qa="zipcode"]').type(zipcode)
    }
    enterMobileNumber(mobileNumber){
        cy.get('[data-qa="mobile_number"]').type(mobileNumber)
    }
    getCountryDDl(){
        return cy.get('#country')
    }
    clickSignUpBtn2ndStep(){
        cy.get('form[action="/signup"]').submit()
    }
    getSignUpHeader3rdStep(){
        return cy.get('b')
    }
    clickContinueBtn(){
        cy.get('[data-qa="continue-button"]').click()
    }
    assertLoginErrMsg(errorMsg){
        cy.assertText(cy.get('form[action="/login"] > p'), errorMsg)
    }
    assertSignUpErrMsg(errorMsg){
        cy.assertText(cy.get('.signup-form > form > p'), errorMsg)
    }
    getLoginErrorMsg(errorMsg){
        return cy.elementVisible('form[action="/login"] > p').then((isVisible) =>{
            if(isVisible){
                return cy.get('form[action="/login"] > p').invoke('text').then((text) => {
                    return text.includes(errorMsg); // true or false
                })
            }
            return false;
        })
    }

    login(email,password){
        this.enterLoginEmail(email)
        this.enterLoginPassword(password)
        this.clickLoginBtn()
    }
    
    signUp1stStep(name, email, expectedHeader1st){
        // cy.assertText(this.getSignUpHeader1stStep(), expectedHeader1st)
        this.enterSignUpName(name)
        this.enterSignUpEmail(email)
        this.clickSignUpBtn()
    }
    signUp2ndStep(expectedHeader2nd, password, firstName, lastName, address, state, city, zipCode, mobileNumber){
        cy.assertText(this.getSignUpHeader2ndStep(), expectedHeader2nd)
        cy.selectRandomRadioBtn(this.genderRadioBtn())
        this.enterSignUpPassword(password)
        cy.selectRandomDropdownOpt(this.getDaysDDl())
        cy.selectRandomDropdownOpt(this.getMonthsDDl())
        cy.selectRandomDropdownOpt(this.getYearsDDl())
        this.checkAllCbx()
        this.enterFirstName(firstName)
        this.enterLastName(lastName)
        this.enterAddress(address)
        cy.selectRandomDropdownOpt(this.getCountryDDl())
        this.enterState(state)
        this.enterCity(city)
        this.enterZipCode(zipCode)
        this.enterMobileNumber(mobileNumber)
        this.clickSignUpBtn2ndStep()
    }
    signUp3rdStep(expectedHeader3rd){
        cy.assertText(this.getSignUpHeader3rdStep(),expectedHeader3rd)
        this.clickContinueBtn()
    }
    checkExistedAccount(email, password, errorMsg){
        homePage.clickSignUpOrLoginBtn()
        this.login(email,password)
        return this.getLoginErrorMsg(errorMsg)
    }
    signUpNewAccount(fullName, email, expectedHeader1st, expectedHeader2nd, password, firstName, lastName, address, state, city, zipCode, mobileNumber, expectedHeader3rd){
        this.signUp1stStep(fullName, email, expectedHeader1st)
        this.signUp2ndStep(expectedHeader2nd,password,firstName,lastName,address,state,city,zipCode,mobileNumber)
        this.signUp3rdStep(expectedHeader3rd)
        homePage.clickLogoutBtn()
    }
}
export default new signUpOrLoginPage()