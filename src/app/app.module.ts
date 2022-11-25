import { HarvestingComponent } from './components/harvesting/harvesting.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { InventoryItemComponent } from './components/inventory-item/inventory-item.component';
import { CraftingComponent } from './components/crafting/crafting/crafting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HarvestingAreaCardComponent } from './components/harvesting-area-card/harvesting-area-card.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
@NgModule({
  declarations: [
    AppComponent,
    InventoryItemComponent, // here goes your components (or they wont work!)
    HarvestingComponent,
    CraftingComponent,
    HarvestingAreaCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, //here goes material imports
    BrowserAnimationsModule,
    MatButtonModule,
    MatSliderModule,
    MatTooltipModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    MatTabsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
