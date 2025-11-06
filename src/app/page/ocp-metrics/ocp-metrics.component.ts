import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-ocp-metrics',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ocp-metrics.component.html',
  styleUrl: './ocp-metrics.component.css'
})
export class OcpMetricsComponent {
  inputText: string = '';
  outputText: string = '';
  isChecked: boolean = false;
  showAlert: boolean = false;

  constructor(private clipboard: Clipboard) { }

  copyOutputTextToClipboard() {
    if (this.outputText) {
      this.clipboard.copy(this.outputText);
      this.showAlert = true; // Show alert when copied
      setTimeout(() => {
        this.showAlert = false; // Hide alert after 3 seconds
      }, 3000);
    }
  }

  processMetrics() {

    let result = '';
    this.isChecked ? result = 'instance\tpod\tmin\tavg\tmax\n' : result = 'instance\tmin\tavg\tmax\n';

    const rawData = JSON.parse(this.inputText);
    const data = rawData.data.result;

    data.forEach((item: any) => {
      const instanceName = item.metric.instance;
      const podName = item.metric.pod;

      let valuesData: any[] = [];

      item.values.forEach((element: any) => {
        valuesData.push(element[1]);
      });

      const NumberValuesData = valuesData.map((str) =>
        Number(str.replace(',', '.'))
      );

      const min = Math.min(...NumberValuesData);
      const avg = NumberValuesData.reduce((sum, val) => sum + val, 0) / NumberValuesData.length;
      const max = Math.max(...NumberValuesData);

      if (this.isChecked) {
        result += `${instanceName}\t${podName}\t${min.toFixed(2)}\t${avg.toFixed(2)}\t${max.toFixed(2)}\n`;
      } else {
        result += `${instanceName}\t${min.toFixed(2)}\t${avg.toFixed(2)}\t${max.toFixed(2)}\n`;
      }

    });

    this.outputText = result;
  }
}
