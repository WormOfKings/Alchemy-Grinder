import { CraftingService } from './../../services/crafting-service/crafting.service';
import { ItemService } from 'src/app/services/item-service/item.service';
import { SaveService } from './../../services/save-service/save.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { InventoryItem } from 'src/app/models/models';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'inventory-item[item][index][isTooltipOpen]',
  templateUrl: './inventory-item.component.html',
  styleUrls: ['./inventory-item.component.scss']
})
export class InventoryItemComponent {
  @Input() item!: InventoryItem;
  @Input() index!: number;
  @Input() isTooltipOpen!: boolean;
  countToInteract = new FormControl<number>(1, [Validators.required, Validators.min(1), Validators.max(999)])

  @Output() openTooltip: EventEmitter<any> = new EventEmitter();

  displayMode = false;
  constructor(
    public saveService: SaveService,
    public itemService: ItemService,
    public craftingService: CraftingService
  ) {
  }
  //
  onClickSellItem(itemToSell: InventoryItem, quantityToSell: number | null) {
    if (!quantityToSell) {
      quantityToSell = 1;
    }
    if (itemToSell.cost > 0) {
      this.itemService.SellItem(itemToSell, quantityToSell);
      if (itemToSell.quantity <= 0) {
        this.itemService.clearInventorySlot(itemToSell);
      }
      this.saveService.writeGameInfo();
    }
  }

  changeDisplayMode(): void {
    this.openTooltip.emit(null);
  }

  onClickDiscardItem(itemToDiscard: InventoryItem, quantityToDiscard: number | null) {
    if (!quantityToDiscard) {
      quantityToDiscard = 1;
    }
    this.itemService.discardItem(itemToDiscard, quantityToDiscard)
    this.saveService.writeGameInfo();
  }

  addItemToWorkbench(item: InventoryItem, quantity: number | null) {
    if (!quantity) {
      quantity = 1;
    }
    console.log('quantity is', quantity)
    if (this.craftingService.displayModeMortar) {
      this.craftingService.addItemToMortar(item, quantity)
    }
    else if (this.craftingService.displayModeBarrel) {
      this.craftingService.addItemToBarrel(item, quantity)
    }
    else if (this.craftingService.displayModeAlchWork) {
      this.craftingService.addItemAlchemyWorkbench(item, quantity)
    }
  }

}
