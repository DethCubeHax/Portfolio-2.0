#!/bin/bash

# Get the commit message from the command line argument
commit_message="$1"

# Check if the commit message is empty
if [[ -z "$commit_message" ]]; then
    echo "Please provide a commit message"
    exit 1
fi

# Add and commit changes to the main branch
echo "Adding and committing changes on main branch..."
git add .
git commit -m "$commit_message"
git push origin main

# Copy files from src to home directory
echo "Copying files from src to home directory..."
cp -r src ~

# Checkout to the public branch
echo "Checking out to public branch..."
git checkout public

# Merge files with the public src
echo "Copying and merging src files with public src..."
cp -r ~/src .

# Add, commit and push changes to the public branch
echo "Adding, committing, and pushing changes on public branch..."

echo "Script execution completed successfully!"