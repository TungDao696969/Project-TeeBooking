export interface DashboardStats {
  totalRevenue: number;
  todayRevenue: number;
  monthlyRevenue: number;

  totalBookings: number;
  todayBookings: number;
  cancelledBookings: number;

  totalUsers: number;

  totalMovies: number;
  totalCinemas: number;
  totalRooms: number;
  totalShowtimes: number;
  totalSeats: number;
}

export interface DashboardResponse {
  success: boolean;
  message: string;

  data: {
    stats: DashboardStats;
  };
}
