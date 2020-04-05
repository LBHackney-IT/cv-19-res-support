const healthChecks = require("../../use-cases/HealthChecks");
const successResponse = {
"status" : "Success"
}
describe("getHealthChecks", () => {
    it("can return success if the status function is called", () => {
        expect(healthChecks.status()).toEqual(successResponse);
    });

    it("can throw an error if the error function is called", () => {
        expect(healthChecks.error).toThrow();
    });
});
