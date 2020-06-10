Feature: Update/Delete user

  Background:
    * url baseUrl

  Scenario: User validation

    Given path 'api/v1/users/'
    And def name = (new Date()).getMilliseconds()
    And request {name: '1591810321164',username: '1591810321164',password: password, email: '1591810321164@gmail.com'}
    When method POST
    And def location1591810321164 = responseHeaders['Location'][0]
    Then status 201

    Given path 'api/v1/users/'
    And def name = (new Date()).getMilliseconds()
    And request {name: '1591810321164',username: '1591810321164',password: password, email: '1591810321164@gmail.com'}
    When method POST
    Then status 409

    Given path 'api/v1/users/'
    And def name = (new Date()).getMilliseconds()
    And request {name: '1591810321164',username: '1591810321164',password: password, email: '1591810321164@gmail.com'}
    When method POST
    Then status 409

    Given path 'api/v1/users/'
    And def name = (new Date()).getMilliseconds()
    And request {name: '1591810321164',username: '1591810321164',password: password, email: '1591810443819@gmail.com'}
    When method POST
    Then status 409

    Given path 'api/v1/users/'
    And def name = (new Date()).getMilliseconds()
    And request {name: '1591810321164',username: '1591810443819',password: password, email: '1591810321164@gmail.com'}
    When method POST
    Then status 409

    Given path 'api/v1/users/'
    And def name = (new Date()).getMilliseconds()
    And request {name: '1591810443819',username: '1591810443819',password: password, email: '1591810443819@gmail.com'}
    When method POST
    And def location1591810443819 = responseHeaders['Location'][0]
    Then status 201

    Given path 'login'
    And request {username: '1591810443819' ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def token1591810443819 = response

    Given path 'user'
    And header Authorization = 'Bearer ' + token1591810443819.token
    When method GET
    Then status 200
    And def user1591810443819 = response

    Given path 'user'
    And header Authorization = 'Bearer ' + token1591810443819.token
    When method GET
    Then status 200
    And def user1591810443819 = response

    Given path 'login'
    And request {username: '1591810321164' ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def token1591810321164 = response

    Given path 'user'
    And header Authorization = 'Bearer ' + token1591810321164.token
    When method GET
    Then status 200
    And def user1591810321164 = response

    Given url location1591810443819
    And header Authorization = 'Bearer ' + token1591810321164.token
    When method GET
    Then status 403

    Given url location1591810443819
    When method GET
    Then status 403

    Given url location1591810321164
    And header Authorization = 'Bearer ' + token1591810321164.token
    When method GET
    Then status 200

    Given url location1591810321164
    And header Authorization = 'Bearer ' + token1591810321164.token
    And request {name: '1591810321164', password: password}
    When method PUT
    Then status 500

    Given url location1591810321164
    And header Authorization = 'Bearer ' + token1591810321164.token
    And request {name: '1591810321164',username: '1591810443819',password: password, email: '@gmail.com'}
    When method PUT
    Then status 500

    Given url location1591810321164
    And header Authorization = 'Bearer ' + token1591810321164.token
    And request {name: '1591810321164',username: '1591810321164',password: '12345sds', email: '1591810321164@gmail.com'}
    When method PUT
    Then status 204

    Given url location1591810321164
    And request {name: '1591810321164',username: '1591810321164',password: '12345sds', email: '1591810321164@gmail.com'}
    When method PUT
    Then status 403

    Given url location1591810321164
    And header Authorization = 'Bearer ' + token1591810443819.token
    And request {name: '1591810321164',username: '1591810321164',password: '12345sds', email: '1591810321164@gmail.com'}
    When method PUT
    Then status 403

    Given url location1591810321164
    When method DELETE
    Then status 403

    Given url location1591810321164
    And header Authorization = 'Bearer ' + token1591810443819.token
    When method DELETE
    Then status 403

    Given url location1591810443819
    And header Authorization = 'Bearer ' + token1591810443819.token
    When method DELETE
    Then status 204