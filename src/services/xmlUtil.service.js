import { bggService } from "./bgg.service";
import { httpService } from "./http.service.remote";

export const xmlUtilService = {
    getImageByGameId,
    getGameDataById,
    getGamesArrayByName
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
  var name = xmlDoc.getElementsByTagName("name")[0].getAttribute('value');
  var image = xmlDoc.getElementsByTagName("image")[0].innerHTML
  return { gameId, name, image}
}

async function getGamesArrayByName( gamesArrayData, limit = 5){
  var res = [];
  var gameObject = {
    name: "",
    id: "",
    image: "",
  }

  var parser = new DOMParser();
  var xmlDoc = parser.parseFromString(gamesArrayData, "text/xml");
  var numberOfNames = xmlDoc.getElementsByTagName("item").length;

  //Create an array of the items
  var items = xmlDoc.getElementsByTagName("item");
  for (var i=0; i<numberOfNames && i < limit; i++) {
    gameObject.name = items[i].getElementsByTagName('name')[0].getAttribute('value')
    gameObject.id = items[i].getAttribute('id')
    var gameData = await xmlUtilService.getGameDataById(gameObject.id)
    gameObject.image = gameData.image
    res.push({"id": gameObject.id,"name": gameObject.name,"image": gameObject.image})
  }
  console.log('res:', res)
  return res;
  
}