export type UserRole = 'admin' | 'operation_manager' | null;

export interface AuthenticatedUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operation_manager';
  roleDisplayName: 'Owner' | 'Operation Manager'; // As explicitly instructed: "admin as the owner", "operation manager as the person who signed in"
  title: string;
  avatarInitials: string;
}

export interface SafariPackage {
  id: string;
  title: string;
  tagline: string;
  country: 'Rwanda' | 'Tanzania' | 'Kenya' | 'Uganda' | 'Botswana' | 'Multi-Country';
  primaryDestination: string;
  durationDays: number;
  durationNights: number;
  priceUsd: number;
  originalPriceUsd?: number;
  rating: number;
  reviewCount: number;
  category: 'Gorilla Trek' | 'Big Five Safari' | 'Bush & Beach' | 'Luxury Fly-in' | 'Primate Expedition';
  imageUrl: string;
  imageAlt: string;
  featured?: boolean;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  physicalDifficulty: 'Easy' | 'Moderate' | 'Challenging';
  bestSeason: string;
  groupType: 'Private 4x4' | 'Small Group (Max 6)' | 'Bespoke Private';
  itinerary: {
    day: number;
    title: string;
    description: string;
    accommodation: string;
    meals: string;
  }[];
}

export interface BookingRecord {
  id: string;
  bookingReference: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  safariPackageId: string;
  packageName: string;
  country: string;
  travelers: number;
  travelDate: string;
  returnDate: string;
  totalAmount: number;
  depositPaid: number;
  balanceDue: number;
  status: 'Confirmed' | 'Permits Pending' | 'Active On Safari' | 'Completed' | 'Under Review';
  assignedGuide: string;
  vehicleAssigned: string;
  permitStatus: 'Secured' | 'Processing' | 'Not Required';
  permitDetails?: string;
  specialRequests?: string;
  createdAt: string;
}

export interface FleetVehicle {
  id: string;
  plateNumber: string;
  model: string;
  type: string;
  seats: number;
  status: 'On Safari' | 'Ready for Dispatch' | 'Scheduled Service' | 'In Inspection';
  assignedGuide: string;
  currentLocation: string;
  fuelLevelPercent: number;
  lastServiceDate: string;
  equipmentStatus: {
    popUpRoof: boolean;
    vhfRadio: boolean;
    inverterChargers: boolean;
    medicalKit: boolean;
    fridgeCooler: boolean;
  };
}

export interface SafariGuide {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  languages: string[];
  certifications: string[];
  avatarUrl: string;
  rating: number;
  completedSafaris: number;
  specialty: string;
  status: 'In Field' | 'Available' | 'On Rest';
  currentTrip?: string;
}

export interface ParkPermit {
  id: string;
  permitNumber: string;
  parkName: string;
  country: 'Rwanda' | 'Uganda' | 'Tanzania' | 'Kenya';
  activity: 'Mountain Gorilla Trekking' | 'Golden Monkey Trekking' | 'Chimpanzee Habituation' | 'Serengeti Park Pass';
  date: string;
  guestName: string;
  passportNumber: string;
  issuingAuthority: 'Rwanda Development Board (RDB)' | 'Uganda Wildlife Authority (UWA)' | 'TANAPA' | 'Kenya Wildlife Service (KWS)';
  status: 'Cleared at Gate' | 'Secured' | 'In Processing';
  guideAssigned: string;
}

export interface CustomInquiry {
  id: string;
  clientName: string;
  email: string;
  phone: string;
  destinations: string[];
  travelStyle: 'Ultra Luxury' | 'Classic Tented Camps' | 'Active Expedition';
  travelersCount: number;
  preferredMonth: string;
  interests: string[];
  budgetTier: string;
  notes: string;
  status: 'Pending Quote' | 'Quote Sent' | 'Approved by Owner';
  estimatedBudget: number;
  submittedAt: string;
}
