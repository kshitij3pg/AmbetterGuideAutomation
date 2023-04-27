//Command to open Ambetter guide
Cypress.Commands.add('openAmbetterGuide',()=>{
    cy.visit("https://guide.ambetterhealth.com/")
})