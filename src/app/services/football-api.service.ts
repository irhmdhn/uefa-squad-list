import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FootballApiService {
    private apiUrl = 'https://www.thesportsdb.com/api/v1/json/3/';

  constructor(private http: HttpClient) {}
  
  getAllLeagues() {
    const url = `${this.apiUrl}all_leagues.php`; // ENDPOINT 1
    return this.http.get(url).toPromise();
  }
  getEuropeLeague() {
    const url = `${this.apiUrl}search_all_leagues.php?c=europe`; // ENDPOINT 2
    return this.http.get(url).toPromise();
  }
  getTeamsByLeague(leagueName: string | null) {
    const url = `${this.apiUrl}search_all_teams.php?l=${leagueName}`; // ENDPOINT 3
    return this.http.get(url);
  }
  getSchedules(leagueName: string | null) {
    const url = `${this.apiUrl}searchfilename.php?e=${leagueName}`; // ENDPOINT 4
    return this.http.get(url);
  }
}
