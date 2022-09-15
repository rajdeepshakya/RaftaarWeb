import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplatesRoutingModule } from './templates-routing.module';
import { CardsComponent } from './cards/cards.component';
import { LikeCardComponent } from './like-card/like-card.component';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { ShowInterestComponent } from './show-interest/show-interest.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        CardsComponent,
        LikeCardComponent,
        ShowInterestComponent,
        MenuCardComponent,
    ],
    imports: [
        CommonModule,
        TemplatesRoutingModule,
        ReactiveFormsModule
    ],
    exports: [CardsComponent, LikeCardComponent, MenuCardComponent, ShowInterestComponent]
})

export class TemplatesModule { }
