#!/bin/bash

parent=''
commit=''
push=''

git add .
git restore --staged check.sh
git restore --staged ./src/app.module.ts
command=$(git reflog | grep -E "moving from .+? to $(git rev-parse --abbrev-ref HEAD)" | sed -re 's|^.+moving from ([^ ]+).+$|\1|')

while getopts "h:vf:" flag; do
 case $flag in
 h) # Handle the -h flag
  # Display script help information
  echo "$OPTARG"
  ;;
 v) # Handle the -v flag
  # Enable verbose mode
  ;;
 f) # Handle the -f flag with an argument
  filename=$OPTARG
  # Process the specified file
  ;;
 \?)
  # Handle invalid options
  ;;
 esac
done

if [ -z "$1" ]; then
 echo "Checking for main"
 if [ "$command" = "main" ]; then
  echo "main: Good to go"
 else
  echo "main: check your branch . it doesnt originates from main"
  exit
 fi

else
 if [ "$command" = "$1" ]; then
  echo "$1: Good to go "
 else
  echo "$1: check you branch . it doesnt originates from $1 . it originates from $command "
  exit
 fi
fi

# git status
