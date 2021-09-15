import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { InputTextComponent } from "./input-text/input-text.component";
import { InputNumberComponent } from "./input-number/input-number.component";
import { InputDateComponent } from "./input-date/input-date.component";
import { InputTextAreaComponent } from "./input-textarea/input-textarea.component";
import { InputSelectComponent } from "./input-select/input-select.component";
import { MaterialModule } from "../../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    InputTextComponent,
    InputNumberComponent,
    InputDateComponent,
    InputTextAreaComponent,
    InputSelectComponent,
  ],
  imports: [CommonModule, MaterialModule, ReactiveFormsModule,FormsModule],
  exports: [
    InputTextComponent,
    InputNumberComponent,
    InputDateComponent,
    InputTextAreaComponent,
    InputSelectComponent,
  ]
})
export class CampoModule {}
