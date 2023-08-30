import { Component } from '@angular/core';
import { FootballApiService } from '../services/football-api.service';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.page.html',
  styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage {
  isLoading = false
  selectedLeague: string = ''
  leagues: any = []
  defaultLeague: string = ''
  schedules: any = []
  teams:any = []
  constructor(
    private footballApi: FootballApiService, private loadingCtrl: LoadingController,) { }

  ionViewDidEnter() {
    this.loadSchedules()
  }
  async loadSchedules() {
    this.isLoading = true
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    }) 
    await loading.present()
    this.footballApi.getEuropeLeague().then((data: any) => {
      const uefa = data?.countries.filter((league:any) => {
        return league.strLeague.includes('UEFA')
      })
      this.leagues = uefa
      this.defaultLeague = this.leagues[1].strLeague
      this.footballApi.getSchedules(this.defaultLeague).subscribe((data: any) => {
        this.schedules = data?.event || []
      })
      loading.dismiss()
    }).catch(error => {
      console.error('Error fetching all leagues', error)
    })
    this.isLoading = false
  }
  async onScheduleChange() {
    this.isLoading = true
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    })
    if (this.selectedLeague) {
      console.log(this.selectedLeague);
      
      await loading.present()
      this.footballApi.getSchedules(this.selectedLeague).subscribe((data: any) => {
        this.schedules = data?.event || []
        loading.dismiss()
      })
    }
  }
  formatDate(dateEvent: string){
    let de = new Date(dateEvent)
    return de.toDateString()    
  }
}
