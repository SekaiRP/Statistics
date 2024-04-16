document.addEventListener("DOMContentLoaded", function() {
  const loadingAnimation = document.querySelector('.loading-overlay');
  loadingAnimation.style.display = 'none';
});


function dynamicColorsGenerator(yValues){
  const maxColorValue = 255; 
  const minColorValue = 50; 
  const colorRange = maxColorValue - minColorValue;

  return yValues.map(value => {
    const colorValue = minColorValue + (colorRange * (value - Math.min(...yValues))) / (Math.max(...yValues) - Math.min(...yValues));
    return `rgb(${colorValue} ,${maxColorValue - colorValue},255)`;});
}

function chartGenerator(xValues,yValues){
  
  const dynamicColors = dynamicColorsGenerator( yValues);

  return new Chart("chatState", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            label: 'Chat',
            backgroundColor: dynamicColors,
            data: yValues
        }],
        
    },
    options: {
      scales: {
        x: {
          ticks: {
            color: '#000'
          }
        },
        y: {
          ticks: {
            color: '#000' 
          },
          beginAtZero: true
        }
    }
    }
});}


function vipDev(data){
  const div = document.createElement("div")
  const sp1 = document.createElement("td")
  sp1.innerHTML = data.name
  const sp2 = document.createElement("td")
  sp2.innerHTML = data.id
  div.appendChild(sp1)
  div.appendChild(sp2)
  
  return div
}

function row(data,map) {
  const trE = document.createElement("tr")
  map.forEach(value=>{
    let tdE = document.createElement("td");
    tdE.innerText = data[value] || "Null"
    trE.appendChild(tdE) 
  });
  return trE
}



const memberRankT = document.getElementById("member-chat-rank")

const rubyRankT = document.getElementById("member-ruby-rank")

const postRankT = document.getElementById("member-post-rank")

const repostTheme = document.getElementById("repost-themes")

const vipBox = document.getElementById("VIP-box")


const userChatMap = ["title","_id","p","m","a","dsj"] 

const userRubyMap = ["name","id","status"] 

const repostThemeMap = ["week","day","theme"] 

const userPostMap = ["name","id","top","status"] 

fetch('http://okami.dns-dynamic.net/api/state')
  .then(response => response.json())
  .then(data => {
    
    document.getElementById("total-chat").innerText = data.chat.total
    
    document.getElementById("average-chat").innerText = data.chat.avg
    
    document.getElementById("bUserName").innerHTML = data.bMember.name || "Null"
    
    document.getElementById("bUserId").innerHTML = data.bMember.id || "Null"
    
    document.getElementById("bVipName").innerHTML = data.bAdmin.id || "Null"
    
    document.getElementById("bVipId").innerHTML = data.bAdmin.id || "Null"
    
    chartGenerator(data.chat.days,data.chat.msg) 
    
    data.top_chat.forEach(value=>{
      memberRankT.appendChild(row(value ,userChatMap ))
    })
    
    data.ruby.forEach(value=>{
      rubyRankT.appendChild(row(value ,userRubyMap ))
    })
    
    data.post.forEach(value=>{
      postRankT.appendChild(row(value ,userPostMap ))
    })
    
    data.theme.forEach(value=>{
      repostTheme.appendChild(row(value ,repostThemeMap ))
    })
    
    data.vips.forEach(value => {
      vipBox.appendChild(vipDev(value))
    })
  })
  .catch(error => console.error('Error reading file:', error));




rankTables = Array.from(document.getElementsByClassName("rank-card"))
  
document.getElementById("table-menu").addEventListener("click",e=>{
  const selectedItem = e.target.getAttribute("item");
  if(selectedItem){
  rankTables.forEach(item=>{
    if(item.id == selectedItem){
      item.style.display = "block";
    }else{
      item.style.display = "none";
    }
  })
  }
});

