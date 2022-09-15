import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { RequirementDetailComponent } from './requirement-detail/requirement-detail.component';
import { CreateNewPostComponent } from './create-new-post/create-new-post.component';
import { AddNewRequirementsComponent } from './add-new-requirements/add-new-requirements.component';
import { ElectronicProductSearchComponent } from './electronic-product-search/electronic-product-search.component';
import { HomeExpandedComponent } from './home-expanded/home-expanded.component';
import { TemplatesModule } from 'src/app/shared/templates/templates.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from 'src/app/layout/layout.module';
import { HeaderComponent } from 'src/app/layout/header/header.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AddNewRequirementTabComponent } from './add-new-requirement-tab/add-new-requirement-tab.component';
import { ManufacturingOrderRequirementComponent } from './manufacturing-order-requirement/manufacturing-order-requirement.component';
import { HrRequirementComponent } from './hr-requirement/hr-requirement.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MachineRequirementComponent } from './machine-requirement/machine-requirement.component';
import { RawMaterialComponent } from './raw-material/raw-material.component';
import { FinanceComponent } from './finance/finance.component';
import { OthersComponent } from './others/others.component';
import { ManufacturingORHomeComponent } from './manufacturing-o-r-home/manufacturing-o-r-home.component';
import { HrRequirementHomeComponent } from './hr-requirement-home/hr-requirement-home.component';
import { MachineHomeComponent } from './machine-home/machine-home.component';
import { RawMaterialHomeComponent } from './raw-material-home/raw-material-home.component';
import { FinanceHomeComponent } from './finance-home/finance-home.component';
import { OtherHomeComponent } from './other-home/other-home.component';
import { ManufacturingORListComponent } from './manufacturing-o-r-list/manufacturing-o-r-list.component';
import { HrRequirementListComponent } from './hr-requirement-list/hr-requirement-list.component';
import { MachineListComponent } from './machine-list/machine-list.component';
import { RawMaterailListComponent } from './raw-materail-list/raw-materail-list.component';
import { FinanceListComponent } from './finance-list/finance-list.component';
import { OtherListComponent } from './other-list/other-list.component';
import { InteresteduserComponent } from './interesteduser/interesteduser.component';
import { ProposalScreenComponent } from './proposal-screen/proposal-screen.component';
import { DateAsAgoPipe } from 'src/app/shared/date-as-ago.pipe';
import { ShareComponent } from './share/share.component';
import { SharebyComponent } from './shareby/shareby.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DirectivesModule } from 'src/app/directives/directives.module';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ShareModule } from 'ngx-sharebuttons';
import { MypostListComponent } from './mypost-list/mypost-list.component';
import { NgxPaginationModule } from 'ngx-pagination';




@NgModule({
    declarations: [
        PostDetailComponent,
        RequirementDetailComponent,
        CreateNewPostComponent,
        AddNewRequirementsComponent,
        ElectronicProductSearchComponent,
        HomeExpandedComponent,
        AddNewRequirementTabComponent,
        ManufacturingOrderRequirementComponent,
        HrRequirementComponent,
        MachineRequirementComponent,
        RawMaterialComponent,
        FinanceComponent,
        OthersComponent,
        ManufacturingORHomeComponent,
        HrRequirementHomeComponent,
        MachineHomeComponent,
        RawMaterialHomeComponent,
        FinanceHomeComponent,
        OtherHomeComponent,
        ManufacturingORListComponent,
        HrRequirementListComponent,
        MachineListComponent,
        RawMaterailListComponent,
        FinanceListComponent,
        OtherListComponent,
        InteresteduserComponent,
        ProposalScreenComponent,
        DateAsAgoPipe,
        ShareComponent,
        SharebyComponent,
        MypostListComponent,
        
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        TemplatesModule,
        MatDialogModule,
        ReactiveFormsModule,
        FormsModule,
        LayoutModule,
        MatSelectModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatButtonToggleModule,
        DirectivesModule,
        NgxDocViewerModule,
        CarouselModule,
        ShareButtonsModule.withConfig({
            debug: true,
          }),
          ShareIconsModule,
          FontAwesomeModule,
          ShareModule,
          NgxPaginationModule

    ],
    exports: [PostDetailComponent]
})
export class HomeModule { }