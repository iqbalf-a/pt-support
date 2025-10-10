import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface UserData {
  original: string;
  data: string[];
}

interface DuplikatItem {
  data: string;
  user1: string;
  user2: string;
}

@Component({
  selector: 'app-user-data-allocation',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-data-allocation.component.html',
  styleUrl: './user-data-allocation.component.css'
})
export class UserDataAllocationComponent {

  inputUser = '';
  inputData = '';
  dataPerUser = 1;
  outputText = '';
  menuOutputText: string = '';

  userData: { [key: string]: UserData } = {};
  dataToUser: { [key: string]: string } = {};
  duplikatDetail: DuplikatItem[] = [];
  pilihanDuplikat: { [key: string]: string } = {};

  showDuplikatForm = false;
  showMenu = false;

  printOutput(text: string) {
    this.outputText += text + '\n';
  }

  clearOutput() {
    this.outputText = '';
  }

  process() {
    this.clearOutput();
    this.showDuplikatForm = false;
    this.showMenu = false;

    const usernames = this.inputUser.trim().split('\n').map(s => s.trim()).filter(s => s);
    const data = this.inputData.trim().split('\n').map(s => s.trim()).filter(s => s);
    const alokasi = this.dataPerUser;

    if (usernames.length === 0) {
      alert("User tidak boleh kosong."); return;
    }
    if (data.length === 0) {
      alert("Data tidak boleh kosong."); return;
    }
    if (isNaN(alokasi) || alokasi < 1) {
      alert("Data/user harus angka >= 1."); return;
    }

    const totalUserDiperlukan = Math.ceil(data.length / alokasi);
    if (usernames.length < totalUserDiperlukan) {
      alert(`Jumlah user (${usernames.length}) tidak cukup. Diperlukan: ${totalUserDiperlukan}`); return;
    }

    this.userData = {};
    for (let i = 0; i < totalUserDiperlukan; i++) {
      const user = usernames[i];
      const key = user.toLowerCase();
      const start = i * alokasi;
      const end = start + alokasi;
      this.userData[key] = {
        original: user,
        data: data.slice(start, end)
      };
    }

    this.dataToUser = {};
    this.duplikatDetail = [];
    for (const [key, info] of Object.entries(this.userData)) {
      for (const d of info.data) {
        if (this.dataToUser[d]) {
          this.duplikatDetail.push({ data: d, user1: this.dataToUser[d], user2: info.original });
        } else {
          this.dataToUser[d] = info.original;
        }
      }
    }

    this.printOutput("\n=== Alokasi Data Awal ===");
    for (const info of Object.values(this.userData)) {
      this.printOutput(`User ${info.original}: [${info.data.join(', ')}]`);
    }

    if (this.duplikatDetail.length > 0) {
      this.showDuplikatForm = true;
    } else {
      this.showMenu = true;
      this.printOutput("\nData tidak mengandung duplikat.");
      this.printOutput("\n=== Alokasi Data Akhir ===");
      for (const info of Object.values(this.userData)) {
        this.printOutput(`User ${info.original}: [${info.data.join(', ')}]`);
      }
    }
  }

  simpanPilihanDuplikat() {
    for (const { data, user1, user2 } of this.duplikatDetail) {
      const keepUser = this.pilihanDuplikat[data];
      const dropUser = keepUser === user1 ? user2 : user1;
      const keyRemove = dropUser.toLowerCase();

      this.userData[keyRemove].data = this.userData[keyRemove].data.filter(d => d !== data);
    }

    this.dataToUser = {};
    for (const info of Object.values(this.userData)) {
      for (const d of info.data) {
        this.dataToUser[d] = info.original;
      }
    }

    this.printOutput("\n=== Duplikat Diselesaikan ===");
    for (const info of Object.values(this.userData)) {
      this.printOutput(`User ${info.original}: [${info.data.join(', ')}]`);
    }

    this.showDuplikatForm = false;
    this.showMenu = true;
  }

  cariPemilik(data: string): string {
    return this.dataToUser[data] || "Tidak ditemukan";
  }

  tampilkanDataUser(user: string): string {
    const info = this.userData[user.toLowerCase()];
    return info ? `User ${info.original}: [${info.data.join(', ')}]` : "User tidak ditemukan";
  }

  reset() {
    this.inputUser = '';
    this.inputData = '';
    this.dataPerUser = 1;
    this.outputText = '';
    this.menuOutputText = '';
    this.userData = {};
    this.dataToUser = {};
    this.duplikatDetail = [];
    this.pilihanDuplikat = {};
    this.showDuplikatForm = false;
    this.showMenu = false;
  }

}
