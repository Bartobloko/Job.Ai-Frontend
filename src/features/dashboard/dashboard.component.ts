import {Component, OnInit} from '@angular/core';
import {BotService} from '../../utils/data-acces/bot/bot.service';
import {FormsModule} from '@angular/forms';
import {JobsService} from '../../utils/data-acces/jobs-service/jobs.service';
import {StatsService} from './utils/stats-service/stats.service';
import {Log} from './utils/interfaces/log';
import {DatePipe} from '@angular/common';

@Component({
    selector: 'app-dashboard',
  imports: [
    FormsModule,
    DatePipe
  ],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})



export class DashboardComponent implements OnInit {

  constructor(
    private botService: BotService,
    private statsService: StatsService
  ) {
  }

  ngOnInit() {
    this.statsService.getJobSummary().subscribe({
      next: (summary) => {
        this.stats.appliedJobs = summary.appliedJobs;
        this.stats.scrappedTotal = summary.totalJobs;
        this.stats.scrapedToday = summary.todayJobs;
        this.stats.applicableJobs = summary.applicableJobs;
      },
      error: () => {
        console.error('Error fetching job summary');
      }
    });

    this.statsService.getLogs().subscribe({
      next: (logs) => {
        this.activityLog = logs;
      },
      error: () => {
        console.error('Error fetching logs');
      }
    });

    this.statsService.getBotStats().subscribe({
      next: (botStats) => {
        this.stats.botRuns = botStats.bot_activation_count;
        this.stats.lastRun = botStats.last_bot_use;
      },
      error: () => {
        console.error('Error fetching bot stats');
      }
    });

  }

  stats = {
    scrappedTotal: 0,
    appliedJobs: 0,
    scrapedToday: 0,
    applicableJobs: 0,
    botRuns: 0,
    lastRun: '2024-02-13 14:30'
  };

  botConfig = {
    prompt: '',
    experience: '',
    blockedKeywords: ''
  };

  activityLog: Log[] = [
  ];

  onBotStart() {
    this.botService.startBot().subscribe(
      response => {
        console.log('bot started successfully:', response);
        alert('bot started successfully');
      },
      error => {
        console.error('Error starting bot:', error);
        alert('Error starting bot');
      }
    );
  }
}
