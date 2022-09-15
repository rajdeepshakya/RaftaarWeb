import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SidenavComponent } from './sidenav/sidenav.component';
import { HeaderComponent } from './header/header.component';
import { WrapperComponent } from './wrapper/wrapper.component';
import { BusinessWrapperComponent } from './business-wrapper/business-wrapper.component';
import { BusinessSidenavComponent } from './business-sidenav/business-sidenav.component';
import { MobHeaderComponent } from './mob-header/mob-header.component';
import { MobSidenavComponent } from './mob-sidenav/mob-sidenav.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from './footer/footer.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [
        SidenavComponent,
        HeaderComponent,
        WrapperComponent,
        BusinessWrapperComponent,
        BusinessSidenavComponent,
        MobHeaderComponent,
        MobSidenavComponent,
        FooterComponent,
    ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatSelectModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        HeaderComponent
    ]
})
export class LayoutModule { }
