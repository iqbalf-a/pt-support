import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  buttonTop: number = 0;
  buttonLeft: number = 0;

  // sticker
   stickers: string[] = [
    'assets/pentol-stiker1.gif',
    'assets/pentol-stiker2.gif',
    'assets/pentol-stiker3.gif',
    'assets/pentol-stiker4.gif',
    'assets/pentol-stiker5.gif',
  ];
  randomSticker: string = '';


  private wakeLock: WakeLockSentinel | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      // Menunggu sampai halaman terlihat
      document.addEventListener('visibilitychange', this.handleVisibilityChange);
      this.requestWakeLock();
    }

    this.randomSticker =
      this.stickers[Math.floor(Math.random() * this.stickers.length)];

    if (isPlatformBrowser(this.platformId)) {
      this.moveButton();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      document.removeEventListener('visibilitychange', this.handleVisibilityChange);
      this.releaseWakeLock();
    }
  }

  private handleVisibilityChange = () => {
    if (document.visibilityState === 'visible') {
      this.requestWakeLock();
    } else {
      this.releaseWakeLock();
    }
  }

  private async requestWakeLock(): Promise<void> {
    if ('wakeLock' in navigator) {
      try {
        this.wakeLock = await navigator.wakeLock.request('screen');
        console.log('Wake lock aktif');
      } catch (err) {
        console.error('Gagal mendapatkan wake lock:', err);
      }
    } else {
      console.warn('Browser tidak mendukung wake lock API');
    }
  }

  private releaseWakeLock(): void {
    if (this.wakeLock) {
      this.wakeLock.release().then(() => {
        console.log('Wake lock dilepaskan');
        this.wakeLock = null;
      }).catch((err) => {
        console.error('Gagal melepaskan wake lock:', err);
      });
    }
  }

  moveButton() {
    if (!isPlatformBrowser(this.platformId)) return;
    const button = document.getElementById('btn-click-me') as HTMLElement;
    const buttonHeight = button?.clientHeight || 36;
    const buttonWidth = button?.clientWidth || 80;

    this.buttonTop = Math.random() * (window.innerHeight - buttonHeight);
    this.buttonLeft = Math.random() * (window.innerWidth - buttonWidth);
  }

  clicked() {
    // alert("yey!!");
    this.moveButton();
  }
}