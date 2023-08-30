import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-favorites',
  templateUrl: 'favorites.page.html',
  styleUrls: ['favorites.page.scss']
})
export class FavoritesPage {
  favoriteList:any=[]
  constructor(private navCtrl: NavController) {}

  ngOnInit():any {
    const data:any = localStorage.getItem('favoriteTeams');
    this.favoriteList = JSON.parse(data)
    if(this.favoriteList.length==0){
      return this.favoriteList = null
    }
  }
  detailTeam(teamId : string){
    this.navCtrl.navigateForward(['uefa/t', teamId]);
  }
  reload(){
    location.reload()
  }
  removeFav(id:string){    
    const data = localStorage.getItem('favoriteTeams');

    if (data) {
      const items = JSON.parse(data);
      const updatedItems = items.filter((item: any) => item.idTeam !== id);
      localStorage.setItem('favoriteTeams', JSON.stringify(updatedItems));
      location.reload()
    }
  }
}
