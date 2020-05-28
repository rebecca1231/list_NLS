#!/usr/bin/env node

const chalk = require('chalk')
const fs = require('fs');
const util = require('util');
const path = require('path');

const { lstat } = fs.promises; 

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if (err) console.log(err);
   
    const allProms = filenames.map(filename => {
        return lstat(path.join(targetDir, filename))
    });

    const stats = await Promise.all(allProms);

    for(let stat of stats){
        const index = stats.indexOf(stat);
        if(stat.isFile())console.log(chalk.cyanBright(filenames[index]));
        else {console.log(chalk.magentaBright(filenames[index]));}
    }
});


// to make it run
// in terminal: chmod +x index.js
// in json "bin": {"nls": "index.js"}
// in terminal: npm link
// comment at top of this file


// Chage to last line of code
// else {console.log(chalk.magentaBright(filenames[index], stat.isFile()));}
