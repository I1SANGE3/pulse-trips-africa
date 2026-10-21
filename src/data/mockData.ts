import {
  SafariPackage,
  BookingRecord,
  FleetVehicle,
  SafariGuide,
  ParkPermit,
  CustomInquiry
} from '../types/safari';

import heroSafariImg from '../assets/images/hero_african_safari_1792486521804.jpg';
import gorillaImg from '../assets/images/tour_gorilla_trek_1792486523214.jpg';
import serengetiImg from '../assets/images/tour_serengeti_safari_1792486523477.jpg';
import zanzibarImg from '../assets/images/tour_zanzibar_beach_1792486523734.jpg';
import lodgeImg from '../assets/images/safari_luxury_lodge_1792486523765.jpg';

export const HERO_IMAGE = heroSafariImg;

export const INITIAL_SAFARI_PACKAGES: SafariPackage[] = [
  {
    id: 'pkg-gorilla-rwanda',
    title: '4-Day Ultimate Mountain Gorilla & Golden Monkey Trek',
    tagline: 'Life-changing primate encounters in the misty bamboo slopes of Volcanoes National Park.',
    country: 'Rwanda',
    primaryDestination: 'Volcanoes National Park & Lake Kivu',
    durationDays: 4,
    durationNights: 3,
    priceUsd: 3850,
    originalPriceUsd: 4200,
    rating: 4.98,
    reviewCount: 42,
    category: 'Gorilla Trek',
    imageUrl: gorillaImg,
    imageAlt: 'Silverback mountain gorilla in lush misty bamboo rainforest of Rwanda',
    featured: true,
    highlights: [
      'Official RDB Mountain Gorilla trekking permit included ($1,500 value)',
      'Rare Golden Monkey habituation excursion in Volcanoes NP',
      'Scenic helicopter or luxury 4x4 transfer via Musanze scenic volcanic ridge',
      'Stay at premier eco-luxury wilderness lodge with volcanic views',
      'Private safari guide and porter support during all treks'
    ],
    inclusions: [
      '1x Official Rwanda Gorilla Trekking Permit per person',
      '1x Golden Monkey Tracking Permit per person',
      '3 Nights luxury lodge full board (Singita Kwitonda / Bisate Lodge partner)',
      'Custom 4x4 safari vehicle with English-speaking expert naturalist guide',
      'All airport transfers to/from Kigali International Airport (KGL)',
      'AMREF Flying Doctors Emergency Evacuation coverage'
    ],
    exclusions: [
      'International flights to Kigali',
      'Rwanda tourist entry visa',
      'Discretionary tips for ranger guides, trackers and lodge staff'
    ],
    physicalDifficulty: 'Challenging',
    bestSeason: 'Year-round (Best: Jun-Sep & Dec-Feb)',
    groupType: 'Bespoke Private',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Kigali & Scenic Transfer to Volcanoes National Park',
        description: 'VIP meet-and-greet at Kigali International Airport (KGL). Visit the Kigali Genocide Memorial for poignant cultural context, followed by a scenic drive northwest through the rolling thousand hills of Rwanda to Musanze.',
        accommodation: 'Sabyinyo Silverback Lodge / Five Volcanoes Boutique Hotel',
        meals: 'Lunch, Dinner'
      },
      {
        day: 2,
        title: 'The Sacred Mountain Gorilla Trekking Expedition',
        description: 'Early morning briefing at Kinigi Park Headquarters. Trek with armed rangers and master trackers through bamboo thickets to spend an unforgettable hour observing a wild mountain gorilla family just meters away.',
        accommodation: 'Sabyinyo Silverback Lodge',
        meals: 'Breakfast, Packed Bush Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Endangered Golden Monkey Habituation & Cultural Village',
        description: 'Trek into the lush lower slopes to observe active, playful golden monkeys leaping through the high canopy. Afternoon visit to the Gorilla Guardians cultural village for traditional Intore dance and local history.',
        accommodation: 'Sabyinyo Silverback Lodge',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Return to Kigali, Artisan Market & Airport Departure',
        description: 'Morning breakfast overlooking the Virunga peaks. Enjoy a leisurely drive back to Kigali, artisan craft shopping at Kimironko market, and evening transfer to Kigali Airport for international flight departure.',
        accommodation: 'Day-use suite available',
        meals: 'Breakfast, Lunch'
      }
    ]
  },
  {
    id: 'pkg-serengeti-migration',
    title: '7-Day Great Serengeti Migration & Ngorongoro Caldera',
    tagline: 'Witness millions of wildebeest, apex predators, and the Eden of Africa in private luxury.',
    country: 'Tanzania',
    primaryDestination: 'Serengeti National Park & Ngorongoro Crater',
    durationDays: 7,
    durationNights: 6,
    priceUsd: 5490,
    rating: 4.96,
    reviewCount: 68,
    category: 'Big Five Safari',
    imageUrl: serengetiImg,
    imageAlt: 'Custom 4x4 safari cruiser watching a male lion on a kopje in the golden Serengeti',
    featured: true,
    highlights: [
      'Witness the world-famous Great Wildebeest & Zebra Migration in central/northern Serengeti',
      'Full-day private game drive descending into the UNESCO Ngorongoro Crater floor',
      'High probability of Big Five sightings (Lion, Leopard, Elephant, Rhino, Buffalo)',
      'Exclusive canvas mobile tented camps that follow wildlife movement',
      'Complimentary bush sunrise breakfast with champagne overlooking the savannah'
    ],
    inclusions: [
      '6 Nights in luxury tented camps and safari lodges with all meals and drinks',
      'Private 4x4 Land Cruiser with pop-up photography roof and unlimited game mileage',
      'All TANAPA park entrance fees, crater conservation fees, and transit permits',
      'Professional silver-certified wildlife guide with over 10 years experience',
      'Bush sundowners and picnic lunches amidst the wild landscape'
    ],
    exclusions: [
      'Hot air balloon safari over Serengeti ($590 add-on)',
      'Tanzania tourist visa',
      'Gratuities and personal souvenir purchases'
    ],
    physicalDifficulty: 'Easy',
    bestSeason: 'Jul-Oct (Mara river crossings) & Jan-Mar (Calving season)',
    groupType: 'Private 4x4',
    itinerary: [
      {
        day: 1,
        title: 'Arusha to Tarangire National Park - Kingdom of Elephants',
        description: 'Morning pickup in Arusha. Journey into Tarangire, famous for colossal baobab trees and enormous elephant herds numbering in the hundreds along the Tarangire River.',
        accommodation: 'Tarangire Treetops / Sanctuary Swala Camp',
        meals: 'Lunch, Dinner'
      },
      {
        day: 2,
        title: 'Lake Manyara to the Ngorongoro Highlands',
        description: 'Explore Lake Manyara renowned for flamingos and tree-climbing lions, ascending in the afternoon to the misty rim of the Ngorongoro Caldera.',
        accommodation: 'Ngorongoro Serena Safari Lodge / Crater Lodge',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Descent into Ngorongoro Crater Floor',
        description: 'Descend 600 meters into the crater floor for an exhilarating full-day game drive searching for black rhinos, lion prides, and hippos in Lake Magadi.',
        accommodation: 'Ngorongoro Serena Safari Lodge',
        meals: 'Breakfast, Picnic Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Journey to the Endless Plains of Central Serengeti',
        description: 'Scenic drive across Olduvai Gorge into Serengeti National Park. Afternoon game drive across Seronera Valley tracking big cats hunting in the golden grass.',
        accommodation: 'Serengeti Pioneer Camp / Dunia Luxury Camp',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 5,
        title: 'Full Day Great Migration Safari in Northern / Central Plains',
        description: 'Follow the mega-herds of wildebeest and zebras. Watch cheetahs on termite mounds and search for leopards perched in fever trees.',
        accommodation: 'Serengeti Pioneer Camp',
        meals: 'Breakfast, Bush Picnic, Dinner'
      },
      {
        day: 6,
        title: 'Optional Sunrise Balloon Safari & River Kopjes Exploration',
        description: 'Optional dawn hot-air balloon flight above the plains, followed by game tracking around the granite Moru Kopjes where ancient Maasai rock art remains.',
        accommodation: 'Serengeti Pioneer Camp',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 7,
        title: 'Morning Bush Safari & Fly-back to Arusha / Kilimanjaro',
        description: 'Final sunrise game drive. Bush airstrip flight back to Arusha (ARK) or Kilimanjaro Airport (JRO) for homeward or Zanzibar connection.',
        accommodation: 'Departure day',
        meals: 'Breakfast, Lunch'
      }
    ]
  },
  {
    id: 'pkg-zanzibar-bush-beach',
    title: '10-Day Bush & Beach: Serengeti Safari to Zanzibar Sands',
    tagline: 'The ultimate safari-to-ocean escape: vast wild savannah followed by turquoise spice waters.',
    country: 'Multi-Country',
    primaryDestination: 'Serengeti, Ngorongoro & Zanzibar Archipelago',
    durationDays: 10,
    durationNights: 9,
    priceUsd: 6200,
    originalPriceUsd: 6750,
    rating: 4.99,
    reviewCount: 34,
    category: 'Bush & Beach',
    imageUrl: zanzibarImg,
    imageAlt: 'Wooden dhow sailing on crystal turquoise Indian ocean beach in Zanzibar',
    featured: true,
    highlights: [
      '5 Days of private big five game drives across Serengeti & Ngorongoro',
      'Scenic bush flight from Serengeti savannah direct to Zanzibar Island',
      '4 Nights in oceanfront villa overlooking white sand beaches of Nungwi/Paje',
      'Private sunset cruise aboard a traditional handcrafted Swahili wooden dhow',
      'Guided Stone Town UNESCO heritage walk and fragrant organic spice tour'
    ],
    inclusions: [
      'All internal bush flights (Arusha - Serengeti - Zanzibar)',
      '5 Nights luxury safari camp (Full board) + 4 Nights oceanfront beach resort (Half board)',
      'Private 4x4 Land Cruiser with guide on safari portion',
      'Zanzibar private transfers and ocean excursions',
      'All national park and marine reserve fees'
    ],
    exclusions: [
      'International airfares',
      'Tanzania and Zanzibar infrastructure tourist tax',
      'Scuba diving certifications and premium spirits'
    ],
    physicalDifficulty: 'Easy',
    bestSeason: 'Jun-Oct & Dec-Mar',
    groupType: 'Small Group (Max 6)',
    itinerary: [
      {
        day: 1,
        title: 'Arrival in Arusha, Tanzania',
        description: 'Transfer from Kilimanjaro Airport to coffee lodge estate in Arusha for safari orientation.',
        accommodation: 'Arusha Coffee Lodge',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Tarangire National Park Game Drives',
        description: 'Full day exploring Tarangire river basin and giant baobabs.',
        accommodation: 'Maramboi Tented Lodge',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Ngorongoro Crater Safari',
        description: 'Crater floor safari tracking black rhino and lion prides.',
        accommodation: 'Ngorongoro Serena Lodge',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Fly into the Serengeti Endless Plains',
        description: 'Bush flight landing in Serengeti for afternoon big cat tracking.',
        accommodation: 'Kubu Kubu Tented Lodge',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 5,
        title: 'Serengeti Migration Game Drive',
        description: 'Full day immersed in wildebeest migration and cheetah habitats.',
        accommodation: 'Kubu Kubu Tented Lodge',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 6,
        title: 'Fly to Tropical Zanzibar Island',
        description: 'Morning flight from Seronera airstrip to Zanzibar. Private transfer to beachfront luxury villa.',
        accommodation: 'The Residence Zanzibar / Baraza Resort & Spa',
        meals: 'Breakfast, Dinner'
      },
      {
        day: 7,
        title: 'Relaxation & Traditional Dhow Sunset Sail',
        description: 'Leisure on powdery white sands, followed by romantic dhow sunset sail.',
        accommodation: 'The Residence Zanzibar',
        meals: 'Breakfast, Dinner'
      },
      {
        day: 8,
        title: 'Stone Town Heritage & Organic Spice Farm Tour',
        description: 'Discover winding alleys of Stone Town, House of Wonders, and aromatic spice plantations.',
        accommodation: 'The Residence Zanzibar',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 9,
        title: 'Ocean Safari & Mnemba Atoll Snorkeling',
        description: 'Boat excursion to Mnemba marine sanctuary to snorkel with wild dolphins and sea turtles.',
        accommodation: 'The Residence Zanzibar',
        meals: 'Breakfast, Dinner'
      },
      {
        day: 10,
        title: 'Zanzibar Departure',
        description: 'Transfer to Abeid Amani Karume International Airport (ZNZ) for international flights.',
        accommodation: 'Departure day',
        meals: 'Breakfast'
      }
    ]
  },
  {
    id: 'pkg-mara-kenya-luxury',
    title: '5-Day Luxury Wilderness Camp & Mara River Crossing',
    tagline: 'Quintessential private Maasai Mara safari in an exclusive wildlife conservancy.',
    country: 'Kenya',
    primaryDestination: 'Maasai Mara National Reserve & Mara North Conservancy',
    durationDays: 5,
    durationNights: 4,
    priceUsd: 4150,
    rating: 4.95,
    reviewCount: 29,
    category: 'Big Five Safari',
    imageUrl: lodgeImg,
    imageAlt: 'Luxury safari tented deck with lantern light overlooking a watering hole under starry skies',
    featured: false,
    highlights: [
      'Access to private conservancies allowing off-road tracking and night game drives',
      'Panoramic vantage points of famous Mara River crossing points',
      'Authentic cultural encounter with Maasai elder naturalists and warrior trackers',
      'Gourmet farm-to-table cuisine and lantern-lit boma dinners under the stars',
      'Flight from Nairobi Wilson Airport (WIL) direct into the Mara'
    ],
    inclusions: [
      '4 Nights at luxury eco-lodge in private Mara conservancy',
      'Return scheduled flights from Nairobi Wilson to Mara airstrip',
      'Open-sided customized 4x4 safari vehicles with certified KPSGA gold guides',
      'Night game drives, guided bush walks, and sundowners in the wild',
      'All conservancy fees and local conservation levies'
    ],
    exclusions: [
      'International flights to Nairobi',
      'Kenya eVisa processing fees',
      'Discretionary tips'
    ],
    physicalDifficulty: 'Easy',
    bestSeason: 'Jul-Oct & Dec-Feb',
    groupType: 'Small Group (Max 6)',
    itinerary: [
      {
        day: 1,
        title: 'Nairobi to Maasai Mara by Scenic Bush Plane',
        description: 'Fly over the Great Rift Valley into the heart of the Mara. Afternoon game drive spotting elephants and giraffes.',
        accommodation: 'Governors Camp / Mara Plains Camp',
        meals: 'Lunch, Dinner'
      },
      {
        day: 2,
        title: 'Big Cat Tracking & Mara River Exploration',
        description: 'Full day game tracking lions, leopards, and cheetahs around the Mara riverbank.',
        accommodation: 'Governors Camp',
        meals: 'Breakfast, Bush Lunch, Dinner'
      },
      {
        day: 3,
        title: 'Exclusive Conservancy Walk & Night Drive',
        description: 'Morning guided walking safari with Maasai naturalists, resting in afternoon, and thrilling night drive seeking nocturnal wildlife.',
        accommodation: 'Governors Camp',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 4,
        title: 'Dawn Hot Air Ballooning & Bush Breakfast',
        description: 'Glide silently over herds at dawn, landing for a champagne breakfast, followed by afternoon photography safari.',
        accommodation: 'Governors Camp',
        meals: 'Breakfast, Lunch, Dinner'
      },
      {
        day: 5,
        title: 'Farewell Mara & Return Flight to Nairobi',
        description: 'Morning game drive, flight to Nairobi Wilson, and chauffeur transfer to JKIA international airport.',
        accommodation: 'Departure day',
        meals: 'Breakfast'
      }
    ]
  }
];

export const INITIAL_BOOKINGS: BookingRecord[] = [
  {
    id: 'bkg-101',
    bookingReference: 'PTA-2026-9104',
    clientName: 'Dr. Marcus Vance & Family',
    clientEmail: 'm.vance@vancemed.org',
    clientPhone: '+1 (415) 890-3412',
    safariPackageId: 'pkg-gorilla-rwanda',
    packageName: '4-Day Ultimate Mountain Gorilla Trek',
    country: 'Rwanda',
    travelers: 2,
    travelDate: '2026-10-24',
    returnDate: '2026-10-28',
    totalAmount: 7700,
    depositPaid: 7700,
    balanceDue: 0,
    status: 'Active On Safari',
    assignedGuide: 'Jean-Paul Habimana',
    vehicleAssigned: 'Toyota Land Cruiser (RAD 482B)',
    permitStatus: 'Secured',
    permitDetails: 'RDB Gorilla Permits #RDB-GOR-9912 & #RDB-GOR-9913 verified',
    specialRequests: 'Vegetarian meals, photography equipment assistance, early morning departures.',
    createdAt: '2026-09-12'
  },
  {
    id: 'bkg-102',
    bookingReference: 'PTA-2026-9142',
    clientName: 'Eleanor Sterling & Group',
    clientEmail: 'eleanor.sterling@londonventures.co.uk',
    clientPhone: '+44 20 7946 0918',
    safariPackageId: 'pkg-serengeti-migration',
    packageName: '7-Day Great Serengeti Migration & Ngorongoro',
    country: 'Tanzania',
    travelers: 4,
    travelDate: '2026-10-28',
    returnDate: '2026-11-04',
    totalAmount: 21960,
    depositPaid: 11000,
    balanceDue: 10960,
    status: 'Confirmed',
    assignedGuide: 'David Sarakikya',
    vehicleAssigned: 'Extended 4x4 Cruiser (T 345 BFS)',
    permitStatus: 'Secured',
    permitDetails: 'TANAPA Serengeti entry passes & Ngorongoro Caldera voucher #TNP-84102',
    specialRequests: 'Two pair of high-magnification Swarovski binoculars requested for group.',
    createdAt: '2026-09-28'
  },
  {
    id: 'bkg-103',
    bookingReference: 'PTA-2026-9188',
    clientName: 'Siddharth Patel & Ananya Rao',
    clientEmail: 'siddharth@patelholdings.sg',
    clientPhone: '+65 9123 4567',
    safariPackageId: 'pkg-zanzibar-bush-beach',
    packageName: '10-Day Bush & Beach: Serengeti to Zanzibar',
    country: 'Multi-Country',
    travelers: 2,
    travelDate: '2026-11-03',
    returnDate: '2026-11-13',
    totalAmount: 12400,
    depositPaid: 6200,
    balanceDue: 6200,
    status: 'Confirmed',
    assignedGuide: 'Amara Ndung\'u',
    vehicleAssigned: 'Custom Safari Cruiser (KDG 812A)',
    permitStatus: 'Secured',
    permitDetails: 'Coastal Aviation flight tickets issued, marine reserve passes pre-cleared.',
    specialRequests: 'Honeymoon arrangement with private beach dinner on arrival in Zanzibar.',
    createdAt: '2026-10-04'
  },
  {
    id: 'bkg-104',
    bookingReference: 'PTA-2026-9210',
    clientName: 'Prof. Henrik Lindqvist',
    clientEmail: 'h.lindqvist@karolinska.se',
    clientPhone: '+46 8 123 456',
    safariPackageId: 'pkg-gorilla-rwanda',
    packageName: '4-Day Ultimate Mountain Gorilla Trek',
    country: 'Rwanda',
    travelers: 1,
    travelDate: '2026-11-10',
    returnDate: '2026-11-14',
    totalAmount: 4350,
    depositPaid: 2175,
    balanceDue: 2175,
    status: 'Permits Pending',
    assignedGuide: 'Grace Mukamana',
    vehicleAssigned: 'Toyota Land Cruiser (RAD 319A)',
    permitStatus: 'Processing',
    permitDetails: 'Passport copy submitted to RDB portal for Susa group allocation.',
    specialRequests: 'Ornithology focus, bird checklist requested.',
    createdAt: '2026-10-14'
  },
  {
    id: 'bkg-105',
    bookingReference: 'PTA-2026-9080',
    clientName: 'Catherine Dubois',
    clientEmail: 'catherine.dubois@artemislux.fr',
    clientPhone: '+33 1 42 68 55 00',
    safariPackageId: 'pkg-mara-kenya-luxury',
    packageName: '5-Day Luxury Wilderness Camp Maasai Mara',
    country: 'Kenya',
    travelers: 2,
    travelDate: '2026-10-14',
    returnDate: '2026-10-19',
    totalAmount: 8300,
    depositPaid: 8300,
    balanceDue: 0,
    status: 'Completed',
    assignedGuide: 'Amara Ndung\'u',
    vehicleAssigned: 'Custom Safari Cruiser (KDG 812A)',
    permitStatus: 'Secured',
    permitDetails: 'Mara North Conservancy entry completed.',
    specialRequests: 'Celebrated 15th wedding anniversary with hot air balloon flight.',
    createdAt: '2026-08-30'
  }
];

export const INITIAL_FLEET_VEHICLES: FleetVehicle[] = [
  {
    id: 'veh-01',
    plateNumber: 'RAD 482B',
    model: 'Toyota Land Cruiser 70-Series Extended',
    type: 'Luxury 4x4 Safari Cruiser',
    seats: 7,
    status: 'On Safari',
    assignedGuide: 'Jean-Paul Habimana',
    currentLocation: 'Volcanoes National Park (Musanze)',
    fuelLevelPercent: 88,
    lastServiceDate: '2026-10-18',
    equipmentStatus: {
      popUpRoof: true,
      vhfRadio: true,
      inverterChargers: true,
      medicalKit: true,
      fridgeCooler: true
    }
  },
  {
    id: 'veh-02',
    plateNumber: 'T 345 BFS',
    model: 'Toyota Land Cruiser V8 Custom Expedition',
    type: 'Bush & Wildlife Photography Cruiser',
    seats: 6,
    status: 'Ready for Dispatch',
    assignedGuide: 'David Sarakikya',
    currentLocation: 'Arusha Operations Base',
    fuelLevelPercent: 100,
    lastServiceDate: '2026-10-19',
    equipmentStatus: {
      popUpRoof: true,
      vhfRadio: true,
      inverterChargers: true,
      medicalKit: true,
      fridgeCooler: true
    }
  },
  {
    id: 'veh-03',
    plateNumber: 'KDG 812A',
    model: 'Toyota Land Cruiser Pop-Up Panoramic',
    type: 'Savannah 4x4 High-Clearance',
    seats: 7,
    status: 'Ready for Dispatch',
    assignedGuide: 'Amara Ndung\'u',
    currentLocation: 'Nairobi Wilson Depot',
    fuelLevelPercent: 95,
    lastServiceDate: '2026-10-15',
    equipmentStatus: {
      popUpRoof: true,
      vhfRadio: true,
      inverterChargers: true,
      medicalKit: true,
      fridgeCooler: true
    }
  },
  {
    id: 'veh-04',
    plateNumber: 'RAD 319A',
    model: 'Toyota Land Cruiser 76 Hardtop',
    type: 'Primate Expedition 4x4',
    seats: 5,
    status: 'Ready for Dispatch',
    assignedGuide: 'Grace Mukamana',
    currentLocation: 'Kigali HQ Fleet Yard',
    fuelLevelPercent: 92,
    lastServiceDate: '2026-10-17',
    equipmentStatus: {
      popUpRoof: true,
      vhfRadio: true,
      inverterChargers: true,
      medicalKit: true,
      fridgeCooler: true
    }
  },
  {
    id: 'veh-05',
    plateNumber: 'T 782 CCK',
    model: 'Toyota Land Cruiser Extended',
    type: 'Serengeti Safari Cruiser',
    seats: 7,
    status: 'Scheduled Service',
    assignedGuide: 'Unassigned',
    currentLocation: 'Arusha Technical Workshop',
    fuelLevelPercent: 45,
    lastServiceDate: '2026-09-20',
    equipmentStatus: {
      popUpRoof: true,
      vhfRadio: true,
      inverterChargers: false,
      medicalKit: true,
      fridgeCooler: true
    }
  }
];

export const INITIAL_GUIDES: SafariGuide[] = [
  {
    id: 'gde-01',
    name: 'Jean-Paul Habimana',
    role: 'Lead Primate Specialist & Rwanda Ranger',
    experienceYears: 14,
    languages: ['English', 'French', 'Kinyarwanda', 'Swahili'],
    certifications: ['RDB Licensed Primate Specialist', 'Advanced Wilderness First Responder', 'BirdLife Rwanda Lead Guide'],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    rating: 4.99,
    completedSafaris: 310,
    specialty: 'Mountain Gorilla habituation & Virunga volcanic geology',
    status: 'In Field',
    currentTrip: 'PTA-2026-9104 (Dr. Vance Family)'
  },
  {
    id: 'gde-02',
    name: 'David Sarakikya',
    role: 'Senior Naturalist & Big Five Master',
    experienceYears: 18,
    languages: ['English', 'Swahili', 'Maa', 'German'],
    certifications: ['Tanzania FGASA Level 3', 'Gold-Badged TANAPA Guide', 'Photographic Safari Master'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    rating: 4.98,
    completedSafaris: 420,
    specialty: 'Serengeti predator behavior & Great Migration river crossings',
    status: 'Available',
    currentTrip: 'Preparing for PTA-2026-9142 (Oct 28)'
  },
  {
    id: 'gde-03',
    name: 'Amara Ndung\'u',
    role: 'Maasai Mara Conservancies Specialist',
    experienceYears: 12,
    languages: ['English', 'Swahili', 'Maa'],
    certifications: ['Kenya KPSGA Gold Award', 'Wilderness Tracking Instructor'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    rating: 4.97,
    completedSafaris: 280,
    specialty: 'Big cats of the Mara & indigenous medicinal botany',
    status: 'Available',
    currentTrip: 'Standby for Singapore VIPs'
  },
  {
    id: 'gde-04',
    name: 'Grace Mukamana',
    role: 'Expedition Naturalist & Cultural Liaison',
    experienceYears: 9,
    languages: ['English', 'French', 'Kinyarwanda'],
    certifications: ['Rwanda Tour Guide Association Silver', 'Leave No Trace Master Educator'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    rating: 4.96,
    completedSafaris: 195,
    specialty: 'Birding expeditions, Nyungwe canopy flora, community conservancies',
    status: 'Available',
    currentTrip: 'Assigned PTA-2026-9210'
  }
];

export const INITIAL_PERMITS: ParkPermit[] = [
  {
    id: 'pmt-001',
    permitNumber: 'RDB-GOR-9912',
    parkName: 'Volcanoes National Park',
    country: 'Rwanda',
    activity: 'Mountain Gorilla Trekking',
    date: '2026-10-25',
    guestName: 'Marcus Vance',
    passportNumber: 'US-928401824',
    issuingAuthority: 'Rwanda Development Board (RDB)',
    status: 'Cleared at Gate',
    guideAssigned: 'Jean-Paul Habimana'
  },
  {
    id: 'pmt-002',
    permitNumber: 'RDB-GOR-9913',
    parkName: 'Volcanoes National Park',
    country: 'Rwanda',
    activity: 'Mountain Gorilla Trekking',
    date: '2026-10-25',
    guestName: 'Sarah Vance',
    passportNumber: 'US-719304192',
    issuingAuthority: 'Rwanda Development Board (RDB)',
    status: 'Cleared at Gate',
    guideAssigned: 'Jean-Paul Habimana'
  },
  {
    id: 'pmt-003',
    permitNumber: 'TNP-SER-8841',
    parkName: 'Serengeti National Park',
    country: 'Tanzania',
    activity: 'Serengeti Park Pass',
    date: '2026-10-29',
    guestName: 'Eleanor Sterling',
    passportNumber: 'GB-610294118',
    issuingAuthority: 'TANAPA',
    status: 'Secured',
    guideAssigned: 'David Sarakikya'
  },
  {
    id: 'pmt-004',
    permitNumber: 'RDB-GM-4421',
    parkName: 'Volcanoes National Park',
    country: 'Rwanda',
    activity: 'Golden Monkey Trekking',
    date: '2026-10-26',
    guestName: 'Marcus Vance',
    passportNumber: 'US-928401824',
    issuingAuthority: 'Rwanda Development Board (RDB)',
    status: 'Secured',
    guideAssigned: 'Jean-Paul Habimana'
  },
  {
    id: 'pmt-005',
    permitNumber: 'RDB-GOR-9988',
    parkName: 'Volcanoes National Park',
    country: 'Rwanda',
    activity: 'Mountain Gorilla Trekking',
    date: '2026-11-11',
    guestName: 'Henrik Lindqvist',
    passportNumber: 'SE-89102488',
    issuingAuthority: 'Rwanda Development Board (RDB)',
    status: 'In Processing',
    guideAssigned: 'Grace Mukamana'
  }
];

export const INITIAL_CUSTOM_INQUIRIES: CustomInquiry[] = [
  {
    id: 'inq-801',
    clientName: 'Julian & Claire Montgomery',
    email: 'j.montgomery@zurichholdings.ch',
    phone: '+41 44 211 4400',
    destinations: ['Rwanda', 'Tanzania'],
    travelStyle: 'Ultra Luxury',
    travelersCount: 2,
    preferredMonth: 'December 2026 (Holiday season)',
    interests: ['Gorilla Trekking Permits', 'Private Mobile Fly-in Safari', 'Bush Heli Tours'],
    budgetTier: '$25,000 - $35,000 Total',
    notes: 'Celebrating 25th wedding anniversary. Requires private chartered flights between Kigali and Serengeti.',
    status: 'Approved by Owner',
    estimatedBudget: 28400,
    submittedAt: '2026-10-18'
  },
  {
    id: 'inq-802',
    clientName: 'Harrison Taylor Family',
    email: 'harrison.taylor@techcorp.com.au',
    phone: '+61 2 9234 5678',
    destinations: ['Kenya', 'Uganda'],
    travelStyle: 'Classic Tented Camps',
    travelersCount: 4,
    preferredMonth: 'January 2027',
    interests: ['Big Five Safari', 'Chimpanzee Habituation', 'Cultural Maasai visit'],
    budgetTier: '$18,000 - $24,000 Total',
    notes: 'Traveling with two teenagers (16 & 18). Interested in active safari with guided bush walks.',
    status: 'Pending Quote',
    estimatedBudget: 21600,
    submittedAt: '2026-10-19'
  }
];

export const TESTIMONIALS = [
  {
    quote: "PulseTrips arranged our gorilla permit and safari with flawless precision. Standing three paces from a silverback in the Volcanoes National Park mist was humbling. Our guide Jean-Paul treated us like family throughout Rwanda.",
    author: "Sir Jonathan & Lady Clarke",
    location: "Edinburgh, United Kingdom",
    trip: "4-Day Ultimate Gorilla Trekking",
    rating: 5
  },
  {
    quote: "The Serengeti migration experience exceeded every dream. From bush breakfasts watching pride lions to the breathtaking Ngorongoro crater floor, everything handled by PulseTrips Africa was five-star operational mastery.",
    author: "Dr. Evelyn & Michael Zhao",
    location: "San Francisco, USA",
    trip: "7-Day Great Serengeti Migration",
    rating: 5
  },
  {
    quote: "Bush and beach was seamless! After 5 dust-filled incredible days tracking leopards in Tanzania, arriving via bush flight to our oceanfront villa in Zanzibar was magic. The 4x4 cruiser was pristine.",
    author: "Camille Laurent & Antoine Roux",
    location: "Geneva, Switzerland",
    trip: "10-Day Bush & Beach Expedition",
    rating: 5
  }
];
