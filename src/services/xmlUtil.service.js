import { bggService } from "./bgg.service";
import { httpService } from "./http.service.remote";

export const xmlUtilService = {
    getHottestCollection,
    getImageByGameId,
    getGameDataById
}

async function getHottestCollection( data) {
  var res = [];
  var gameObject = {
    name: "",
    image: ""
  }

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(data, "text/xml");
  //Get the number of items - we know this will be two because we only passed in two IDs
  var numberOfNames = xmlDoc.getElementsByTagName("item").length;
  
  //Create an array of the items
  var items = xmlDoc.getElementsByTagName("item");
  for (var i=0; i<numberOfNames; i++) {
      gameObject.name = items[i].getElementsByTagName('name')[0].getAttribute('value')
      gameObject.image = await _getImageByGameTitle(gameObject.name)
      res.push(gameObject)
  }

  return res;
}

async function _getImageByGameTitle( gameTitle ){
  var gameData = await bggService.getGameByTitle( gameTitle )
  console.log('gameData:', gameData)
  var items = gameData.getElementsByTagName("item");
  return "https:" + items[0].getElementsByTagName("image"[0].childNodes[0].nodeValue)
}

async function getImageByGameId( gameId ){
  var gameData =  await httpService.get(`bgg/search/${gameId}`)
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(gameData, "text/xml");
  var res = xmlDoc.getElementsByTagName("image")[0].innerHTML
  return res
}

async function getGameDataById( gameId ){
  var gameData =  await httpService.get(`bgg/search/${gameId}`)
  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(gameData, "text/xml");
  console.log('xmlDoc:', xmlDoc)
  var name = xmlDoc.getElementsByTagName("name")[0].getAttribute('value');
  var image = xmlDoc.getElementsByTagName("image")[0].innerHTML
  return { gameId, name, image}
}