Feature: Spree Address Form

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
	  	
	  	
  Scenario: Spree Create Address Successful Form Open
  	Given User clicks on Add new address link on Spree account page
  
  
  Scenario Outline: Spree Create Address Expected Failures
  	When User enters address "<label>""<firstname>""<lastname>""<address1>""<address2>""<city>""<state>""<zipcode>""<country>""<phone>" on Spree new address page
  	And User clicks button on Spree new address page
  	Then If the new address is a "<success>", show address on Spree account page as "<label>""<firstname> <lastname>""<address1> <address2>,""<city>, <st> <zipcode>,""<country>", otherwise clear form
  	Examples: address data
	  	| label | firstname | lastname | address1 | address2 | city | state | zipcode | country | phone | success | st |
	  	|       |        | Wen| 5555 John Dr| 301| Dallas| Texas| 77479| United States| 7135555555| N | TX |
	  	|       | Crystal|    | 5555 John Dr| 301| Dallas| Texas| 77479| United States| 7135555555| N | TX |
	  	|       | Crystal| Wen|             | 301| Dallas| Texas| 77479| United States| 7135555555| N | TX |
	  	|       | Crystal| Wen| 5555 John Dr| 301|       | Texas| 77479| United States| 7135555555| N | TX |
	  	|       | Crystal| Wen| 5555 John Dr| 301| Dallas| Texas|      | United States| 7135555555| N | TX |
	  	|       | Crystal| Wen| 5555 John Dr| 301| Dallas| Texas| 77479| United States|           | N | TX |
	  	|   Work| Crystal| Wen| 5555 John Dr| 301| Dallas| Texas| 77479| United States| 7135555555| N | TX |
	  	| School| Crystal| Wen| 5555 John Dr| 301| Dallas| Texas| 77479| United States| 7135555555| Y | TX |