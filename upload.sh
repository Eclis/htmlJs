#!/bin/bash
USUARIO=${1-"main"}
gulp --usuario $USUARIO
node dist/app.js --usuario $USUARIO