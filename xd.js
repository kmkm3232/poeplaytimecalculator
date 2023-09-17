const fs = require("fs")
const readline = require('readline');
const dayjs = require('dayjs')

let start = ''
let prev = ''
let playtime = 0
let sessionCount = 1
const fileStream = fs.createReadStream('Client.txt')
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

rl.on('line', (line) =>{
    if(line.includes('***** LOG FILE OPENING *****')){
        if(start.length == 0){
            start = line
        }else{
            const i = dayjs(start.slice(0,19))
            const j = dayjs(prev.slice(0,19))
            const diffe = j.diff(i, 'minute')
            if(diffe > 0){
                playtime += diffe
                console.log(`Session ${sessionCount}: From ${i} to ${j}, PlayTime: ${diffe} minutes`)
                console.log("Total minutes", playtime)
            }
            sessionCount += 1
            start = line
            prev = line
        }
    }else{
        prev = line
    }
})
rl.on('close', ()=>{
    console.log(`Finished, Tota playtime : around ${playtime/60} hours`)
})