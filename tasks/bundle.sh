#!/bin/sh
current_branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
source_project=$1
bundle_project=$2
release_branch=$3

if [ $current_branch = $release_branch ]
then
  read -p "Bundle Starting - are you sure? (y/n)" -n 1 -r
  echo    # new line
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo "Bundling..."

    npm run clean && npm run bootstrap && npm run build

    if [ $? -eq 0 ]
    then
      cd ../"$bundle_project"

      # git pull latest cod
      git pull origin $release_branch

      rm -rf ./bundle
      mkdir ./bundle

      # copy necessary files to bundle folder
      declare -a bundle_files=(dist/ packages/ external/ public/ lerna.json package.json)
      for file in "${bundle_files[@]}"
      do
        cp -R ../"$source_project"/"$file" ./bundle/"$file"
      done

      # trim packages/server folder
      declare -a server_files_trim=(log/ .gitignore package-lock.json)
      for file in "${server_files_trim[@]}"
      do
        rm -rf ./bundle/packages/server/"$file"
      done

      # trim packages/dev-utils folder
      declare -a devUtils_files_trim=(.gitignore package-lock.json)
      for file in "${devUtils_files_trim[@]}"
      do
        rm -rf ./bundle/packages/dev-utils/"$file"
      done

      git add .

      git commit -m "Bundle Date [`date +%Y-%m-%d:%H:%M:%S`]"

      git push origin $release_branch

      echo "Bundle Successfully at [`date +%Y-%m-%d:%H:%M:%S`]"
    fi
  fi
else
  # Define ANSI color variable
  RED='\033[0;31m'
  NC='\033[0m'

  echo "${RED}Current branch isn't [${release_branch}]${NC}"
fi
