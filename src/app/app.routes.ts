import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InputTimeComponent } from './components/input-time/input-time.component';
import { EncodeBase64Component } from './encode-base64/encode-base64.component';
import { DecodeBase64Component } from './decode-base64/decode-base64.component';
import { EncodeBase64FileComponent } from './encode-base64-file/encode-base64-file.component';
import { SummaryComponent } from './summary/summary.component';
import { TextCompareComponent } from './text-compare/text-compare.component';
import { LineFilterComponent } from './line-filter/line-filter.component';

export const routes: Routes = [
    {
        path: '',
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
    }
];
