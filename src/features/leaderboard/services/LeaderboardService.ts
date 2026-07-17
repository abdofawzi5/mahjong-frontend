import type { IApiClient } from '../../../api/IApiClient';

export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  createdAt: string;
}

export class LeaderboardService {
  private apiClient: IApiClient;

  constructor(apiClient: IApiClient) {
    this.apiClient = apiClient;
  }

  /**
   * Fetches the top scores from the backend API.
   */
  public async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const response = await this.apiClient.get<LeaderboardEntry[]>('/leaderboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching leaderboard', error);
      throw error;
    }
  }

  /**
   * Submits a new score to the backend API.
   */
  public async submitScore(name: string, score: number): Promise<LeaderboardEntry[]> {
    try {
      const response = await this.apiClient.post<LeaderboardEntry[]>('/leaderboard', {
        name,
        score,
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting score', error);
      throw error;
    }
  }
}
