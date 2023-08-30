import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { FootballApiService } from '../services/football-api.service';
import { Router  } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail-team',
  standalone:true,
  imports: [IonicModule],
  templateUrl: './detail-team.component.html',
  styleUrls: ['./detail-team.component.scss'],
})
export class DetailTeamComponent implements OnInit{
  isModalOpen = false
  isLoading = false
  detailTeam: any = []
  favoriteKey='favoriteTeams'
  currentRoute= ''
  constructor(
    private router: Router,
    private footballApi: FootballApiService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,

    private http: HttpClient,) {}

    async ngOnInit(){
      const id = this.router.url.split('/').pop()
      const league = this.router.url.split('/')[3]
      const data:any = localStorage.getItem('favoriteTeams');
      const teams:any[] = JSON.parse(data) 
      const dataTeam = teams.find(team => team.idTeam === id)      
      if(dataTeam){
        this.detailTeam = dataTeam
      }
      else
      {
        this.isLoading = true
        const loading = await this.loadingCtrl.create({
          message: 'Loading...',
        })
          await loading.present()
          this.footballApi.getTeamsByLeague(league).subscribe((response: any) => {
            const teams:any[] = response.teams
            let foundTeam = teams.find(team => team.idTeam === id)
            if (foundTeam) {
              this.detailTeam = foundTeam
            } else {
              console.log('Team not found')
            }
            this.isLoading = false
            loading.dismiss()
          });
        this.detailTeam = []
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
    

}
