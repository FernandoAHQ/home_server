const puppeteer = require('puppeteer');
const url = 'http://192.168.100.1/html/login_inter.html';
if (!url) {
    throw "Please provide URL as a first argument";
}
async function scan () {
 
  try {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1440,900']
       });
    const page = await browser.newPage();
    await page.goto(url);
    await page.type('#user_name', 'root')
    await page.type('#loginpp', 'admin')
    await page.click('[id="login_btn"]')
    await page.waitForNavigation()

    await page.click('li#first_menu_security')

    await page.click('.sec-menu>li>ul>li:nth-child(4)')

    await page.waitForSelector('iframe[src="mac_filter_inter.html"]')
    await page.waitForTimeout(4000)
    let x;
    
    await page.evaluate(()=>{
        let iframe = document.querySelector('iframe[src="mac_filter_inter.html"]');
        let doc = iframe.contentDocument;
         
        
        let rows = Array.from(doc.querySelectorAll('#mac_filter_List>tr'));
        let values = rows.map(element => {
          console.log(element)
            return element.querySelector(':nth-last-child(2)').innerHTML == 'Disable'
        })
        return values;

 
    }).then((value)=>{
      x=value;
    })
      console.log(x)
      // for (const property in x) {
      //   console.log(x[property])
      // }
      //    for(int i = 0; i < x.length())
    
    await browser.close();
    return x;
  } catch (error) {
    console.log(error);
    console.log('SERVER ERROR lol');
  }
  return [];
}

async function run (id, toggle) {
 
  try {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--window-size=1440,900']
       });
    const page = await browser.newPage();
    await page.goto(url);
    await page.type('#user_name', 'root')
    await page.type('#loginpp', 'admin')
    await page.click('[id="login_btn"]')
    await page.waitForNavigation()

    await page.click('li#first_menu_security')

    await page.click('.sec-menu>li>ul>li:nth-child(4)')

    await page.waitForSelector('iframe[src="mac_filter_inter.html"]')
    await page.waitForTimeout(4000)
    let x;
    
    await page.evaluate((id, toggle)=>{
        let iframe = document.querySelector('iframe[src="mac_filter_inter.html"]');
        let doc = iframe.contentDocument;
         
        
        //CHECK DEVICES
      //  doc.querySelector('input[type="checkbox"][value="del_'+id+'"]').checked=toggle;
      doc.getElementById('mactable_'+id).click();
        doc.getElementById("mac_enable").value = (toggle ? '1':'0');
        doc.querySelector('input[onclick="doSave()"]').click();
       
        let rows = Array.from(doc.querySelectorAll('#mac_filter_List>tr'));
        let values = rows.map(element => {
          console.log(element)
            return element.querySelector(':nth-last-child(2)').innerHTML == 'Disable'
        })

        values[Number.parseInt(id)] = !toggle
        return values;


      //  var rows = doc.querySelectorAll('input[type="checkbox"]');
    //    .getElementsByTagName("tr"); 
         
      return rows;
    },id, toggle).then((value)=>{
      x=value;
    })
      console.log(x)
      // for (const property in x) {
      //   console.log(x[property])
      // }
      //    for(int i = 0; i < x.length())
     
    await page.screenshot({path: 'screenshot.png'});
    await browser.close();
    console.log('SS DONE');
    return x;
  } catch (error) {
    console.log(error);
    console.log('SERVER ERROR lol');
    await browser.close();
  }
  return [];
}


module.exports = {
    scan,
    run
}