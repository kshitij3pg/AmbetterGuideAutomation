/// <reference types="Cypress" />
import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
Given("I navigate to the website",()=>{
    cy.openAmbetterGuide();
    // cy.fixture('locators').then((locator)=>{
    //     this.locator=locator
    // })
    // cy.fixture('data').then((data)=>{
    //     this.data=data
    // })
})

When("I choose home state option",()=>{
    cy.wait(7000)
    cy.get('div[id="main-content"]').children().children().next().children().next().children().next().children().next().next().children().children().first().click()
})
When("Select state and coverage year and click on continue button",()=>{
    cy.get('div[id="main-content"]').children().children().next().children().children().next().children().children().children().children().first().type("New")

    cy.get('div[data-testid="autocomplete-menu"]').each(($ele, index, $list)=>{
        if($ele.text().includes("New Jersey")){
            cy.wrap($ele).click()
        }
    })
    cy.wait(5000)
    cy.get('button[type="submit"]').click()
})
And("Select a network and click on start browsing button",()=>{
    
    cy.get('button[type="submit"]').click()
})
And("Search doctors using procedure and city and click on Search button",()=>{
    cy.get('input[placeholder="Start searching here..."]').type("Primary")
    cy.get('li[data-testid="autoCompleteMenuItem"]').each(($ele, index, $list)=>{
        if($ele.text()==="Primary Care Provider"){
            cy.wrap($ele).click()
        }
    })
    cy.get('input[placeholder="Location"]').clear()
    cy.get('input[placeholder="Location"]').type("New")
    cy.get('div[class="pac-item"]').each(($ele, index, $list)=>{
        if($ele.text().includes("New York")){
            cy.wrap($ele).click()
        }
    })
    cy.get('button[data-testid="search-button"]').click()
    cy.wait(8000)
})
And("Healthcare providers should be visible",()=>{
    
    if(cy.contains("View profile")){
        cy.log("Results found!!")
    }
    else{
        cy.log("Results not found!!")
    }
})


When("I click on a healthcare provider and details page open",()=>{
    cy.get('div[data-testid="searchResults"]').children().next().children().children().next().children().next().children().children().eq(0).click()
})
var NPI, Provider
And("I copy NPI number",()=>{
    cy.wait(2000)
    cy.get('div[data-copytype="npi"]').invoke('text').as('NPInumber')
    cy.get('@NPInumber').then((NPInum)=>{
        NPI=NPInum
        cy.contains(NPI.substring(5,15))
    })
    cy.get('h1[data-testid="signature"]').invoke('text').as('ProviderName')
    cy.get('@ProviderName').then((Name)=>{
        Provider=Name
    })
})
And("Click on Advanced Search tab",()=>{
    cy.get('a[href="/advanced-search"]').click()
})
And("Paste the NPI number in the label",()=>{
    cy.get('input[data-testid="advancedKeywordInput"]').type(NPI.substring(5,15))
})
And("Click on Submit button",()=>{
    cy.contains("Submit").click()
})
Then("The same healthcare provider must be available in search Results",()=>{
    cy.get('span[data-testid="signature"]').should("have.text",Provider)
})

