#!/bin/sh

current_branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
source_folder=home-v5-frontend_node
bundle_folder=home-v5-bundle

if [ $current_branch = master ]
then
  read -p "Bundle Starting - are you sure? (y/n)" -n 1 -r
  echo    # new line
  if [[ $REPLY =~ ^[Yy]$ ]]
  then
    echo "Bundling..."

    npm run clean && npm run bootstrap && npm run build:release && npm run prerender

    if [ $? -eq 0 ]
    then
      cd ../"$bundle_folder"

      # git pull latest code to avoid warning
      git pull origin master

      rm -rf ./bundle
      mkdir ./bundle

      # copy necessary files to bundle folder
      declare -a bundle_files=(dist/ packages/ external/ public/ lerna.json package.json)
      for file in "${bundle_files[@]}"
      do
        cp -R ../"$source_folder"/"$file" ./bundle/"$file"
      done

      # remove prerender-seo, only use it at development
      rm -rf ./bundle/packages/prerender-seo

      # remove yundun-theme, only use it at development
      rm -rf ./bundle/packages/yundun-theme

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

      git push origin master

      echo "Bundle Successfully at [`date +%Y-%m-%d:%H:%M:%S`]"
    fi
  fi
else
  # Define ANSI color variable
  RED='\033[0;31m'
  NC='\033[0m'

  echo "${RED}Current branch isn't [master]${NC}"
fi
