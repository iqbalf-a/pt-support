import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Summary {
  bpName: string;
  averageResponseTime: string;
  maxResponseTime: string;
  errorRate: string;
}

interface SummaryUtilization {
  serverName: string;
  avgCpuUtilization: string;
  avgMemoryUtilization: string;
  maxCpuUtilization: string;
  maxMemoryUtilization: string;
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})

export class SummaryComponent {
  isMaxRespChecked: boolean;
  isMaxUtilChecked: boolean;
  isResponseTime: boolean;
  isUtilization: boolean;
  inputResponseTime: string;
  outputText: string;
  outputResponseTime: string;
  outputErrorRate: string;
  inputUtilization: string;
  outputCpu: string;
  outputMemory: string;

  constructor() {
    this.isMaxRespChecked = false;
    this.isMaxUtilChecked = false;
    this.isResponseTime = true;
    this.isUtilization = false;
    this.inputResponseTime = '';
    this.outputText = '';
    this.outputResponseTime = 'Highest Avg. Response Time: \n'
    this.outputErrorRate = 'Highest Error Rate: \n'
    this.outputCpu = 'Highest Avg. CPU Utilization: \n'
    this.outputMemory = 'Highest Avg. Memory Utilization: \n'
    this.inputUtilization = '';
  }

  proccessResponseTime() {

    this.outputResponseTime = 'Highest Avg. Response Time: \n';
    this.outputErrorRate = 'Highest Avg. Error Rate: \n';

    const lines = this.inputResponseTime.split('\n');

    if (lines[0].split('\t').length !== lines[1].split('\t').length) {
      return alert("Perhatikan format");
    }
    if (lines[lines.length - 1] === "") {
      lines.pop();
    }

    const results: Summary[] = [];

    for (let line of lines) {
      const columns = line.split('\t');

      const summary: Summary = {
        bpName: columns[0],
        averageResponseTime: columns[2],
        maxResponseTime: columns[3],
        errorRate: columns[9]
      };

      results.push(summary);
    }

    this.sortingResponsetimeDescending(results);

    this.sortingErrorrateDescending(results);

  }

  proccessUtilization() {

    this.outputCpu = 'Highest Avg. CPU Utilization: \n';
    this.outputMemory = 'Highest Avg. Memory Utilization: \n';

    const lines = this.inputUtilization.split('\n');

    if (lines[0].split('\t').length !== lines[1].split('\t').length) {
      return alert("Perhatikan format");
    }
    if (lines[lines.length - 1] === "") {
      lines.pop();
    }

    const results: SummaryUtilization[] = [];

    lines.forEach((item, index, arr) => {
      const columns = item.split('\t');

      const summary: SummaryUtilization = {
        serverName: columns[0],
        avgCpuUtilization: columns[columns.length - 5],
        avgMemoryUtilization: columns[columns.length - 2],
        maxCpuUtilization: columns[columns.length - 4],
        maxMemoryUtilization: columns[columns.length - 1]
      }
      results.push(summary);
    })

    this.sortingCpuDescending(results);
    this.sortingMemoryDescending(results);


  }

  convertPercentageToNumber(percentage: string) {
    return parseFloat(percentage.replace('%', ''));
  }

  sortingResponsetimeDescending(data: Summary[]) {
    data.sort((a, b) => Number(b.averageResponseTime) - Number(a.averageResponseTime));

    if (this.isMaxRespChecked) {
      data.map(x => {
        this.outputResponseTime += `${x.bpName}: ${x.averageResponseTime}s (Max: ${x.maxResponseTime}s) \n`
      });
    } else {
      data.map(x => {
        this.outputResponseTime += `${x.bpName}: ${x.averageResponseTime}s \n`
      });
    }


  }

  sortingErrorrateDescending(data: Summary[]) {
    data.sort((a, b) => this.convertPercentageToNumber(b.errorRate) - this.convertPercentageToNumber(a.errorRate))

    data.map(x => {
      this.outputErrorRate += `${x.bpName}: ${x.errorRate} \n`
    });
  }

  sortingCpuDescending(data: SummaryUtilization[]) {
    data.sort((a, b) => Number(b.avgCpuUtilization) - Number(a.avgCpuUtilization));

    if (this.isMaxUtilChecked) {
      data.map(x => {
        this.outputCpu += `${x.serverName}: ${x.avgCpuUtilization}% (Max: ${x.maxCpuUtilization}%) \n`
      })
    } else {
      data.map(x => {
        this.outputCpu += `${x.serverName}: ${x.avgCpuUtilization}% \n`
      })
    }


  }

  sortingMemoryDescending(data: SummaryUtilization[]) {
    data.sort((a, b) => Number(b.avgMemoryUtilization) - Number(a.avgMemoryUtilization));

    if (this.isMaxUtilChecked) {
      data.map(x => {
        this.outputMemory += `${x.serverName}: ${x.avgMemoryUtilization}% (Max: ${x.maxMemoryUtilization}%) \n`
      })
    } else {
      data.map(x => {
        this.outputMemory += `${x.serverName}: ${x.avgMemoryUtilization}% \n`
      })
    }


  }

  getResponseTimeButtonClass() {
    return this.isResponseTime
      ? 'text-blue-500 border-blue-500 border-2 font-semibold py-3 rounded-lg focus:outline-none focus:shadow-outline px-4'
      : 'hover:bg-blue-500 hover:text-white hover:border-0 px-4 py-3 border-2 text-gray-500 rounded-lg hover:font-semibold';
  }

  getUtilizationButtonClass() {
    return this.isUtilization
      ? 'text-blue-500 border-blue-500 border-2 font-semibold py-3 rounded-lg focus:outline-none focus:shadow-outline px-4'
      : 'hover:bg-blue-500 hover:text-white hover:border-0 px-4 py-3 border-2 text-gray-500 rounded-lg hover:font-semibold';
  }

  resetResponseTime() {
    this.outputResponseTime = 'Highest Avg. Response Time: \n';
    this.outputErrorRate = 'Highest Avg. Error Rate: \n';
    this.inputResponseTime = '';
  }

  resetUtilization() {
    this.outputCpu = 'Highest Avg. CPU Utilization: \n';
    this.outputMemory = 'Highest Avg. Memory Utilization: \n';
    this.inputUtilization = '';
  }

  toggleResponseTime() {
    this.isResponseTime = true;
    this.isUtilization = false;
  }

  toggleUtilization() {
    this.isResponseTime = false;
    this.isUtilization = true;
  }

}



