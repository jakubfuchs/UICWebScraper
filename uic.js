const puppeteer = require('puppeteer');

const url = 'https://www.unipetrolrpa.cz/CS/NabidkaProduktu/rafinerske-produkty/Stranky/Unipetrol_Index.aspx';

const xpath = {
  headline: '//*[@id="result"]/div/table/tbody/tr[1]/th/span',
  diesel: {
    title: '//*[@id="result"]/div/table/tbody/tr[4]/td[1]',
    price: '//*[@id="result"]/div/table/tbody/tr[4]/td[2]',
  },
  ba95: {
    title: '//*[@id="result"]/div/table/tbody/tr[2]/td[1]',
    price: '//*[@id="result"]/div/table/tbody/tr[2]/td[2]'
  },
  ba98: {
    title: '//*[@id="result"]/div/table/tbody/tr[3]/td[1]',
    price: '//*[@id="result"]/div/table/tbody/tr[3]/td[2]'
  },
  arctic: {
    title: '//*[@id="result"]/div/table/tbody/tr[5]/td[1]',
    price: '//*[@id="result"]/div/table/tbody/tr[5]/td[2]'
  },
  eto: {
    title: '//*[@id="result"]/div/table/tbody/tr[6]/td[1]',
    price: '//*[@id="result"]/div/table/tbody/tr[6]/td[2]'
  },
  ultraDiesel: {
    title: '//*[@id="result"]/div/table/tbody/tr[7]/td[1]',
    price: '//*[@id="result"]/div/table/tbody/tr[7]/td[2]'
  },
  ultraGasoline: {
    title: '//*[@id="result"]/div/table/tbody/tr[8]/td[1]',
    price: '//*[@id="result"]/div/table/tbody/tr[8]/td[2]'
  }
}

var results = {
  headline: 'not set',

  ultraDiesel: {
    title: 'not set',
    price: 'not set',
    getResults: function() {
      let title = this.title;
      let price = this.price;
      return {title, price}
     }
  },

  ultraGasoline: {
    title: 'not set',
    price: 'not set',
    getResults: function() {
      let title = this.title;
      let price = this.price;
      return {title, price}
     }
  },

  eto: {
    title: 'not set',
    price: 'not set',
    getResults: function() {
      let title = this.title;
      let price = this.price;
      return {title, price}
     }
  },

  diesel: {
    title: 'not set',
    price: 'not set',
    getResults: function() {
      let title = this.title;
      let price = this.price;
      return {title, price}
     }
  },

  ba95: {
    title: 'not set',
    price: 'not set',
    getResults: function() {
      let title = this.title;
      let price = this.price;
      return {title, price}
     }
  },

  ba98: {
    title: 'not set',
    price: 'not set',
    getResults: function() {
      let title = this.title;
      let price = this.price;
      return {title, price}
     }
  },

  arctic: {
    title: 'not set',
    price: 'not set',
    getResults: function() {
      let title = this.title;
      let price = this.price;
      return {title, price}
     }
  }
}

function printResults(results) {
  const Headline = results.headline;
  const Diesel = results.diesel.getResults();
  const Ba95 = results.ba95.getResults();
  const Ba98 = results.ba98.getResults();
  const Arctic = results.arctic.getResults();
  const ETO = results.eto.getResults();
  const UltraDiesel = results.ultraDiesel.getResults();
  const UltraGasoline = results.ultraGasoline.getResults();

  console.log({Headline, Diesel, Ba95, Ba98, Arctic, ETO, UltraDiesel, UltraGasoline});
}

// Done via creating headless browser (chrome/chromium) and xpath selector
async function scrapeProduct(url, results) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  // check the image if it is not working, could be anti-robot
  // await page.screenshot({path: 'sample.png'})

  let fn = async function(p) {
    const [el] = await page.$x(p);
    const src = await el.getProperty('textContent');
    return await src.jsonValue();
  }

  results.headline = await fn(xpath.headline);

  results.diesel.title = await fn(xpath.diesel.title);
  results.diesel.price = await fn(xpath.diesel.price);

  results.ba95.title = await fn(xpath.ba95.title);
  results.ba95.price = await fn(xpath.ba95.price);


  results.ba98.title = await fn(xpath.ba98.title);
  results.ba98.price = await fn(xpath.ba98.price);

  results.arctic.title = await fn(xpath.arctic.title);
  results.arctic.price = await fn(xpath.arctic.price);

  results.eto.title = await fn(xpath.eto.title);
  results.eto.price = await fn(xpath.eto.price);

  results.ultraDiesel.title = await fn(xpath.ultraDiesel.title);
  results.ultraDiesel.price = await fn(xpath.ultraDiesel.price);

  results.ultraGasoline.title = await fn(xpath.ultraGasoline.title);
  results.ultraGasoline.price = await fn(xpath.ultraGasoline.price);

  browser.close();
  printResults(results);
}

function main() {
  scrapeProduct(url, results);
}

// DEV BLOCK
(function() {

  main();


})();
