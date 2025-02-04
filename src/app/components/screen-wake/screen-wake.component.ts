import { Component, OnDestroy, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-screen-wake',
  standalone: true,
  imports: [],
  templateUrl: './screen-wake.component.html',
  styleUrls: ['./screen-wake.component.css']
})
export class ScreenWakeComponent implements OnInit, OnDestroy {

  private wakeLock: WakeLockSentinel | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    // Pastikan hanya di browser yang memanggil requestWakeLock
    if (isPlatformBrowser(this.platformId)) {
      // Menunggu Angular memastikan semuanya siap di browser
      setTimeout(async () => {
        await this.requestWakeLock();
      });
    }
  }

  ngOnDestroy(): void {
    if (this.wakeLock) {
      this.releaseWakeLock();
    }
  }

  private async requestWakeLock(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      if ('wakeLock' in navigator) {
        try {
          this.wakeLock = await navigator.wakeLock.request('screen');
          console.log('Wake lock aktif');
        } catch (err) {
          console.log('Gagal mendapatkan wake lock:', err);
        }
      } else {
        console.warn('Browser tidak mendukung wake lock API');
      }
    }
  }

  private releaseWakeLock(): void {
    if (this.wakeLock) {
      this.wakeLock.release().then(() => {
        console.log('Wake lock dilepaskan');
      }).catch((err) => {
        console.error('Gagal melepaskan wake lock:', err);
      });
    }
  }
}
