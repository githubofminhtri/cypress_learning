class contactUsPage{
    getTitle(){
        return cy.get('.contact-form > h2')
    }
    assertTitle(title){
        cy.assertText(this.getTitle(), title)
    }
    enterName(name){
        cy.get('[data-qa="name"]').type(name)
    }
    enterEmail(email){
        cy.get('[data-qa="email"]').type(email)
    }
    enterSubject(subject){
        cy.get('[data-qa="subject"]').type(subject)
    }
    enterMessage(messgage){
        cy.get('textarea').type(messgage)
    }
    selectContactUsFile(fileName){
        cy.get('input[type="file"]').selectFile(fileName)
    }
    submitForm(){
        cy.get('form[name="contact-form"]').submit()
    }
    getSuccessfulMsg(){
        return cy.get('.status')
    }
    assertSuccessfullMsg(successfulMsg){
        cy.assertText(this.getSuccessfulMsg(),successfulMsg)
    }
    clickHomeBtn(){
        cy.get('#form-section > .btn').click()
    }
    sendContactUs(name, email, subject, messgage, fileName){
        this.enterName(name)
        this.enterEmail(email)
        this.enterSubject(subject)
        this.enterMessage(messgage)
        this.selectContactUsFile(fileName)
        this.submitForm()
    }
}
export default new contactUsPage()