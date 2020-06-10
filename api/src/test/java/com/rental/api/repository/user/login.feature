Feature: Login

  Background:
    * url 'http://localhost:8090'

  Scenario Outline: User validation

    Given path 'api/v1/users/'
    And request {name: <name>}
    When method POST
    Then status 500

    Given path 'api/v1/users/'
    And request {name: <name>,username: <username>}
    When method POST
    Then status 500

    Given path 'api/v1/users/'
    And request {name: <name>,username: <username>,password: password}
    When method POST
    Then status 500

    Given path 'login'
    And request {username: admin ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}

    Examples:
      | name    | username  | password | email                 |
      | Matheus | mathcunha1 | password | mathcunha@hotmail.com |
      | Sara    | sara      | password | sara@hotmail.com      |