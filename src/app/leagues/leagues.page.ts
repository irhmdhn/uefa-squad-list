import { Component } from '@angular/core';
import { FootballApiService } from '../services/football-api.service';
import { NavController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-leagues',
  templateUrl: 'leagues.page.html',
  styleUrls: ['leagues.page.scss']
})
export class LeaguesPage {
  isLoading = false
  selectedLeague: string = ''
  leagues: any = []
  defaultLeague: string = ''
  teams: any = []
  teamsLength: string= ''
  detailTeam: any = []
  isModalOpen = false
  favoriteKey='favoriteTeams'

  constructor(
    private footballApi: FootballApiService, 
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController) {}

  ionViewDidEnter() {
    this.loadLeagues()
  }
  async loadLeagues() {
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
      this.footballApi.getTeamsByLeague(this.defaultLeague).subscribe((data: any) => {
        this.teams = data?.teams || []
        this.teamsLength = this.teams.length
        loading.dismiss()
      })
    }).catch(error => {
      console.error('Error fetching all leagues', error)
    })
    this.isLoading = false
  }
  async onLeagueChange() {
    this.isLoading = true
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
    })
    if (this.selectedLeague) {
      await loading.present()
      this.footballApi.getTeamsByLeague(this.selectedLeague).subscribe((data: any) => {
        this.teams = data?.teams || []
        this.teamsLength = this.teams.length
        loading.dismiss()
      })
    }
  }
  async alert(alertMessage:string){
    const alertMess = await this.alertCtrl.create({
      subHeader: alertMessage,
      buttons: ['OK'],
    });
    return alertMess.present()
  }
  async favorite(team : any){
    const favorites = this.getFavorites();
    const isFav =  favorites.filter((item: any) => item.idTeam === team.idTeam)
    if (isFav.length==0){
      favorites.push(team);
      localStorage.setItem(this.favoriteKey, JSON.stringify(favorites));
      this.alert('Berhasil menambah ke favorite')
    }else{
      this.alert('Team ini sudah ada di list favorite');
    }
  }
  getFavorites() {
    const favoritesData = localStorage.getItem(this.favoriteKey)
    return favoritesData ? JSON.parse(favoritesData) : [];
  }
  detailTeamNav(leagueName:string, teamId : string){
    this.navCtrl.navigateForward(['uefa/t',leagueName, teamId]);
  }
}
