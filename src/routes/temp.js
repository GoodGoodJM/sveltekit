// import * as puppeteer from 'puppeteer-core'
import Chromium from "chrome-aws-lambda"

export const get = async () => {
    const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless
      }
    : {
        args: [],
        executablePath:
          process.platform === 'win32'
            ? 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
            : process.platform === 'linux'
            ? '/usr/bin/google-chrome'
            : '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      }
    const browser = await Chromium.puppeteer.launch(options)

    const page = await browser.newPage()
    await page.setViewport({ width: 2000, height: 1000 });
    await page.goto("https://sveltekit-temp-test.vercel.app/")
  console.log("temp")
  const pdf =await page.pdf({format: 'a4'})
  await browser.close()
  /*
  const buffer = await generatePdf(
    { url: "https://sveltekit-temp-test.vercel.app/" },
    { format: "A4" }
  )
  */
  console.log("temp1")
  return {
    headers: {
      "Content-type": "application/pdf",
      "Content-Disposition": "attachment; filename=temp.pdf",
    },
    //body: buffer,
    body:  pdf,
  }
}