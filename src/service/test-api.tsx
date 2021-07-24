import {Api} from "@api/test-api-provider"

const service = new Api({
    baseUrl : "http://51.68.81.16:8080"
})
console.log(service,"service service service")
export default service;
