export const DEPARTMENTS = [
  { id: 'ALL', name: 'All Departments', icon: 'Layers', count: 0 },
  { id: 'REVENUE', name: 'REVENUE', icon: 'Receipt', count: 0 },
  { id: 'VILLAGE', name: 'VILLAGE', icon: 'Home', count: 0 },
  { id: 'SCHOOLS', name: 'SCHOOLS', icon: 'GraduationCap', count: 0 },
  { id: 'HOUSING', name: 'HOUSING', icon: 'Building2', count: 0 },
  { id: 'LAND', name: 'LAND', icon: 'MapPin', count: 0 },
  { id: 'OTHERS', name: 'OTHERS', icon: 'HelpCircle', count: 0 },
];

export const STATES = [
  { id: 'ALL', name: 'All States' },
  { id: 'AP', name: 'Andhra Pradesh' },
  { id: 'ARUNACHAL', name: 'Arunachal Pradesh' },
  { id: 'ASSAM', name: 'Assam' },
  { id: 'BIHAR', name: 'Bihar' },
  { id: 'CHHATTISGARH', name: 'Chhattisgarh' },
  { id: 'GOA', name: 'Goa' },
  { id: 'GUJARAT', name: 'Gujarat' },
  { id: 'HARYANA', name: 'Haryana' },
  { id: 'HIMACHAL', name: 'Himachal Pradesh' },
  { id: 'JHARKHAND', name: 'Jharkhand' },
  { id: 'KARNATAKA', name: 'Karnataka' },
  { id: 'KERALA', name: 'Kerala' },
  { id: 'MADHYA_PRADESH', name: 'Madhya Pradesh' },
  { id: 'MAHARASHTRA', name: 'Maharashtra' },
  { id: 'MANIPUR', name: 'Manipur' },
  { id: 'MEGHALAYA', name: 'Meghalaya' },
  { id: 'MIZORAM', name: 'Mizoram' },
  { id: 'NAGALAND', name: 'Nagaland' },
  { id: 'ODISHA', name: 'Odisha' },
  { id: 'PUNJAB', name: 'Punjab' },
  { id: 'RAJASTHAN', name: 'Rajasthan' },
  { id: 'SIKKIM', name: 'Sikkim' },
  { id: 'TAMILNADU', name: 'Tamil Nadu' },
  { id: 'TELANGANA', name: 'Telangana' },
  { id: 'TRIPURA', name: 'Tripura' },
  { id: 'UTTAR_PRADESH', name: 'Uttar Pradesh' },
  { id: 'UTTARAKHAND', name: 'Uttarakhand' },
  { id: 'WEST_BENGAL', name: 'West Bengal' },
  { id: 'ANDAMAN', name: 'Andaman & Nicobar Islands' },
  { id: 'CHANDIGARH', name: 'Chandigarh' },
  { id: 'DADRA_DAMAN', name: 'Dadra & Nagar Haveli and Daman & Diu' },
  { id: 'DELHI', name: 'Delhi (NCT)' },
  { id: 'J_AND_K', name: 'Jammu & Kashmir' },
  { id: 'LADAKH', name: 'Ladakh' },
  { id: 'LAKSHADWEEP', name: 'Lakshadweep' },
  { id: 'PUDUCHERRY', name: 'Puducherry' }
];

export const DISTRICTS = [
  { id: 'ALL', name: 'All Districts', stateId: 'ALL' },

  // Andhra Pradesh Districts
  { id: 'VISAKHAPATNAM', name: 'Visakhapatnam', stateId: 'AP' },
  { id: 'ANANTAPUR', name: 'Anantapur', stateId: 'AP' },
  { id: 'GUNTUR', name: 'Guntur', stateId: 'AP' },
  { id: 'CHITTOOR', name: 'Chittoor', stateId: 'AP' },
  { id: 'VIJAYAWADA', name: 'NTR Vijayawada', stateId: 'AP' },
  { id: 'KURNOOL', name: 'Kurnool', stateId: 'AP' },
  { id: 'ALLURI', name: 'Alluri Sitharama Raju', stateId: 'AP' },
  { id: 'ANAKAPALLI', name: 'Anakapalli', stateId: 'AP' },
  { id: 'ANNAMAYYA', name: 'Annamayya', stateId: 'AP' },
  { id: 'BAPATLA', name: 'Bapatla', stateId: 'AP' },
  { id: 'EAST_GODAVARI', name: 'East Godavari', stateId: 'AP' },
  { id: 'ELURU', name: 'Eluru', stateId: 'AP' },
  { id: 'KAKINADA', name: 'Kakinada', stateId: 'AP' },
  { id: 'KONASEEMA', name: 'Dr. B.R. Ambedkar Konaseema', stateId: 'AP' },
  { id: 'NANDYAL', name: 'Nandyal', stateId: 'AP' },
  { id: 'NELLORE', name: 'SPSR Nellore', stateId: 'AP' },
  { id: 'PALNADU', name: 'Palnadu', stateId: 'AP' },
  { id: 'PARVATHIPURAM', name: 'Parvathipuram Manyam', stateId: 'AP' },
  { id: 'PRAKASAM', name: 'Prakasam', stateId: 'AP' },
  { id: 'SATYA_SAI', name: 'Sri Sathya Sai', stateId: 'AP' },
  { id: 'SRIKAKULAM', name: 'Srikakulam', stateId: 'AP' },
  { id: 'TIRUPATI', name: 'Tirupati', stateId: 'AP' },
  { id: 'VIZIANAGARAM', name: 'Vizianagaram', stateId: 'AP' },
  { id: 'WEST_GODAVARI', name: 'West Godavari', stateId: 'AP' },
  { id: 'YSR_KADAPA', name: 'YSR Kadapa', stateId: 'AP' },

  // Telangana Districts
  { id: 'RANGAREDDY', name: 'Ranga Reddy', stateId: 'TELANGANA' },
  { id: 'HYDERABAD', name: 'Hyderabad', stateId: 'TELANGANA' },
  { id: 'MEDCHAL', name: 'Medchal-Malkajgiri', stateId: 'TELANGANA' },
  { id: 'WARANGAL', name: 'Warangal', stateId: 'TELANGANA' },
  { id: 'KARIMNAGAR', name: 'Karimnagar', stateId: 'TELANGANA' },
  { id: 'NIZAMABAD', name: 'Nizamabad', stateId: 'TELANGANA' },
  { id: 'NALGONDA', name: 'Nalgonda', stateId: 'TELANGANA' },
  { id: 'KHAMMAM', name: 'Khammam', stateId: 'TELANGANA' },
  { id: 'SANGAREDDY', name: 'Sangareddy', stateId: 'TELANGANA' },
  { id: 'MAHBUBNAGAR', name: 'Mahbubnagar', stateId: 'TELANGANA' },
  { id: 'ADILABAD', name: 'Adilabad', stateId: 'TELANGANA' },
  { id: 'SIDDIPET', name: 'Siddipet', stateId: 'TELANGANA' },
  { id: 'SURYAPET', name: 'Suryapet', stateId: 'TELANGANA' },

  // Karnataka Districts
  { id: 'BENGALURU', name: 'Bengaluru Urban', stateId: 'KARNATAKA' },
  { id: 'MYSURU', name: 'Mysuru', stateId: 'KARNATAKA' },
  { id: 'DAKSHINA_KANNADA', name: 'Dakshina Kannada', stateId: 'KARNATAKA' },
  { id: 'BELAGAVI', name: 'Belagavi', stateId: 'KARNATAKA' },
  { id: 'HUBBALLI_DHARWAD', name: 'Dharwad', stateId: 'KARNATAKA' },

  // Tamil Nadu Districts
  { id: 'CHENNAI', name: 'Chennai', stateId: 'TAMILNADU' },
  { id: 'COIMBATORE', name: 'Coimbatore', stateId: 'TAMILNADU' },
  { id: 'MADURAI', name: 'Madurai', stateId: 'TAMILNADU' },
  { id: 'TIRUCHIRAPPALLI', name: 'Tiruchirappalli', stateId: 'TAMILNADU' },
  { id: 'SALEM', name: 'Salem', stateId: 'TAMILNADU' },

  // Maharashtra Districts
  { id: 'MUMBAI', name: 'Mumbai City', stateId: 'MAHARASHTRA' },
  { id: 'PUNE', name: 'Pune', stateId: 'MAHARASHTRA' },
  { id: 'NAGPUR', name: 'Nagpur', stateId: 'MAHARASHTRA' },
  { id: 'THANE', name: 'Thane', stateId: 'MAHARASHTRA' },
  { id: 'NASHIK', name: 'Nashik', stateId: 'MAHARASHTRA' },

  // Delhi Districts
  { id: 'NEW_DELHI', name: 'New Delhi', stateId: 'DELHI' },
  { id: 'CENTRAL_DELHI', name: 'Central Delhi', stateId: 'DELHI' },
  { id: 'SOUTH_DELHI', name: 'South Delhi', stateId: 'DELHI' }
];

export const INITIAL_COMPLAINTS = [
  {
    id: 'GRV-2026-1001',
    ticketNo: 'GRV-2026-1001',
    department: 'SCHOOLS',
    district: 'VISAKHAPATNAM',
    mandal: 'Anakapalle',
    village: 'Kasimkota',
    title: 'Urgent Repair of Government Primary School Roof & Drinking Water Pipeline',
    description: 'The main roof slab of Government High School, Kasimkota has suffered heavy structural damage causing leakages during rainfall. Drinking water filter pipeline is broken.',
    status: 'Pending',
    priority: 'High',
    isEmergency: false,
    registeredToday: true,
    createdYear: 2026,
    registeredDate: '16 Jul 2026, 09:30 AM',
    slaHoursRemaining: 18,
    latitude: 17.6868,
    longitude: 83.0039,
    aiCategory: 'Schools & Education Infrastructure',
    aiSummary: 'Critical physical infrastructure defect detected in school roof and drinking sanitation line. High priority SLA recommendation.',
    citizen: {
      name: 'K. Rajesh Kumar',
      mobile: '+91 98480 12345',
      email: 'rajesh.kumar@gmail.com',
      address: 'Door No 4-12, Main Road, Kasimkota, Anakapalle, Visakhapatnam'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered by Citizen',
        changedBy: 'System Portal',
        timestamp: '16 Jul 2026, 09:30 AM',
        remarks: 'Submitted via Citizen Mobile Web Portal with photos and geo-location.'
      }
    ],
    resolutionProof: null
  },
  {
    id: 'GRV-2026-1002',
    ticketNo: 'GRV-2026-1002',
    department: 'VILLAGE',
    district: 'ANANTAPUR',
    mandal: 'Dharmavaram',
    village: 'Gotkur',
    title: 'Replacement of Damaged Solar Streetlight & Drain Cleaning in Ward 3',
    description: 'Solar streetlights in Ward 3 near the village community hall have not been functional for 2 weeks, leading to safety concerns at night. Open drainage needs urgent desilting.',
    status: 'Assigned',
    priority: 'Medium',
    isEmergency: false,
    registeredToday: true,
    createdYear: 2026,
    registeredDate: '16 Jul 2026, 11:15 AM',
    slaHoursRemaining: 42,
    latitude: 14.4137,
    longitude: 77.7126,
    aiCategory: 'Village Sanitation & Lighting',
    aiSummary: 'Public amenity repair and sanitation desilting request routed to Panchayat Secretary.',
    citizen: {
      name: 'M. Lakshmi Devi',
      mobile: '+91 94401 67890',
      email: 'lakshmi.m@yahoo.com',
      address: 'Ward 3, Near Old Temple, Gotkur Village, Dharmavaram, Anantapur'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '16 Jul 2026, 11:15 AM',
        remarks: 'Initial ticket created by citizen.'
      },
      {
        id: 2,
        action: 'Assigned to Panchayat Officer',
        changedBy: 'System Administrator',
        timestamp: '16 Jul 2026, 12:00 PM',
        remarks: 'Assigned to Panchayat Secretary Dharmavaram for field action.'
      }
    ],
    resolutionProof: null
  },
  {
    id: 'GRV-2026-1003',
    ticketNo: 'GRV-2026-1003',
    department: 'REVENUE',
    district: 'GUNTUR',
    mandal: 'Tenali',
    village: 'Angalakuduru',
    title: 'Discrepancy in Adangal Land Mutual Transfer Certificate',
    description: 'Application submitted for Mutation and Pattadar Passbook correction under Survey No. 245/2. Field verification was completed by VRO but final signature pending with Tahsildar.',
    status: 'In Progress',
    priority: 'High',
    isEmergency: false,
    registeredToday: false,
    createdYear: 2026,
    registeredDate: '14 Jul 2026, 02:45 PM',
    slaHoursRemaining: 12,
    latitude: 16.243,
    longitude: 80.64,
    aiCategory: 'Revenue Land Records & Mutation',
    aiSummary: 'Pending Tahsildar signature verification for revenue records mutation.',
    citizen: {
      name: 'V. Subba Rao',
      mobile: '+91 99890 54321',
      email: 'subbarao.v@gmail.com',
      address: 'Plot 88, Angalakuduru, Tenali Mandal, Guntur District'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '14 Jul 2026, 02:45 PM',
        remarks: 'Doc verification reference attached.'
      },
      {
        id: 2,
        action: 'Status updated to In Progress',
        changedBy: 'System Administrator',
        timestamp: '15 Jul 2026, 10:00 AM',
        remarks: 'File forwarded to Tahsildar desk for final digital sign.'
      }
    ],
    resolutionProof: null
  },
  {
    id: 'GRV-2026-1004',
    ticketNo: 'GRV-2026-1004',
    department: 'HOUSING',
    district: 'VIJAYAWADA',
    mandal: 'Vijayawada Urban',
    village: 'YSR Colony',
    title: 'Delay in Release of 3rd Installment Construction Subsidy',
    description: 'Pukka housing layout beneficiary ID #HSG-88741. Roof level slab inspection completed on 1st July 2026, but the third milestone payment installment has not been credited to bank account.',
    status: 'Pending',
    priority: 'Medium',
    isEmergency: false,
    registeredToday: true,
    createdYear: 2026,
    registeredDate: '16 Jul 2026, 08:20 AM',
    slaHoursRemaining: 54,
    latitude: 16.5062,
    longitude: 80.648,
    aiCategory: 'Housing Scheme Subsidy Disbursement',
    aiSummary: 'Milestone validation required for Housing Corporation bank transfer authorization.',
    citizen: {
      name: 'P. Anusha Reddi',
      mobile: '+91 91770 98765',
      email: 'anusha.reddi@outlook.com',
      address: 'House No 12-4, YSR Colony, Vijayawada Urban, NTR District'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '16 Jul 2026, 08:20 AM',
        remarks: 'Construction photo and engineer certificate submitted.'
      }
    ],
    resolutionProof: null
  },
  {
    id: 'GRV-2026-1005',
    ticketNo: 'GRV-2026-1005',
    department: 'LAND',
    district: 'CHITTOOR',
    mandal: 'Tirupati Rural',
    village: 'Peruru',
    title: 'Encroachment of Public Survey Road & Boundary Boundary Demarcation Request',
    description: 'Private construction encroaching upon public survey road boundaries in Survey No 112/4. Requesting immediate survey by Licensed Surveyor with GPS equipment.',
    status: 'In Progress',
    priority: 'High',
    isEmergency: false,
    registeredToday: false,
    createdYear: 2026,
    registeredDate: '15 Jul 2026, 04:10 PM',
    slaHoursRemaining: 6,
    latitude: 13.6288,
    longitude: 79.4192,
    aiCategory: 'Land Boundary Survey & Encroachment',
    aiSummary: 'Critical boundary dispute & road blockage requiring physical survey inspection team deployment.',
    citizen: {
      name: 'G. Srinivasulu',
      mobile: '+91 93930 45678',
      email: 'srinivas.peruru@gmail.com',
      address: 'Survey No 112, Near Bus Stop, Peruru Village, Tirupati Rural, Chittoor'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '15 Jul 2026, 04:10 PM',
        remarks: 'Pre-existing land title copy uploaded.'
      },
      {
        id: 2,
        action: 'Survey Team Dispatched',
        changedBy: 'System Administrator',
        timestamp: '16 Jul 2026, 09:00 AM',
        remarks: 'Surveyor assigned for site visit at 02:00 PM.'
      }
    ],
    resolutionProof: null
  },
  {
    id: 'GRV-2026-1006',
    ticketNo: 'GRV-2026-1006',
    department: 'OTHERS',
    district: 'KURNOOL',
    mandal: 'Nandyal',
    village: 'Banganapalle',
    title: 'Non-Functional Public Pension Distribution Biometric Scanner at Center',
    description: 'Biometric fingerprint reader at the local digital center fails continuously during monthly pension disbursement, causing long queues for senior citizens.',
    status: 'Resolved',
    priority: 'Medium',
    isEmergency: false,
    registeredToday: false,
    createdYear: 2026,
    registeredDate: '10 Jul 2026, 10:00 AM',
    slaHoursRemaining: 0,
    latitude: 15.32,
    longitude: 78.23,
    aiCategory: 'General Public Services & Hardware Replacement',
    aiSummary: 'Hardware replacement resolved and verified with uploaded site photo.',
    citizen: {
      name: 'B. Venkatamma',
      mobile: '+91 97001 23456',
      email: 'venkatamma.b@gmail.com',
      address: 'Main Bazaar Road, Banganapalle, Kurnool District'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '10 Jul 2026, 10:00 AM',
        remarks: 'Citizen registered complaint.'
      },
      {
        id: 2,
        action: 'Resolution Proof Uploaded',
        changedBy: 'System Administrator',
        timestamp: '12 Jul 2026, 03:30 PM',
        remarks: 'New iris and fingerprint dual-scanner replaced at center.'
      }
    ],
    resolutionProof: {
      documentName: 'Hardware_Replacement_Signoff.pdf',
      uploadedAt: '12 Jul 2026, 03:30 PM',
      notes: 'New biometric terminal configured and tested successfully with 15 senior citizens.'
    }
  },
  {
    id: 'GRV-2026-1007',
    ticketNo: 'GRV-2026-1007',
    department: 'REVENUE',
    district: 'VISAKHAPATNAM',
    mandal: 'Gajuwaka',
    village: 'Vadlapudi',
    title: 'Issuance of Revenue Land Certificate for Small Farmer Agricultural Credit',
    description: 'Application #REV-99201 submitted 3 weeks ago for Revenue Ownership Certificate required for KCC bank loan approval. VRO recommendation submitted, pending Tahsildar approval.',
    status: 'Pending',
    priority: 'High',
    isEmergency: false,
    registeredToday: true,
    createdYear: 2026,
    registeredDate: '16 Jul 2026, 01:10 PM',
    slaHoursRemaining: 36,
    latitude: 17.69,
    longitude: 83.20,
    aiCategory: 'Revenue Land Certificate & Farmer Subsidy',
    aiSummary: 'Pending Revenue Certificate approval for agricultural credit disbursement.',
    citizen: {
      name: 'N. Appala Raju',
      mobile: '+91 98481 99887',
      email: 'appalaraju.n@gmail.com',
      address: 'Door No 12-88, Vadlapudi Village, Gajuwaka Mandal, Visakhapatnam'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '16 Jul 2026, 01:10 PM',
        remarks: 'Uploaded VRO field inspection note.'
      }
    ],
    resolutionProof: null
  },
  {
    id: 'GRV-2026-1008',
    ticketNo: 'GRV-2026-1008',
    department: 'VILLAGE',
    district: 'VIJAYAWADA',
    mandal: 'Kankipadu',
    village: 'Edupugallu',
    title: 'Drinking Water Pipeline Burst & Main Road Contamination in Ward 5',
    description: 'Main Panchayat drinking water supply pipeline cracked under Ward 5 main road leading to severe water wastage and mud contamination near primary health center.',
    status: 'In Progress',
    priority: 'High',
    isEmergency: false,
    registeredToday: true,
    createdYear: 2026,
    registeredDate: '16 Jul 2026, 07:45 AM',
    slaHoursRemaining: 8,
    latitude: 16.48,
    longitude: 80.73,
    aiCategory: 'Village Pipeline Infrastructure Repair',
    aiSummary: 'Critical drinking sanitation leak near PHC requiring immediate pipeline replacement.',
    citizen: {
      name: 'S. Bhanumathi',
      mobile: '+91 94402 11223',
      email: 'bhanu.edupugallu@yahoo.com',
      address: 'Ward 5, Near Health Center, Edupugallu Village, Kankipadu, Vijayawada'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '16 Jul 2026, 07:45 AM',
        remarks: 'Citizen attached leak photo.'
      },
      {
        id: 2,
        action: 'Field Engineering Team Dispatched',
        changedBy: 'System Administrator',
        timestamp: '16 Jul 2026, 09:15 AM',
        remarks: 'Assigned to Village Water Inspector for immediate valve shut-off and repair.'
      }
    ],
    resolutionProof: null
  },
  {
    id: 'GRV-2026-1009',
    ticketNo: 'GRV-2026-1009',
    department: 'SCHOOLS',
    district: 'GUNTUR',
    mandal: 'Mangalagiri',
    village: 'Atmakuru',
    title: 'Installation of Digital Interactive Classroom Smartboard & Computer Lab Equipment',
    description: 'Sanction order #EDU-4410 released in April 2026 for 4 digital smartboards for Zilla Parishad High School Atmakuru, but hardware delivery remains pending at district warehouse.',
    status: 'Assigned',
    priority: 'Medium',
    isEmergency: false,
    registeredToday: false,
    createdYear: 2026,
    registeredDate: '14 Jul 2026, 11:30 AM',
    slaHoursRemaining: 24,
    latitude: 16.43,
    longitude: 80.56,
    aiCategory: 'Educational Technology & School Infrastructure',
    aiSummary: 'School smartboard hardware delivery dispatch pending from district store.',
    citizen: {
      name: 'Ch. Madhusudhan Rao',
      mobile: '+91 91772 33445',
      email: 'madhu.zphs@apschools.gov.in',
      address: 'ZPHS School Campus, Atmakuru, Mangalagiri Mandal, Guntur District'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '14 Jul 2026, 11:30 AM',
        remarks: 'School Headmaster submitted dispatch request.'
      }
    ],
    resolutionProof: null
  },
  {
    id: 'GRV-2026-1010',
    ticketNo: 'GRV-2026-1010',
    department: 'HOUSING',
    district: 'ANANTAPUR',
    mandal: 'Kadiri',
    village: 'Kutagulla',
    title: 'Verification of Basement Level Construction Inspection for Housing Layout',
    description: 'Pukka housing allotment ID #HSG-33109. Beneficiary has laid basement level masonry work and requested stage completion inspection for second installment release.',
    status: 'In Progress',
    priority: 'Medium',
    isEmergency: false,
    registeredToday: false,
    createdYear: 2026,
    registeredDate: '13 Jul 2026, 03:00 PM',
    slaHoursRemaining: 30,
    latitude: 14.11,
    longitude: 78.16,
    aiCategory: 'Urban & Rural Housing Inspection',
    aiSummary: 'Housing construction milestone verification requested for subsidy disbursement.',
    citizen: {
      name: 'D. Narasimhulu',
      mobile: '+91 99892 55667',
      email: 'narasimhulu.d@gmail.com',
      address: 'Plot 45, New Housing Colony, Kutagulla Village, Kadiri, Anantapur'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '13 Jul 2026, 03:00 PM',
        remarks: 'Basement construction photos uploaded.'
      }
    ],
    resolutionProof: null
  },
  {
    id: 'GRV-2026-1011',
    ticketNo: 'GRV-2026-1011',
    department: 'LAND',
    district: 'VISAKHAPATNAM',
    mandal: 'Bheemunipatnam',
    village: 'Nagarapalem',
    title: 'Correction of Typographical Name Error in Digital Resurvey Land Record',
    description: 'Pattadar name printed as "G. Ramaniah" instead of "G. Ramanaiah" in the newly generated digital land resurvey passbook for Survey No 89/1B.',
    status: 'Resolved',
    priority: 'Low',
    isEmergency: false,
    registeredToday: false,
    createdYear: 2026,
    registeredDate: '08 Jul 2026, 02:20 PM',
    slaHoursRemaining: 0,
    latitude: 17.89,
    longitude: 83.45,
    aiCategory: 'Land Records & Survey Typo Correction',
    aiSummary: 'Land digital passbook name correction completed and verified by Surveyor.',
    citizen: {
      name: 'G. Ramanaiah',
      mobile: '+91 93932 77889',
      email: 'ramanaiah.g@gmail.com',
      address: 'Main Road, Nagarapalem, Bheemunipatnam Mandal, Visakhapatnam'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '08 Jul 2026, 02:20 PM',
        remarks: 'Aadhar card copy uploaded as identity proof.'
      },
      {
        id: 2,
        action: 'Resolution Proof Uploaded',
        changedBy: 'System Administrator',
        timestamp: '11 Jul 2026, 11:00 AM',
        remarks: 'Typo corrected in revenue database and updated digital passbook issued.'
      }
    ],
    resolutionProof: {
      documentName: 'Corrected_Pattadar_Passbook.pdf',
      uploadedAt: '11 Jul 2026, 11:00 AM',
      notes: 'Digital land record database updated with correct spelling.'
    }
  },
  {
    id: 'GRV-2026-1012',
    ticketNo: 'GRV-2026-1012',
    department: 'OTHERS',
    district: 'CHITTOOR',
    mandal: 'Madanapalle',
    village: 'Basinikonda',
    title: 'Garbage Collection Schedule Regularization near Vegetable Market Yard',
    description: 'Waste management trucks have not cleared organic waste at Madanapalle wholesale market yard for 3 consecutive days, causing foul smell and traffic obstruction.',
    status: 'Pending',
    priority: 'Medium',
    isEmergency: false,
    registeredToday: true,
    createdYear: 2026,
    registeredDate: '16 Jul 2026, 10:45 AM',
    slaHoursRemaining: 20,
    latitude: 13.55,
    longitude: 78.50,
    aiCategory: 'Municipal Solid Waste & Sanitation Schedule',
    aiSummary: 'Market yard waste clearing schedule regularization request.',
    citizen: {
      name: 'K. Subrahmanyam',
      mobile: '+91 97003 99001',
      email: 'subbu.market@gmail.com',
      address: 'Shop No 14, Vegetable Market Yard, Basinikonda, Madanapalle, Chittoor'
    },
    history: [
      {
        id: 1,
        action: 'Grievance Registered',
        changedBy: 'System Portal',
        timestamp: '16 Jul 2026, 10:45 AM',
        remarks: 'Market association representative registered complaint.'
      }
    ],
    resolutionProof: null
  }
];

export const CURRENT_ADMIN = {
  name: 'System Administrator',
  designation: 'Central Admin Lead',
  badgeId: 'ADM-MASTER-001',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
};

export const DEPARTMENT_DESIGNATIONS = {
  REVENUE: [
    'VRO (Village Revenue Officer)',
    'MRI / Revenue Inspector',
    'MRO / Tahsildar (Mandal Revenue Officer)',
    'RDO (Revenue Divisional Officer)',
    'DRO (District Revenue Officer)'
  ],
  VILLAGE: [
    'Panchayat Secretary (Grade I-IV)',
    'VDA / Village Extension Officer',
    'MPDO (Mandal Parishad Dev. Officer)',
    'DPO (District Panchayat Officer)'
  ],
  SCHOOLS: [
    'School Headmaster',
    'MEO (Mandal Educational Officer)',
    'DEO (District Educational Officer)',
    'District Education Inspector'
  ],
  HOUSING: [
    'Housing AE (Assistant Engineer)',
    'Housing DE (Deputy Executive Engineer)',
    'EE Housing (Executive Engineer)',
    'Project Director (Housing)'
  ],
  LAND: [
    'Village Surveyor',
    'Mandal Surveyor',
    'Inspector of Survey (IS)',
    'AD Survey (Assistant Director)'
  ],
  OTHERS: [
    'Sanitation Inspector',
    'Municipal Commissioner',
    'Public Amenities Supervisor',
    'District Nodal Officer'
  ]
};

export const INITIAL_OFFICERS = [
  {
    id: 'OFF-101',
    name: 'S. Ramakrishna Varma',
    designation: 'MRO / Tahsildar (Mandal Revenue Officer)',
    department: 'REVENUE',
    district: 'GUNTUR',
    email: 'ramakrishna.v@apgov.in',
    phone: '+91 98490 11223',
    status: 'Active',
    assignedWorkload: 14,
    resolvedCount: 88,
    slaCompliance: '96%'
  },
  {
    id: 'OFF-102',
    name: 'K. Satyanarayana',
    designation: 'VRO (Village Revenue Officer)',
    department: 'REVENUE',
    district: 'VISAKHAPATNAM',
    email: 'satyanarayana.k@apgov.in',
    phone: '+91 98491 22334',
    status: 'Active',
    assignedWorkload: 8,
    resolvedCount: 64,
    slaCompliance: '94%'
  },
  {
    id: 'OFF-103',
    name: 'Ch. Prasad Rao',
    designation: 'RDO (Revenue Divisional Officer)',
    department: 'REVENUE',
    district: 'ANANTAPUR',
    email: 'prasad.rdo@apgov.in',
    phone: '+91 94401 55667',
    status: 'Active',
    assignedWorkload: 12,
    resolvedCount: 110,
    slaCompliance: '97%'
  },
  {
    id: 'OFF-104',
    name: 'Dr. P. Swathi',
    designation: 'DEO (District Educational Officer)',
    department: 'SCHOOLS',
    district: 'VISAKHAPATNAM',
    email: 'swathi.p@apgov.in',
    phone: '+91 94400 33445',
    status: 'Active',
    assignedWorkload: 9,
    resolvedCount: 120,
    slaCompliance: '98%'
  },
  {
    id: 'OFF-105',
    name: 'G. Nageswara Rao',
    designation: 'MEO (Mandal Educational Officer)',
    department: 'SCHOOLS',
    district: 'GUNTUR',
    email: 'nageswar.meo@apgov.in',
    phone: '+91 98488 44556',
    status: 'Active',
    assignedWorkload: 7,
    resolvedCount: 75,
    slaCompliance: '95%'
  },
  {
    id: 'OFF-106',
    name: 'K. Venkatesh Prasad',
    designation: 'DPO (District Panchayat Officer)',
    department: 'VILLAGE',
    district: 'ANANTAPUR',
    email: 'venkatesh.k@apgov.in',
    phone: '+91 91771 55667',
    status: 'Active',
    assignedWorkload: 21,
    resolvedCount: 104,
    slaCompliance: '91%'
  },
  {
    id: 'OFF-107',
    name: 'N. Srinivasa Rao',
    designation: 'Panchayat Secretary (Grade I)',
    department: 'VILLAGE',
    district: 'CHITTOOR',
    email: 'srinivas.ps@apgov.in',
    phone: '+91 93930 11223',
    status: 'Active',
    assignedWorkload: 11,
    resolvedCount: 92,
    slaCompliance: '93%'
  },
  {
    id: 'OFF-108',
    name: 'M. Madhavi Latha',
    designation: 'EE Housing (Executive Engineer)',
    department: 'HOUSING',
    district: 'VIJAYAWADA',
    email: 'madhavi.m@apgov.in',
    phone: '+91 99891 77889',
    status: 'Active',
    assignedWorkload: 18,
    resolvedCount: 65,
    slaCompliance: '94%'
  },
  {
    id: 'OFF-109',
    name: 'B. Jagadeeshwar Rao',
    designation: 'Mandal Surveyor & Inspector of Survey',
    department: 'LAND',
    district: 'CHITTOOR',
    email: 'jagadeesh.b@apgov.in',
    phone: '+91 93931 99001',
    status: 'On Leave',
    assignedWorkload: 6,
    resolvedCount: 42,
    slaCompliance: '89%'
  },
  {
    id: 'OFF-110',
    name: 'V. Ramesh Kumar',
    designation: 'AD Survey (Assistant Director)',
    department: 'LAND',
    district: 'VISAKHAPATNAM',
    email: 'ramesh.ad@apgov.in',
    phone: '+91 98492 88990',
    status: 'Active',
    assignedWorkload: 15,
    resolvedCount: 130,
    slaCompliance: '96%'
  },
  {
    id: 'OFF-111',
    name: 'T. Harinath Babu',
    designation: 'Municipal Sanitary Inspector',
    department: 'OTHERS',
    district: 'KURNOOL',
    email: 'harinath.t@apgov.in',
    phone: '+91 97002 22334',
    status: 'Active',
    assignedWorkload: 11,
    resolvedCount: 79,
    slaCompliance: '95%'
  }
];

export const INITIAL_DEPARTMENTS = [
  {
    id: 'REVENUE',
    name: 'REVENUE',
    code: 'REV',
    hodName: 'S. Ramakrishna Varma',
    hodEmail: 'hod.revenue@apgov.in',
    defaultSlaHours: 48,
    activeCases: 14,
    totalProcessed: 520,
    performanceScore: 94,
    status: 'Active'
  },
  {
    id: 'VILLAGE',
    name: 'VILLAGE',
    code: 'VIL',
    hodName: 'K. Venkatesh Prasad',
    hodEmail: 'hod.village@apgov.in',
    defaultSlaHours: 24,
    activeCases: 21,
    totalProcessed: 680,
    performanceScore: 91,
    status: 'Active'
  },
  {
    id: 'SCHOOLS',
    name: 'SCHOOLS',
    code: 'EDU',
    hodName: 'Dr. P. Swathi',
    hodEmail: 'hod.education@apgov.in',
    defaultSlaHours: 36,
    activeCases: 9,
    totalProcessed: 410,
    performanceScore: 98,
    status: 'Active'
  },
  {
    id: 'HOUSING',
    name: 'HOUSING',
    code: 'HSG',
    hodName: 'M. Madhavi Latha',
    hodEmail: 'hod.housing@apgov.in',
    defaultSlaHours: 72,
    activeCases: 18,
    totalProcessed: 350,
    performanceScore: 93,
    status: 'Active'
  },
  {
    id: 'LAND',
    name: 'LAND',
    code: 'LND',
    hodName: 'B. Jagadeeshwar Rao',
    hodEmail: 'hod.land@apgov.in',
    defaultSlaHours: 48,
    activeCases: 16,
    totalProcessed: 290,
    performanceScore: 89,
    status: 'Active'
  },
  {
    id: 'OTHERS',
    name: 'OTHERS',
    code: 'GEN',
    hodName: 'T. Harinath Babu',
    hodEmail: 'hod.general@apgov.in',
    defaultSlaHours: 24,
    activeCases: 11,
    totalProcessed: 440,
    performanceScore: 95,
    status: 'Active'
  }
];

export const INITIAL_ESCALATION_RULES = [
  {
    id: 'ESC-RULE-101',
    level: 'Low Priority',
    name: '10-Day Nodal Officer Initial Review SLA Breach',
    triggerThreshold: 10,
    unit: 'Days',
    targetAuthority: 'Nodal Officer & Department Inspector',
    channel: 'SMS & Web Portal Alert',
    autoReassign: true,
    enabled: true
  },
  {
    id: 'ESC-RULE-102',
    level: 'Medium Priority',
    name: '1-Month (30 Days) State Commission & HOD Alert',
    triggerThreshold: 30,
    unit: 'Days',
    targetAuthority: 'State Grievance Commission & Department HOD',
    channel: 'High Priority Email & Push Alert',
    autoReassign: false,
    enabled: true
  },
  {
    id: 'ESC-RULE-103',
    level: 'High Priority',
    name: '3-Month (90 Days) Apex Escalation to District Magistrate',
    triggerThreshold: 90,
    unit: 'Days',
    targetAuthority: 'District Magistrate & Collector (DM / DC)',
    channel: 'Immediate Apex Red Flag & DM Intervention Order',
    autoReassign: true,
    enabled: true
  }
];

export const INITIAL_SYSTEM_AUDIT_LOGS = [
  {
    id: 'AUD-2026-9901',
    timestamp: '16 Jul 2026, 02:30 PM',
    actor: 'System Administrator',
    role: 'Central Admin Lead',
    module: 'Complaint Lifecycle',
    action: 'Status Updated',
    details: 'Changed status of GRV-2026-1003 to In Progress (Tahsildar Digital Sign)',
    ipAddress: '192.168.1.45',
    severity: 'info'
  },
  {
    id: 'AUD-2026-9902',
    timestamp: '16 Jul 2026, 01:15 PM',
    actor: 'S. Ramakrishna Varma',
    role: 'Revenue Officer',
    module: 'Inter-Department Transfer',
    action: 'Shift Approved',
    details: 'Transferred GRV-2026-1005 from Housing to Land Survey Department',
    ipAddress: '10.20.4.12',
    severity: 'warning'
  },
  {
    id: 'AUD-2026-9903',
    timestamp: '16 Jul 2026, 11:00 AM',
    actor: 'System Escalation Engine',
    role: 'Automated Service',
    module: 'SLA Monitoring',
    action: 'Escalation Alert Triggered',
    details: 'Low Priority escalation flagged for GRV-2026-1001 due to 10 days SLA threshold',
    ipAddress: 'System Core',
    severity: 'critical'
  },
  {
    id: 'AUD-2026-9904',
    timestamp: '15 Jul 2026, 04:30 PM',
    actor: 'System Administrator',
    role: 'Central Admin Lead',
    module: 'Authentication',
    action: 'User Login',
    details: 'Admin user ADM-MASTER-001 authenticated via double-factor portal',
    ipAddress: '192.168.1.45',
    severity: 'info'
  }
];


