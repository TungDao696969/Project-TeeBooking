export type BookingStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed"
  | "refunded";

export interface AdminBooking {
  id: string;
  bookingCode: string;
  totalTicketPrice: number;
  totalComboPrice: number;
  discountAmount: number;
  finalAmount: number;
  status: BookingStatus;
  paymentStatus: string;
  bookedAt: string;
  expiresAt: string | null;
  user: {
    id: string;
    fullName: string;
    email: string;
    phone: string;
    avatarUrl: string | null;
  };
  showtime: {
    id: string;
    startTime: string;
    movie: {
      id: string;
      title: string;
      posterUrl?: string | null;
    };
    room: {
      id: string;
      roomName: string;
      cinema: {
        id: string;
        name: string;
      };
    };
  };
}

export interface AdminBookingDetail extends AdminBooking {
  tickets: {
    id: string;
    ticketPrice: number;
    showtimeSeat: {
      id: string;
      seat: {
        id: string;
        seatRow: string;
        seatNumber: number;
        seatType: string;
      };
    };
  }[];
  combos: {
    id: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    combo: {
      name: string;
      imageUrl: string | null;
    };
  }[];
  payments: {
    id: string;
    amount: number;
    paymentMethod: string;
    status: string;
    createdAt: string;
  }[];
}

export interface AdminBookingResponse {
  success: boolean;
  bookings: AdminBooking[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminBookingDetailResponse {
  success: boolean;
  data: AdminBookingDetail;
}
