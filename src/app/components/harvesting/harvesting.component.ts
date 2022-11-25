import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-harvesting',
  templateUrl: './harvesting.component.html',
  styleUrls: ['./harvesting.component.scss']
})
export class HarvestingComponent implements OnInit {
  readonly zones = [
    { zone: 'Forest', src: 'harvesting-forest.jpg' },
    { zone: 'Plains', src: 'harvesting-plains.png' },
    { zone: 'Mountains', src: 'harvesting-mountains.png' },
    { zone: 'Seaside', src: 'harvesting-seaside.png' },
    { zone: 'Desert', src: 'harvesting-dessert.jpg' },
    { zone: 'Swamp', src: 'harvesting-swamp.jpg' },
    { zone: 'Caves', src: 'harvesting-caves.jpg' }
  ]
  constructor(
  ) { }
  ngOnInit(): void {
  }
}
