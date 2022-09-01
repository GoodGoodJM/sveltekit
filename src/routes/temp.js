
export const get = async () => {
  console.log("temp")
  const {generatePdf} = await import("html-pdf-node")
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
    body: "hel",
  }
}