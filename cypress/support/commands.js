//Command to open Ambetter guide
Cypress.Commands.add('openAmbetterGuide',()=>{
    cy.visit("https://guide.ambetterhealth.com/")
})
//Command to select option from drop down list
Cypress.Commands.add('selectFromDropDown',(locator,option)=>{
    cy.get(locator).each(($ele, index, $list)=>{
        if($ele.text().includes(option)){
            cy.wrap($ele).click()
        }
    })
})
//Command to verify text
Cypress.Commands.add('verifyText',(locator,text)=>{
    cy.get(locator).should("have.text",text)
})