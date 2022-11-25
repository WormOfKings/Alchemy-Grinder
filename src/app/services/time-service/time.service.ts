import { Injectable } from '@angular/core';
import { SaveService } from '../save-service/save.service';
import { BehaviorSubject, filter, Observable, ReplaySubject, take } from 'rxjs';
import { Clock, CraftingTimer, InventoryItem } from 'src/app/models/models';
import { ItemService } from '../item-service/item.service';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  public currentTime$!: BehaviorSubject<Clock>;

  constructor(
    public saveService: SaveService,
    public itemService: ItemService
  ) {
    const gameInfo = this.saveService.gameInfo;
    this.currentTime$ = new BehaviorSubject<Clock>(gameInfo.clock);
    gameInfo.craftingTimers.forEach(craftingTimer => {
      this.registerCraftingTimer(craftingTimer);
    });

    this.currentTime$.subscribe((clock) => {
      this.saveService.gameInfo.clock = clock;
      this.saveService.writeGameInfo();
    });
  }

  public skipTime(minutes: number = 0, hours: number = 0, days: number = 0){
    const currentClock = this.currentTime$.value;
    console.log('currentClock', currentClock);
    const clock = new Clock(currentClock.minutes + minutes, currentClock.hours + hours, currentClock.days + days);
    console.log('new clock', clock);
    this.currentTime$.next(clock);
  }

  public addCraftingTimer(minutes: number = 0, hours: number =0, days: number =0, result: InventoryItem){
      const craftingTimer: CraftingTimer = {
        minutes,
        hours,
        days,
        result
      }
      console.log(`Adding timer for ${hours} hours for craft ${result}`);
      this.saveService.gameInfo.craftingTimers.push(craftingTimer);
      this.saveService.writeGameInfo();
      this.registerCraftingTimer(craftingTimer);
  }

  private registerCraftingTimer(craftingTimer: CraftingTimer){
    const currentClock = this.currentTime$.value;
    const craftEnd: Clock = new Clock(currentClock.minutes + craftingTimer.minutes, currentClock.hours + craftingTimer.hours, currentClock.days + craftingTimer.days)
    this.currentTime$.pipe(
      filter(clock => this.IsGreaterOrEqual(clock, craftEnd)),
      take(1)
    ).subscribe(() => {
      console.log(`Timer for craft ${craftingTimer.result} finished`);
      const index = this.saveService.gameInfo.craftingTimers.findIndex(timer => craftingTimer == timer);
      this.saveService.gameInfo.craftingTimers.splice(index, 1);
      this.saveService.craftingInfo.barrelItemResult = craftingTimer.result;
      this.saveService.writeCraftingInfo();
      this.saveService.writeGameInfo();
    })
  }

  private IsGreaterOrEqual(clock1: Clock, clock2: Clock): boolean {
    if ((clock1.days > clock2.days) ||
    ((clock1.days == clock2.days) && (clock1.hours > clock2.hours)) ||
    ((clock1.days == clock2.days) && (clock1.hours == clock2.hours) && (clock1.minutes >= clock2.minutes)))
    {
      return true;
    }
    return false;
  }

}
