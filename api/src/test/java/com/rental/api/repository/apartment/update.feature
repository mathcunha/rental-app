Feature: update/delete apartments

  Background:
    * url baseUrl

  Scenario: Test apartment update/delete

    Given path 'login'
    And request {username: client ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def clientToken = response

    Given path 'user'
    And header Authorization = 'Bearer ' + clientToken.token
    When method GET
    Then status 200
    And def clientUser = response

    Given path 'login'
    And request {username: admin ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def adminToken = response

    Given path 'user'
    And header Authorization = 'Bearer ' + adminToken.token
    When method GET
    Then status 200
    And def adminUser = response

    Given path 'login'
    And request {username: realtor ,password: password}
    When method POST
    Then status 200
    And match $ == {token:'#notnull'}
    And def realtorToken = response

    Given path 'user'
    And header Authorization = 'Bearer ' + realtorToken.token
    When method GET
    Then status 200
    And def realtorUser = response

    Given path 'api/v1/apartments'
    And header Authorization = 'Bearer ' + adminToken.token
    And def name = java.lang.System.currentTimeMillis()
    And def aptSize = Math.floor(Math.random() * 100)
    And def price = Math.floor(Math.random() * 300)
    And def room = Math.floor(Math.random() * 20)
    And request {publicInfo : { name: '#(name)', description: description, aptSize: #(parseFloat(aptSize)+1), price: #(parseFloat(price)+1), room: #(parseInt(room)+1), lat: 47.359423, lng: -122.021071}, available:true, user: {id:'#(~~adminUser.id)'}}
    When method POST
    And def aptAdmin = responseHeaders['Location'][0]
    Then status 201
    And def aptAdminBody = response

    Given path 'api/v1/apartments'
    And header Authorization = 'Bearer ' + realtorToken.token
    And def name = java.lang.System.currentTimeMillis()
    And def aptSize = Math.floor(Math.random() * 100)
    And def price = Math.floor(Math.random() * 300)
    And def room = Math.floor(Math.random() * 20)
    And request {publicInfo : { name: '#(name)', description: description, aptSize: #(parseFloat(aptSize)+1), price: #(parseFloat(price)+1), room: #(parseInt(room)+1), lat: 47.359423, lng: -122.021071}, available:true, user: {id:'#(~~realtorUser.id)'}}
    When method POST
    And def aptRealtor = responseHeaders['Location'][0]
    And def aptRealtorBody = response
    Then status 201

    Given path aptAdmin
    And request {publicInfo : { name: '#(name)', description: description, aptSize: #(parseFloat(aptSize)+1), price: #(parseFloat(price)+1), room: #(parseInt(room)+1), lat: 47.359423, lng: -122.021071}, available:true, user: {id:'#(~~realtorUser.id)'}}
    When method PUT
    Then status 403

    Given path aptRealtor
    And request {publicInfo : { name: '#(name)' ,description: description, aptSize: #(parseFloat(aptSize)+1), price: #(parseFloat(price)+1), room: #(parseInt(room)+1), lat: 47.359423, lng: -122.021071}, available:true, user: {id:'#(~~realtorUser.id)'}}
    When method PUT
    Then status 403

    Given url aptAdmin
    And header Authorization = 'Bearer ' + realtorToken.token
    And request {publicInfo : { name: '#(name)' ,description: description + 'updated', aptSize: #(parseFloat(aptSize)+1), price: #(parseFloat(price)+1), room: #(parseInt(room)+1), lat: 47.359423, lng: -122.021071}, available:true, user: {id:'#(~~realtorUser.id)'}}
    When method PUT
    Then status 403

    Given url aptAdmin
    And header Authorization = 'Bearer ' + clientToken.token
    And request {publicInfo : { name: '#(name)' ,description: description + 'updated', aptSize: #(parseFloat(aptSize)+1), price: #(parseFloat(price)+1), room: #(parseInt(room)+1), lat: 47.359423, lng: -122.021071}, available:true, user: {id:'#(~~realtorUser.id)'}}
    When method PUT
    Then status 403

    Given url aptRealtor
    And header Authorization = 'Bearer ' + realtorToken.token
    And request {publicInfo : { name: '#(name)' ,description: description, aptSize: #(parseFloat(aptSize)+1), price: #(parseFloat(price)+1), room: #(parseInt(room)+1), lat: 47.359423, lng: -122.021071}, available:true, version: '#(~~aptRealtorBody.version)',  user: {id:'#(~~realtorUser.id)'}}
    When method PUT
    Then status 200
    And def aptRealtorBody = response

    Given url aptRealtor
    And header Authorization = 'Bearer ' + adminToken.token
    And request {publicInfo : { name: '#(name)' ,description: description, aptSize: #(parseFloat(aptSize)+1), price: #(parseFloat(price)+1), room: #(parseInt(room)+1), lat: 47.359423, lng: -122.021071}, available:true, version: '#(~~aptRealtorBody.version)', user: {id:'#(~~realtorUser.id)'}}
    When method PUT
    Then status 200
    And def aptRealtorBody = response

    Given url aptAdmin
    And header Authorization = 'Bearer ' + adminToken.token
    And request {publicInfo : { name: '#(name)' ,description: description, aptSize: #(parseFloat(aptSize)+1), price: #(parseFloat(price)+1), room: #(parseInt(room)+1), lat: 47.359423, lng: -122.021071}, available:true, version: '#(~~aptAdminBody.version)', user: {id:'#(~~realtorUser.id)'}}
    When method PUT
    Then status 200

    Given url aptAdmin
    When method DELETE
    Then status 403

    Given url aptRealtor
    When method DELETE
    Then status 403

    Given url aptAdmin
    And header Authorization = 'Bearer ' + realtorToken.token
    When method DELETE
    Then status 403

    Given url aptAdmin
    And header Authorization = 'Bearer ' + clientToken.token
    When method DELETE
    Then status 403

    Given url aptRealtor
    And header Authorization = 'Bearer ' + realtorToken.token
    When method DELETE
    Then status 204

    Given url aptAdmin
    And header Authorization = 'Bearer ' + adminToken.token
    When method DELETE
    Then status 204