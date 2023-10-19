const sendRequest = require("../helpers/api.helpers")
const userData = require("../config/userData.json")
const anotherUserData = require("../config/anotherUserData.json")
const petData = require("../config/petData.json")
const updatePetData = require("../config/updatePetImage.json")

describe("Petsore API tests", () => {

    it("Verify that allows creating a User - POST /user", async () => {
        const response = await sendRequest('/user', userData, 'post')
        expect(response.status).to.equal(200)
    })

    it("Verify that user was created GET /user", async () => {
        const response = await sendRequest(`/user/${userData.username}`)
        expect(response.status).to.equal(200)
        expect(response.data.username).to.equal(userData.username)
    })

    it("Verify that allows login as a User - GET /user/login", async () => {
        const response = await sendRequest(`/user/login?username=${userData.username}&password=${userData.password}`)
        expect(response.status).to.equal(200)
    })

    it("Verify that allows Log out User - GET /user/logout", async () => {
        const response = await sendRequest(`/user/logout`)
        expect(response.status).to.equal(200)
    })

    it("Verify that allows to delete user - DELETE /user/{username}", async () => {
        const response = await sendRequest(`/user/${userData.username}`, null, 'delete')
        expect(response.status).to.equal(200)
    })

    it("Verify that user was deleted GET /user", async () => {
        const response = await sendRequest(`/user/${userData.username}`)
        expect(response.status).to.equal(404)
    })

    it("Verify that allows creating the list of Users - POST /user/createWithList", async () => {
        const response = await sendRequest('/user/createWithList', [userData,anotherUserData], 'post')
        expect(response.status).to.equal(200)
    })

    it("Verify that users were created GET /user", async () => {
        const firstUserResponse = await sendRequest(`/user/${userData.username}`)
        expect(firstUserResponse.status).to.equal(200)
        expect(firstUserResponse.data.username).to.equal(userData.username)
        const secondUserResponse = await sendRequest(`/user/${anotherUserData.username}`)
        expect(secondUserResponse.status).to.equal(200)
        expect(secondUserResponse.data.username).to.equal(anotherUserData.username)
    })

    it("Verify that allows adding a new Pet - POST /pet", async () => {
        const response = await sendRequest('/pet', petData, 'post')
        expect(response.status).to.equal(200)
    })

    it("Verify that a Pet was added - GET /pet/{petId}", async () => {
        const response = await sendRequest(`/pet/${petData.id}`)
        expect(response.data.name).to.equal(petData.name)
    })

    it("Verify that allows updating Pet's image - PUT /pet", async () => {
        const response = await sendRequest('/pet', updatePetData, 'put')
        expect(response.status).to.equal(200)
    })

    it("Verify that image was updated - GET /pet/{petId}", async () => {
        const response = await sendRequest(`/pet/${petData.id}`)
        expect(response.data.photoUrls[0]).to.equal(updatePetData.photoUrls[0])
    })

    it("Verify that allows updating Pet's name and status - POST /pet/{petId}", async () => {
        const response = await sendRequest(`/pet/${updatePetData.id}`, 'name=TOM&status=sold', 'post')
        expect(response.status).to.equal(200)
    })

    it("Verify that Pet's name and status were updated - GET /pet/{petId}", async () => {
        const response = await sendRequest(`/pet/${petData.id}`)
        expect(response.data.name).to.equal('TOM')
        expect(response.data.status).to.equal('sold')
    })

    it("Verify that allows deleting Pet - DELETE /pet/{petId}", async () => {
        const response = await sendRequest(`/pet/${updatePetData.id}`, null, 'delete')
        expect(response.status).to.equal(200)
    })

    it("Verify that Pet was deleted - GET /pet/{petId}", async () => {
        const response = await sendRequest(`/pet/${petData.id}`)
        expect(response.status).to.equal(404)
    })
    
})