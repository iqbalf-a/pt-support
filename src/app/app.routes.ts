import { Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { EncodeBase64Component } from './page/encode-base64/encode-base64.component';
import { DecodeBase64Component } from './page/decode-base64/decode-base64.component';
import { EncodeBase64FileComponent } from './page/encode-base64-file/encode-base64-file.component';
import { SummaryComponent } from './page/summary/summary.component';
import { TextCompareComponent } from './page/text-compare/text-compare.component';
import { LineFilterComponent } from './page/line-filter/line-filter.component';
import { SnapshotIndexingComponent } from './page/indexing/snapshot-indexing/snapshot-indexing.component';
import { NotFoundComponent } from './page/not-found/not-found.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'user',
        component: InputTimeComponent
    },
    {
        path: 'encode-base64',
        component: EncodeBase64Component
    },
    {
        path: 'decode-base64',
        component: DecodeBase64Component
    },
    {
        path: 'encode-base64-file',
        component: EncodeBase64FileComponent
    },
    {
        path: 'text-compare',
        component: TextCompareComponent
    },
    {
        path: 'summary',
        component: SummaryComponent
    },
    {
        path: 'line-filter',
        component: LineFilterComponent
    },
    {
        path: 'indexing/snapshot-indexing',
        component: SnapshotIndexingComponent
    },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '404', component: NotFoundComponent },
    { path: '**', redirectTo: '/404' }
];
