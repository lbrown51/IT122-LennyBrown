const expect = require("chai").expect;
const team = require("../models/data");

describe("Data Tests", () => {
  const teamArr = team.getAll();
    
  it("getItem returns the team member with the given id", () => {
    const result = team.getItem(2);
    expect(result).to.deep.equal(teamArr[2 - 1]);
  });

  it("getItem does not return a team member for an id that isn't in the array", () => {
    const result = team.getItem(2000);
    expect(result).to.equal(false);
  });

  it("addItem returns true when a team member with a valid id is added", () => {
    const newMember = {
      "id": teamArr.length + 1,
      "firstName": "Test",
      "lastName": "Person",
      "favoriteWord": "New",
      "favoritePhrase": "Good Business",
      "skill": "Better Business"
    };

    const result = team.addItem(newMember);
    expect(result).to.equal(true);
  });

  it("addItem returns false when a team member with an invalid id is used", () => {
    const newMember = {
      "id": teamArr.length,
      "firstName": "Test",
      "lastName": "Person",
      "favoriteWord": "New",
      "favoritePhrase": "Good Business",
      "skill": "Better Business"
    };

    const result = team.addItem(newMember);
    expect(result).to.equal(false);
  });

  it("deleteItem deletes a team member and returns true when called with a valid id", () => {
    const result = team.deleteItem(10);
    expect(result).to.equal(true);
  });

  it("deleteItem returns false when called with an invalid id", () => {
    const result = team.deleteItem(2000);
    expect(result).to.equal(false);
  });

});