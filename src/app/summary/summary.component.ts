import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Summary {
  bpName: string;
  averageResponseTime: string;
  errorRate: string;
}

interface SummaryUtilization {
  serverName: string;
  cpuUtilization: string;
  memoryUtilization: string;
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})

export class SummaryComponent {
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
    const lines = this.inputResponseTime.split('\n');
    const results: Summary[] = [];

    for (let line of lines) {
      const columns = line.split('\t');

      const summary: Summary = {
        bpName: columns[0],
        averageResponseTime: columns[2],
        errorRate: columns[9]
      };

      results.push(summary);
    }

    this.sortingResponsetimeDescending(results);

    this.sortingErrorrateDescending(results);

  }

  proccessUtilization() {
    const lines = this.inputUtilization.split('\n');
    const results: SummaryUtilization[] = [];

    lines.forEach((item, index, arr) => {
      const columns = item.split('\t');

      const summary: SummaryUtilization = {
        serverName: columns[0],
        cpuUtilization: columns[columns.length - 5],
        memoryUtilization: columns[columns.length - 2]
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

    data.map(x => {
      this.outputResponseTime += `${x.bpName}: ${x.averageResponseTime}s \n`
    });
  }

  sortingErrorrateDescending(data: Summary[]) {
    data.sort((a, b) => this.convertPercentageToNumber(b.errorRate) - this.convertPercentageToNumber(a.errorRate))

    data.map(x => {
      this.outputErrorRate += `${x.bpName}: ${x.errorRate} \n`
    });
  }

  sortingCpuDescending(data: SummaryUtilization[]) {
    data.sort((a, b) => Number(b.cpuUtilization) - Number(a.cpuUtilization));

    data.map(x => {
      this.outputCpu += `${x.serverName}: ${x.cpuUtilization}% \n`
    })
  }

  sortingMemoryDescending(data: SummaryUtilization[]) {
    data.sort((a, b) => Number(b.memoryUtilization) - Number(a.memoryUtilization));

    data.map(x => {
      this.outputMemory += `${x.serverName}: ${x.memoryUtilization}% \n`
    })
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



