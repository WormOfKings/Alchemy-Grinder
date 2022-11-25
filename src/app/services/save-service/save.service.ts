import { Clock } from './../../models/models';
import { Injectable } from '@angular/core';
import { CraftingInfo, GameInfo, InventoryItem } from 'src/app/models/models';

@Injectable({
  providedIn: 'root'
})
export class SaveService {

  gameInfo: GameInfo = this.readGameInfo();
  constructor() {

  }


getNewGameInfo(){
    return {
        coins: 0,
        inventory: [],
        clock: new Clock(0, 0, 0),
        craftingTimers: [],
   }
}

readGameInfo(): GameInfo {
  const parsingResult = (JSON.parse(localStorage.getItem('alchGameInfo') as any) ?? this.getNewGameInfo());
  parsingResult.clock = new Clock(parsingResult.clock._minutes, parsingResult.clock._hours, parsingResult.clock._days);
  return parsingResult;
}

writeGameInfo(){
  localStorage.setItem('alchGameInfo', JSON.stringify(this.gameInfo));
}

craftingInfo: CraftingInfo =
this.readCraftingInfo() ?? this.getNewCraftingInfo();

getNewCraftingInfo() {
return {
  mortarItem: null,
  barrelItem: null,
  alchWorkbenchItems: [],
  mortarItemResult: null,
  barrelItemResult: null,
  alchWorkbenchItemResult: null,
};
}

readCraftingInfo() {
return JSON.parse(localStorage.getItem('alchGameInfoCraft') as any);
}

writeCraftingInfo() {
localStorage.setItem(
  'alchGameInfoCraft',
  JSON.stringify(this.craftingInfo)
);
}

}
