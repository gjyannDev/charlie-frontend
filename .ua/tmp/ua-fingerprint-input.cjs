const fs = require("fs");
const path = require("path");

const root = process.argv[2];
const outputPath = process.argv[3];
const commit = process.argv[4];
const scan = JSON.parse(fs.readFileSync(path.join(root, ".ua", "intermediate", "scan-result.json"), "utf8"));

fs.writeFileSync(
  outputPath,
  JSON.stringify(
    {
      projectRoot: root,
      sourceFilePaths: (scan.files || []).map((file) => file.path),
      gitCommitHash: commit,
    },
    null,
    2,
  ),
);
