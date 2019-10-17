const { exec } = require('child_process');

const cwd = process.cwd();

const scope = process.argv[2];

const files = process.argv
  .slice(3)
  .map((f) => {
    // ng lint's --files argument only works with relative paths
    // strip cwd and leading path delimiter
    // .replace(cwd, '').slice(1)
    return `--files="${f.replace(cwd, '').slice(1)}"`;
  })
  .join(' ');

exec(`ng lint ${scope} --tsConfig=tsconfig.json ${files}`, (error, stdout) => {
  if (error) {
    console.log(stdout);
    process.exit(1);
  }
});
