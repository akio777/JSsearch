let stringSimilarity = require('string-similarity');

function customSearch(search, presearch){
    const keyword = search.split(' ');
    // console.log(keyword)
    // console.log(presearch)
    const target = ["location","position","machine","technician","dd","mm","yyyy","lid"]
    target.reverse()

    return presearch.map(ele=>{
      // ele -> obj card แต่ละ อัน
      let percent = 0
      target.forEach((tg,i)=>{
        // tg -> obj ที่จะเช็ค value ข้างใน
        let weight = 0
        keyword.forEach(kw=>{
          // console.log(kw)
          // keyword -> สิ่งที่ เราพิมพ์ใน search แล้ว แยกคำด้วย เว้นวรรค
          if(ele[tg]){
              const temp = ele[tg]+""
              if(kw.length > 1){
                weight += stringSimilarity.compareTwoStrings(kw.toLowerCase(), temp.toLowerCase())
              }
              else{

                if(temp.toLowerCase().includes(kw.toLowerCase())){
                  weight += 1/temp.length
                }
              }
              // console.log(stringSimilarity.compareTwoStrings(kw, temp))
            }
        })
        percent += weight*i
      })
      // console.log(percent)
      ele.percent = percent
      return ele
    }).sort((a,b)=>{
      return b.percent - a.percent
    })
    
  }