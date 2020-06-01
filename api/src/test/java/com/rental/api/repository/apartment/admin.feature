Feature: Get destination

  Background:
    * url baseUrl

  Scenario Outline: Test apartment life cycle for admin users

    Given path 'login'
    And request {username: admin ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def token = response

    Given path 'user'
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 200
    And def user = response

    Given path 'api/v1/apartments/search/filter'
    When method GET
    Then status 403

    Given path 'api/v1/apartments/search/filter'
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 200

    Given path 'api/v1/apartments/search/filter'
    Given param userId = user.id
    And header Authorization = 'Bearer ' + token.token
    When method GET
    Then status 200



    Examples:
      | name         | description               | size | price | room | lat | lon |
      | Casa Amarela | Casa Amarela com 1 quarto | 23   | 23.0  | 2    | 47.359423  | -122.021071  |