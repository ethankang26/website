const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set viewport to match canvas size
  await page.setViewport({ width: 1280, height: 720 });
  
  // Load the HTML file
  await page.goto(`file://${path.join(process.cwd(), 'public', 'generate-videos.html')}`);
  
  // Wait for all downloads to complete (10 videos * 6 seconds each)
  await page.waitForTimeout(70000);
  
  await browser.close();
  
  // Convert webm files to mp4 (requires ffmpeg)
  const videosDir = path.join(process.cwd(), 'public', 'videos');
  const files = fs.readdirSync(videosDir);
  
  for (const file of files) {
    if (file.endsWith('.webm')) {
      const inputPath = path.join(videosDir, file);
      const outputPath = path.join(videosDir, file.replace('.webm', '.mp4'));
      await new Promise((resolve, reject) => {
        const { exec } = require('child_process');
        exec(`ffmpeg -i "${inputPath}" -c:v libx264 -crf 23 "${outputPath}"`, (error) => {
          if (error) reject(error);
          else {
            fs.unlinkSync(inputPath); // Delete webm file
            resolve();
          }
        });
      });
    }
  }
})(); 