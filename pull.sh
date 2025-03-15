#!/bin/bash
cd "$(dirname "$0")"
GIT_SSH_COMMAND="ssh -i ~/.ssh/femmelady" git pull origin master