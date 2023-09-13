Feature: Spree Address Flow

  Scenario: Successful Spree Login and Reset Address
    Given User has launched Chrome browser
    When User navigates to Spree login page
    And User enters valid username and password in Spree login page
    And User clicks login on Spree login page
    And User deletes all existing addresses on Spree account page
    Then My Account page should display
    
  Scenario Outline: Successful Spree Create New Address
  	Given User clicks on Add new address link on Spree account page
  	When User enters address "<label>""<firstname>""<lastname>""<address1>""<address2>""<city>""<state>""<zipcode>""<country>""<phone>" on Spree new address page
  	And User clicks button on Spree new address page
  	Then First address displayed on account page is "<label>""<firstname> <lastname>""<address1> <address2>,""<city>, <st> <zipcode>,""<country>"

  	Examples: address data
	  	| label | firstname | lastname | address1 | address2 | city | state | zipcode | country | phone | success | st |
	  	|   Work| Crystal| Wen| 5555 John Dr| 301| Dallas| Texas| 77479| United States| 7135555555| Y | TX |
	
	Scenario: Successful Spree Update First Address
		Given User clicks the first update address icon on Spree account page
		When User clears form
		And User enters address "<label>""<firstname>""<lastname>""<address1>""<address2>""<city>""<state>""<zipcode>""<country>""<phone>" on Spree new address page
  	And User clicks button on Spree new address page
  	Then First address displayed on account page is "<label>""<firstname> <lastname>""<address1> <address2>,""<city>, <st> <zipcode>,""<country>"
		Examples: address data
	  	| label | firstname | lastname | address1 | address2 | city | state | zipcode | country | phone | success | st |
	  	| School| Den| Wen| 5555 Park Cir| 319| Houston| Texas| 77479| United States| 8325555555| Y | TX |
	  	
	Scenario: Successful Spree Delete First Address
		When User deletes first address on Spree account page
		Then No addresses should show on Spree account page