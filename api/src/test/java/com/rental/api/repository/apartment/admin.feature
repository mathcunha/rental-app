Feature: Get destination

  Background:
    * url baseUrl

  Scenario: Test apartment search life cycle for admin users

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