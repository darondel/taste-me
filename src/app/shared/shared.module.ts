import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThousandSuffixPipe } from './pipes/thousand-suffix.pipe';

@NgModule({
  declarations: [
    ThousandSuffixPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThousandSuffixPipe
  ]
})
export class SharedModule {
}
