// Mock data for bookings
export const bookingsData = [
  {
    id: "1",
    suiteName: "The Royal Penthouse",
    guest: {
      name: "Eleanor Vance",
      email: "eleanor@example.com",
    },
    startDate: "2024-08-12",
    endDate: "2024-08-19",
    nights: 7,
    status: "unconfirmed" as const,
    totalAmount: 2450.0,
  },
  {
    id: "2",
    suiteName: "Forest View King",
    guest: {
      name: "Marcus Thompson",
      email: "marcus.thompson@email.com",
    },
    startDate: "2024-07-28",
    endDate: "2024-08-02",
    nights: 5,
    status: "checked-in" as const,
    totalAmount: 1875.0,
  },
  {
    id: "3",
    suiteName: "Lakeside Queen",
    guest: {
      name: "Sarah Chen",
      email: "sarah.chen@gmail.com",
    },
    startDate: "2024-07-15",
    endDate: "2024-07-20",
    nights: 5,
    status: "checked-out" as const,
    totalAmount: 1600.0,
  },
  {
    id: "4",
    suiteName: "Mountain Vista Suite",
    guest: {
      name: "David Rodriguez",
      email: "d.rodriguez@company.com",
    },
    startDate: "2024-08-25",
    endDate: "2024-08-30",
    nights: 5,
    status: "unconfirmed" as const,
    totalAmount: 3200.0,
  },
  {
    id: "5",
    suiteName: "Garden Terrace Double",
    guest: {
      name: "Lisa Park",
      email: "lisa.park@outlook.com",
    },
    startDate: "2024-08-05",
    endDate: "2024-08-08",
    nights: 3,
    status: "checked-in" as const,
    totalAmount: 840.0,
  },
];
