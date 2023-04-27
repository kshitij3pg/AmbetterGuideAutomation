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
    cy.wait(5000)
    cy.selectFromDropDown('div[data-testid="autocomplete-menu"]','New Jersey')
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
    cy.wait(5000)
    cy.selectFromDropDown('div[class="pac-item"]','New York')
    cy.get('button[data-testid="search-button"]').click()
    cy.wait(8000)
})
And("Healthcare providers should be visible",()=>{
    if(cy.contains("View profile")){
        cy.log("Results found!!")
    }else{
        cy.log("Results not found!!")
    }
})

When("I click on a healthcare provider and details page open",()=>{
    cy.get('div[data-testid="searchResultsLocator"]').children().next().children().children().next().children().next().children().children().eq(0).click()
})
var NPI, Provider
And("I copy NPI number",()=>{
    cy.wait(2000)
    cy.get('div[data-copytype="npi"]').invoke('text').as('Npi')
    cy.get('@Npi').then((NpiNum)=>{
        NPI=NpiNum
    })
    cy.get('h1[data-testid="signature"]').invoke('text').as('ProviderName')
    cy.get('@ProviderName').then((Name)=>{
        Provider=Name
    })
})
And("Click on Advanced Search tab",()=>{
    cy.get('a[href="/advanced-search"]').click()
    cy.wait(8000)
})
And("Paste the NPI number in the label",()=>{
    cy.get('input[data-testid="advancedKeywordInput"]').type(NPI.substring(5,15))
})
And("Click on Submit button",()=>{
    cy.contains("Submit").click()
    cy.wait(8000)
})
Then("The same healthcare provider must be available in search Results",()=>{
    cy.verifyText('span[data-testid="signature"]',Provider)
})
// /// <reference types="Cypress" />
// import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";
// var locator, data
// Given("I navigate to the website",()=>{
//     cy.openAmbetterGuide();
//     cy.fixture('locators.json').then((locators)=>{
//         locator=locators
//     })
//     cy.fixture('data.json').then((d)=>{
//         data=d
//     })
// })

// When("I choose home state option",()=>{
//     cy.wait(7000)
//     cy.log(typeof locator)
//     cy.get(locator.searchResultsLocator.homeState).children().children().next()
//     .children().next().children().next().children().next().next().children()
//     .children().first().click()
// })
// When("Select state and coverage year and click on continue button",()=>{
//     cy.get(locator.searchResultsLocator.homeState).children().children().next()
//     .children().children().next().children().children().children().children()
//     .first().type(data.searchResultsData.stateNamePartial)
//     cy.wait(5000)
//     cy.selectFromDropDown(locator.searchResultsLocator.stateDropDown,data.searchResultsData.stateName)
//     cy.wait(5000)
//     cy.get(locator.searchResultsLocator.submitButton).click()
// })
// And("Select a network and click on start browsing button",()=>{
//     cy.get(locator.searchResultsLocator.submitButton).click()
// })
// And("Search doctors using procedure and city and click on Search button",()=>{
//     cy.get(locator.searchResultsLocator.procedureLabel).type(data.searchResultsData.procedureTypePartial)
//     cy.get(locator.searchResultsLocator.procedureDropDown).each(($ele, index, $list)=>{
//         if($ele.text()===data.searchResultsData.procedureType){
//             cy.wrap($ele).click()
//         }
//     })
//     cy.get(locator.searchResultsLocator.locationLabel).clear()
//     cy.get(locator.searchResultsLocator.locationLabel).type(data.searchResultsData.cityNamePartial)
//     cy.selectFromDropDown(locator.searchResultsLocator.cityDropDown,data.searchResultsData.cityName)
//     cy.get(locator.searchResultsLocator.searchButton).click()
//     cy.wait(8000)
// })
// Then("Healthcare providers should be visible",()=>{
//     if(cy.contains("View profile")){
//         cy.log("Results found!!")
//     }else{
//         cy.log("Results not found!!")
//     }
// })

// When("I click on a healthcare provider and details page open",()=>{
//     cy.get(locator.searchResultsLocator.detailPageButton).children().next().children()
//     .children().next().children().next().children().children().eq(0).click()
// })
// var NPI, Provider
// And("I copy NPI number",()=>{
//     cy.wait(2000)
//     cy.get(locator.searchResultsLocator.npiNumber).invoke('text').as('Npi')
//     cy.get('@Npi').then((NpiNum)=>{
//         NPI=NpiNum
//     })
//     cy.get(locator.searchResultsLocator.providerName).invoke('text').as('ProviderName')
//     cy.get('@ProviderName').then((Name)=>{
//         Provider=Name
//     })
// })
// And("Click on Advanced Search tab",()=>{
//     cy.get(locator.searchResultsLocator.advancedSearchTab).click()
//     cy.wait(5000)
// })
// And("Paste the NPI number in the label",()=>{
//     cy.get(locator.searchResultsLocator.npiNumberLabel).type(NPI.substring(5,15))
// })
// And("Click on Submit button",()=>{
//     cy.contains("Submit").click()
//     cy.wait(8000)
// })
// Then("The same healthcare provider must be available in search Results",()=>{
//     cy.verifyText(locator.searchResultsLocator.providerNameVerification,Provider)
// })

