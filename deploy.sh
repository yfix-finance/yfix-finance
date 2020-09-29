#!/bin/bash

# define CLI and set endpoints
if [ "$1" == "dev" ]; then
    REMOTE_HOST="dev-app-origin.yfix.finance"
    REMOTE_BASE="/home/yfix-finance"
    REMOTE_USER="yfix-finance"
    REPO_GIT_ID=`date -u +%Y%m%dT%H%M%S`
elif [ "$1" == "prod" ]; then
    REMOTE_HOST="app-origin.yfix.finance"
    REMOTE_BASE="/home/yfix-finance"
    REMOTE_USER="yfix-finance"
    REPO_GIT_ID=`date -u +%Y%m%dT%H%M%S`
else
	echo "Usage: deploy.sh <dev|prod> <replace|activate>"
    exit 1
fi

# define repo folders
REPO_NAME="yfix-finance"
REPO_BASE="$( cd -P "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
REMOTE_DIR="${REPO_NAME}_$REPO_GIT_ID"
REMOTE_PATH="$REMOTE_BASE/$REMOTE_DIR"
TEMP_DIR="$(mktemp -d -t deploy.XXXXXXX)"

# define die function
function die { echo "$@"; exit 1; }

# check this is a git repository
[ -d "$REPO_BASE/.git" ] || die "ERROR: No .git folder found. Run this script from the root of the respository"
echo "Deploying files from '$REPO_BASE'"
echo "Deploying files to remote path '$REMOTE_PATH'"

# check if remote folder already exists
REMOTE_PATH_EXISTS=$(ssh $REMOTE_USER@$REMOTE_HOST "[ -e \"$REMOTE_PATH\" ] || echo NOT")

# remove existing folder or quit
if [ "$REMOTE_PATH_EXISTS" != "NOT" ]; then
	read -p "Remote path '$REMOTE_PATH' already exists. Erase it? (y/n): " ACTIVATE_REPLY
	if [ "$ACTIVATE_REPLY" == "y" ]; then
		ssh $REMOTE_USER@$REMOTE_HOST "chmod -R +w \"$REMOTE_PATH\"; rm -fR \"$REMOTE_PATH\""
		echo "Remote path '$REMOTE_PATH' was erased."
	else
		echo "Remote path '$REMOTE_PATH' not erased. Quitting!"
		exit 1
	fi
fi

# package repository files
echo "Packaging local files into '$TEMP_DIR/$REMOTE_DIR.tar.gz'"
env COPYFILE_DISABLE=true tar --exclude=node_modules --exclude=.git --exclude=.DS_Store* -C "$REPO_BASE" -czf "$TEMP_DIR/$REMOTE_DIR.tar.gz" "./"

# copy local archive
echo "Copying archive to '$REMOTE_HOST:$REMOTE_BASE/$REMOTE_DIR.tar.gz'"
scp -r "$TEMP_DIR/$REMOTE_DIR.tar.gz" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_BASE"
rm -fR "$TEMP_DIR/"

# unpack remote archive
echo "Unpacking remote archive to '$REMOTE_BASE/$REMOTE_DIR'"
ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_BASE && mkdir $REMOTE_DIR && tar -C $REMOTE_DIR -xzf \"$REMOTE_DIR.tar.gz\"; rm \"$REMOTE_DIR.tar.gz\" "

# install node packages
ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_BASE/$REMOTE_DIR; npm install" || die "ERROR: Unable to install node packages"

# run build
if [ "$1" == "prod" ]; then
	ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_BASE/$REMOTE_DIR; npm run build" || die "ERROR: Unable to create optimized production build"
elif [ "$1" == "dev" ]; then
	ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_BASE/$REMOTE_DIR; npm build" || die "ERROR: Unable to create optimized dev build"
fi

# determine whether to replace or activate deployment
if [ "$2" == "replace" ]; then
	ssh $REMOTE_USER@$REMOTE_HOST "readlink -f \"$REPO_NAME\" | xargs rm -r" # replace previous live deployment
	ACTIVATE_REPLY="y"
elif [ "$2" == "activate" ]; then
	ACTIVATE_REPLY="y"
else
	read -p "Do you want to activate '$REMOTE_DIR' as the live deployment? (y/n): " ACTIVATE_REPLY
fi

# activate live deployment + omaha
if [ "$ACTIVATE_REPLY" == "y" ]; then 

	echo "Activating deployment '$REMOTE_DIR'"
	ssh $REMOTE_USER@$REMOTE_HOST "cd $REMOTE_BASE; rm -f \"$REPO_NAME\"; ln -sf \"$REMOTE_DIR\" \"$REPO_NAME\"" || die "ERROR: Failed to change deployment symlink. Serving of files is likely broken; FIX ASAP!"
fi