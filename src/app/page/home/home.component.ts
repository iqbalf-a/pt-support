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

  private wakeLock: WakeLockSentinel | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  async ngOnInit(): Promise<void> {
    // Pastikan hanya di browser yang memanggil requestWakeLock
    if (isPlatformBrowser(this.platformId)) {
      this.requestWakeLock();
      // Menunggu sampai halaman terlihat
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          this.requestWakeLock();
        }
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

  moveButton() {
    const button = document.querySelector('button') as HTMLElement;
    const parent = button.parentElement as HTMLElement;

    const parentHeight = parent.clientHeight;
    const parentWidth = parent.clientWidth;
    const buttonHeight = button.clientHeight;
    const buttonWidth = button.clientWidth;

    const verticalRange = parentHeight - buttonHeight;
    const horizontalRange = parentWidth - buttonWidth;

    const maxVerticalMovement = verticalRange * 0.8 + 400;
    const maxHorizontalMovement = horizontalRange * 0.8;

    this.buttonTop = Math.random() * maxVerticalMovement;
    this.buttonLeft = Math.random() * maxHorizontalMovement;
  }
  clicked() {
    return alert("yey!!");
  }
}
