#!/usr/bin/env node

/* 'use strict'; */

import { exit } from 'process';
import ttf2woff2 from 'ttf2woff2';
import { mkdir, readFileSync, existsSync, writeFileSync, readdirSync } from 'fs';

function createFolder(path) {
  if (!existsSync(path)) {
    console.log(`Creating folder '${path}'\n`);
    mkdir(path, { recursive: true }, (error) => {
      if (error) throw error;
    });
  }
}

function readFolder(path) {
  if (existsSync(path)) return readdirSync(path);
  return [];
}

function main() {
  console.clear();

  const inputFolder = './';
  const outputFolder = './';

  const files = readFolder(inputFolder).filter((file) => file.includes('.ttf'));

  if (!files.length) {
    console.log(`The folder (${inputFolder}) doesn't exists or doesn't have the .ttf files`);
    exit();
  }

  createFolder(outputFolder);

  files.forEach((file) => {
    console.log(`Converting ${file}...`);

    const bufferFile = ttf2woff2(readFileSync(`${inputFolder}/${file}`));

    writeFileSync(outputFolder + '/' + file.replace('.ttf', '.woff2'), bufferFile);
  });

  console.log('\nFinished!');

  exit();
}

main();
