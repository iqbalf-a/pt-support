import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Clipboard } from '@angular/cdk/clipboard';

interface MetricItem {
  metric: { instance: string; pod: string };
  values: [number, string][];
}

interface PrometheusData {
  data: { result: MetricItem[] };
}

@Component({
  selector: 'app-ocp-metrics',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ocp-metrics.component.html',
  styleUrl: './ocp-metrics.component.css'
})
export class OcpMetricsComponent implements OnDestroy {
  inputText: string = '';
  outputText: string = '';
  isChecked: boolean = false;
  showAlert: boolean = false;
  private alertTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor(private clipboard: Clipboard) { }

  copyOutputTextToClipboard() {
    if (this.outputText) {
      this.clipboard.copy(this.outputText);
      this.showAlert = true;
      if (this.alertTimeout) clearTimeout(this.alertTimeout);
      this.alertTimeout = setTimeout(() => {
        this.showAlert = false;
      }, 3000);
    }
  }

  processMetrics() {
    let result = '';
    this.isChecked ? result = 'instance\tpod\tmin\tavg\tmax\n' : result = 'instance\tmin\tavg\tmax\n';

    let rawData: PrometheusData;
    try {
      rawData = JSON.parse(this.inputText);
    } catch {
      this.outputText = 'Error: input bukan JSON yang valid.';
      return;
    }

    const data = rawData.data.result;

    data.forEach((item: MetricItem) => {
      const instanceName = item.metric.instance;
      const podName = item.metric.pod;

      const valuesData: string[] = item.values.map((element) => element[1]);

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

  ngOnDestroy() {
    if (this.alertTimeout) clearTimeout(this.alertTimeout);
  }
}
