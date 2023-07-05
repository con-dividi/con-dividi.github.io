const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const sourceDir = path.join(__dirname, '../src/assets/img');
const targetDir = path.join(__dirname, '../src/assets/opt_img');

const processImage = async (sourcePath, targetPath) => {
	await sharp(sourcePath)
		.jpeg({
			quality: 60,
			progressive: true,
		})
		.toFile(targetPath);
};

const removeDirectory = (targetDir) => {
	rimraf.sync(targetDir);
};

const processDirectory = (sourceDir, targetDir) => {
	fs.readdirSync(sourceDir, { withFileTypes: true }).forEach(async (dirent) => {
		const sourcePath = path.join(sourceDir, dirent.name);
		const targetPath = path.join(targetDir, dirent.name);

		if (dirent.isDirectory()) {
			fs.mkdirSync(targetPath, { recursive: true });
			processDirectory(sourcePath, targetPath);
		} else if (dirent.isFile() && ['.jpg', '.jpeg', '.png'].includes(path.extname(dirent.name))) {
			await processImage(sourcePath, targetPath);
		}
	});
};

// Call removeDirectory before processing images
removeDirectory(targetDir);
processDirectory(sourceDir, targetDir);
