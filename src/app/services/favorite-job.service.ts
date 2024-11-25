import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class FavoriteJobService {
  private readonly FAVORITE_JOBS_KEY = 'favoriteJobs';

  /**
   * gets the favorite jobs ids from the local storage.
   * @returns the ids of the favorite jobs.
   */
  public getFavoriteJobsId(): Set<string> {
    const storedFavoriteIds = localStorage.getItem(this.FAVORITE_JOBS_KEY);
    const favoriteIds = storedFavoriteIds ? new Set<string>(JSON.parse(storedFavoriteIds)) : new Set<string>();
    return favoriteIds;
  }

  /** Adds the job to the list of favorites */
  public addFavorite(jobId: string): void {
    const favorites = this.getFavoriteJobsId()
    favorites.add(jobId);
    this.saveFavoritesInLocalStorage(favorites);
  }

  /** Deletes the job from the list of favorites */
  public removeFavorite(jobId: string): void {
    const favorites = this.getFavoriteJobsId();
    favorites.delete(jobId);
    this.saveFavoritesInLocalStorage(favorites);
  }

  public isJobFavorite(id: string): boolean {
    return this.getFavoriteJobsId().has(id);
  }

  private saveFavoritesInLocalStorage(favorites: Set<string>): void {
    localStorage.setItem(this.FAVORITE_JOBS_KEY, JSON.stringify([...favorites]));
  }
}
