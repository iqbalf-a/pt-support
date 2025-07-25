import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { EncodeBase64Component } from './page/encode-base64/encode-base64.component';
import { DecodeBase64Component } from './page/decode-base64/decode-base64.component';
import { EncodeBase64FileComponent } from './page/encode-base64-file/encode-base64-file.component';
import { SummaryComponent } from './page/summary/summary.component';
import { TextCompareComponent } from './page/text-compare/text-compare.component';
import { TextFilterComponent } from './page/text-filter/text-filter.component';
import { SnapshotIndexingComponent } from './page/indexing/snapshot-indexing/snapshot-indexing.component';
import { NotFoundComponent } from './page/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { MonitoringFilterComponent } from './page/monitoring-filter/monitoring-filter.component';
import { ScreenWakeComponent } from './components/screen-wake/screen-wake.component';
import { JsonToStringComponent } from './page/json-to-string/json-to-string.component';
import { UserDataValidator } from './page/bpr/user-data-validator/user-data-validator';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'user', component: InputTimeComponent },
  { path: 'base64-encode', component: EncodeBase64Component },
  { path: 'base64-decode', component: DecodeBase64Component },
  { path: 'base64-encode-file', component: EncodeBase64FileComponent },
  { path: 'text-compare', component: TextCompareComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'monitoring-filter', component: MonitoringFilterComponent },
  { path: 'text-filter', component: TextFilterComponent },
  { path: 'indexing/snapshot-indexing', component: SnapshotIndexingComponent },
  { path: 'screen-wake', component: ScreenWakeComponent },
  { path: 'json-to-string', component: JsonToStringComponent },
  { path: 'user-data-validator', component: UserDataValidator },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }  // Pastikan rute wildcard ini ada di akhir
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }