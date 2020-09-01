const puppeteer = require("puppeteer");

async function npmScraper(package) {
  package = package.replace("s", "%20");

  let url = `https://www.npmjs.com/search?q=${package}`;

  const broswer = await puppeteer.launch();
  const page = await broswer.newPage();
  await page.goto(url);

  /////GIVES TOTAL NUMBER OF SEARCH RESULTS FROM NPM
  // const [numberOfResultsElement] = await page.$x(
  //   '//*[@id="app"]/div/div[1]/main/div[1]/div/div[1]/h2'
  // );

  // const numberOfResultsText = await numberOfResultsElement.getProperty(
  //   "textContent"
  // );
  // const numberOfResultsJSON = await numberOfResultsText.jsonValue();
  // const numberOfResultsString = JSON.stringify(numberOfResultsJSON);
  // const numRes = parseInt(numberOfResultsString.match("[0-9]+"));

  var packageLinks = [];

  //loop through max number of
  for (i = 1; i <= 18; i++) {
    const [el] = await page.$x(
      `    /html/body/div/div/div[1]/main/div[2]/div/section[${i}]/div[2]/div[1]/a
`
    );
    //*[@id="app"]/div/div[1]/main/div[2]/div/section[${i}]/div[2]/div[1]/a
    const npmName = await el.getProperty("textContent");
    const name = await npmName.jsonValue();
    const link = await el.getProperty("href");
    const linkText = await link.jsonValue();

    //new tab for each package that is returned in search result
    const packagePage = await broswer.newPage();
    await packagePage.goto(linkText);
    //find number of downloads of the selected package
    const [downloads] = await packagePage.$x(
      '//*[@id="top"]/div[3]/div[1]/div/div/p'
    );
    const numOfDownlaodsText = await downloads.getProperty("textContent");
    const numOfDownloadsJSON = await numOfDownlaodsText.jsonValue();
    const numOfDownlaodsStringify = JSON.stringify(numOfDownloadsJSON);
    const numOfDownloads = numOfDownlaodsStringify.match("[0-9]+");

    await packageLinks.push({
      packageName: name,
      packageURL: linkText,
      downloadNumber: numOfDownloads[0],
    });

    await packagePage.close();
    
  }

  await page.close();
  return packageLinks;
}

module.exports = {
    npmScraper
}