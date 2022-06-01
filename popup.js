function loadUrls()
{
var links = document.getElementById("urls").value;

var links_array = links.split("\n");

var url_name="";

var links_storage=[];

var link_num=0;

for(i=0;i<links_array.length;i++)
{

url_name = "";

for(j=0;j<links_array[i].length;j++)
{

if(links_array[i][j]=="," || links_array[i][j]==" ")
{
    links_storage[link_num]=url_name;
    link_num++;
    if(url_name.slice(0,8)=="http://"){chrome.tabs.create({url:url_name});}
    else{chrome.tabs.create({url:""+url_name});}
    
    url_name="";
    continue;
}

else
{
    url_name =url_name+links_array[i][j];
}

}
links_storage[link_num]=url_name;
link_num++;
if(url_name.slice(0,8)=="http://"){chrome.tabs.create({url:url_name});}
else{chrome.tabs.create({url:""+url_name});}
}
chrome.storage.local.set({'linksStorage':links_storage});
}

function load_extension()
{
chrome.storage.local.get('linksStorage', function(result) {
        if(result.linksStorage == undefined) {
          console.log("I am retrieved!!");}
        else{
          var all_links =  result.linksStorage;
          var all_links_loader="";
          for(i=0;i<all_links.length;i++)
          {
           all_links_loader+=all_links[i]+"\n";
          }
          document.getElementById("urls").value=all_links_loader;
        }
        });
}


document.addEventListener('DOMContentLoaded', function () {

document.getElementById('button').addEventListener('click',loadUrls);

load_extension();

});