
const { assert } = require("chai"),
      es = require("event-stream"),
      File = require("vinyl"),
      nearley = require("../"),
      { readFileSync } = require("fs"),
      path = require("path");

describe("gulp-nearley", () => {
  describe("in buffer mode", () => {

    it("should compile a grammar", done => {

      const nearleyInstance = nearley(),
            inputData = readFileSync(path.join(__dirname, "/fixtures/input.ne")),
            outputData = readFileSync(path.join(__dirname, "/fixtures/output.js"));

      nearleyInstance.write(new File({
        contents: inputData,
        path: "test/fixtures/grammar.ne"
      }));

      nearleyInstance.once("data", file => {
        assert.ok(file.isBuffer());

        assert.equal(file.contents.toString("utf8"), outputData);
        assert.equal(file.path, "test/fixtures/grammar.js");
        done();
      });
    });
  });
});

