const puppeteer = require('puppeteer');
const fs=require('fs');
// const firebase = require("firebase");
// require("firebase/firestore");

// const { resolve } = require('path');

// Initialize Firebase
// Get your firebase credentials from
// the firebase co nsole for your project
// firebase.initializeApp({
//   apiKey: "171aab7d7285a60ba16d5667dabe61517332bb99",
//   authDomain: "propeeee.firebaseapp.com",
//   databaseURL: "https://Propeeee.firebaseio.com",
//   projectId: "propeeee",
//
//
// });



const scrap = async () =>{
    const browser = await puppeteer.launch({headless : false}); //browser initiate
    const page = await browser.newPage();  // opening a new blank page
    await page.goto("https://www.icc-cricket.com/rankings/mens/team-rankings/odi"); // navigate to url and wait until page loads completely

    const recordList = await page.$$eval('tbody tr',(trows)=>{
        let rowList = []
        trows.forEach(row => {
                let record = {'position' : '','team' :'', 'rating' : '', 'points':'', 'matches':'', 'lastUpdate':''}

                const tdList = Array.from(row.querySelectorAll('td'), column => column.innerText); // getting textvalue of each column of a row and adding them to a list.
                record.position = tdList[0];
                record.team = tdList[1];
                record.rating = tdList[2];
                record.points = tdList[3];
                record.matches = tdList[4];
                // record.lastUpdate= document.querySelector('div[class="rankings-table__last-updated"]').text().trim();


                if(tdList.length >= 3){
                    rowList.push(record)
                }
            });
        return rowList;
    })
    console.log(recordList)

    fs.writeFile('records.json',JSON.stringify(recordList, null, 2),(err)=>{
        if(err){console.log(err)}
        else{console.log('Saved Successfully!')}
    })
        browser.close();
};
scrap();



// <div class="rankings-table__last-updated">Last updated (GMT) - 14 Feb 2022</div>
