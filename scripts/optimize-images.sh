#!/bin/bash

# Define source and target directories
sourceDir="./src/assets/img"
targetDir="./src/assets/opt_img"

# Function to install FFmpeg
installFFmpeg() {
    if ! command -v ffmpeg &> /dev/null; then
        echo "FFmpeg not found, installing..."
        sudo apt-get update
        sudo apt-get install -y ffmpeg
    else
        echo "FFmpeg is already installed."
    fi
}

# Function to process images using FFmpeg
processImage() {
    echo "Processing image"
    local sourcePath=$1
    local targetPath=$2
    ffmpeg -i "$sourcePath" -qscale:v 2 "$targetPath" # Adjust quality with qscale
}

# Function to remove a directory
removeDirectory() {
    local targetDir=$1
    rm -rf "$targetDir"
}

# Function to process a directory
processDirectory() {
    echo "starting processing"
    local sourceDir=$1
    local targetDir=$2

    mkdir -p "$targetDir" # Create target directory
    echo "processing:" $sourceDir
    for filePath in "$sourceDir"/*; do
        echo "entered:" $filePath
        if [ -d "$filePath" ]; then
            echo "recursing on:" $filePath
            # If directory, recursively process
            newTargetDir="$targetDir/$(basename "$filePath")"
            processDirectory "$filePath" "$newTargetDir"
        elif [ -f "$filePath" ]; then
            echo "processing file:" $filePath
            # If file, check for image extensions and process
            case "$filePath" in
                *.jpg|*.jpeg|*.png)
                    targetPath="$targetDir/$(basename "$filePath")"
                    processImage "$filePath" "$targetPath"
                    ;;
            esac
        fi
    done
}

# Main script execution
installFFmpeg
removeDirectory "$targetDir"
processDirectory "$sourceDir" "$targetDir"
