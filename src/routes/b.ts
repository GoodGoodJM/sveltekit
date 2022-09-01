
export const get = async () => {
    console.log("vdvdvdv")
    const Chromium = await (await import("chrome-aws-lambda")).default
    const puppeteer = await import( "puppeteer-core")

    console.log("asdfdsf")
    const path = await Chromium.executablePath
    console.log(path)
    const options = process.env.AWS_REGION
    ? {
        args: Chromium.args,
        executablePath: path,
        headless: Chromium.headless
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
    const browser = await puppeteer.launch(options)

    const page = await browser.newPage()
    await page.setViewport({ width: 2000, height: 1000 });
    await page.goto("https://sveltekit-temp-test.vercel.app/", {
        waitUntil: 'networkidle0', // wait for page to load completely
      })
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

  const buffer =Buffer.from(Object.values(pdf))
  return {
    headers: {
      "Content-type": "application/pdf",

      "Content-Disposition": "attachment; filename=temp.pdf",
    },
    //body: buffer,
    body:  buffer
  }
}