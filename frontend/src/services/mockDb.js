const INITIAL_COMPLAINTS = [
  {
    id: 'TKT-2026-9812',
    title: 'Village Panchayat Road Repair Request',
    category: 'village',
    description: 'The main connecting road between the village entrance and the market square is severely damaged. Paving has been pending for two terms. Heavy vehicles slip during rain.',
    priority: 'HIGH',
    anonymous: false,
    gps: '28.6142, 77.2094',
    address: 'Main Bazar Road, Sector 3 Village Area',
    landmark: 'Panchayat Bhavan Entrance',
    district: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    status: 'IN_PROGRESS',
    assignedDepartment: 'Village Development Department',
    assignedOfficer: 'Sanjay Deshmukh (Executive Engineer)',
    createdDate: '2026-07-02T10:30:00Z',
    updatedDate: '2026-07-14T14:20:00Z',
    attachments: [
      { name: 'road_damage_1.jpg', type: 'image/jpeg', url: 'https://images.unsplash.com/photo-1515162305285-0293e4767cc2?w=400' }
    ],
    history: [
      { status: 'PENDING', date: '2026-07-02T10:30:00Z', comment: 'Complaint registered successfully by Rajesh Kumar.' },
      { status: 'ASSIGNED', date: '2026-07-04T09:00:00Z', comment: 'Ticket assigned to Village Development Department, New Delhi Division.' },
      { status: 'IN_PROGRESS', date: '2026-07-14T14:20:00Z', comment: 'Site inspection completed. Road paving material dispatched for repairs starting tomorrow.' }
    ],
    citizenId: 'usr-1',
    citizenName: 'Rajesh Kumar'
  },
  {
    id: 'TKT-2026-1045',
    title: 'Discrepancy in Land Revenue Tax Records',
    category: 'revenue',
    description: 'The property tax and land revenue ledger on the portal shows an incorrect duplicate assessment under survey block 12. Requesting immediate verification and correction.',
    priority: 'MEDIUM',
    anonymous: false,
    gps: '19.0760, 72.8777',
    address: 'Block C, Sector 4, Rohini',
    landmark: 'Opposite District Revenue Court',
    district: 'North Delhi',
    state: 'Delhi',
    pincode: '110085',
    status: 'PENDING',
    assignedDepartment: 'Revenue Department',
    assignedOfficer: 'Pending Assignment',
    createdDate: '2026-07-15T08:15:00Z',
    updatedDate: '2026-07-15T08:15:00Z',
    attachments: [],
    history: [
      { status: 'PENDING', date: '2026-07-15T08:15:00Z', comment: 'Grievance submitted. Awaiting Revenue Officer allocation.' }
    ],
    citizenId: 'usr-1',
    citizenName: 'Rajesh Kumar'
  },
  {
    id: 'TKT-2026-0524',
    title: 'Boundary Wall Repair at Government Primary School',
    category: 'schools',
    description: 'The boundary wall of the government primary school has partially collapsed. It poses a safety hazard for school children during recess as wild animals enter the area.',
    priority: 'CRITICAL',
    anonymous: true,
    gps: '12.9716, 77.5946',
    address: 'School Lane, Vasanth Nagar',
    landmark: 'Government Primary School No. 3',
    district: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
    status: 'RESOLVED',
    assignedDepartment: 'Schools & Education Department',
    assignedOfficer: 'Ramesh Gowda (Assistant Engineer)',
    createdDate: '2026-06-25T11:00:00Z',
    updatedDate: '2026-07-12T16:45:00Z',
    attachments: [
      { name: 'collapsed_wall.jpg', type: 'image/jpeg', url: 'https://images.unsplash.com/photo-1542060748-10c28b629f6f?w=400' }
    ],
    history: [
      { status: 'PENDING', date: '2026-06-25T11:00:00Z', comment: 'Anonymous complaint filed.' },
      { status: 'ASSIGNED', date: '2026-06-26T14:30:00Z', comment: 'Assigned to School Infrastructure Maintenance Unit.' },
      { status: 'IN_PROGRESS', date: '2026-06-28T10:00:00Z', comment: 'Debris cleared. Brick work and concrete plastering started.' },
      { status: 'RESOLVED', date: '2026-07-12T16:45:00Z', comment: 'Wall completely rebuilt, plastered, and painted. Security checkpoint verified.' }
    ],
    citizenId: 'usr-4',
    citizenName: 'Anonymous Citizen',
    feedbackId: 'fb-1'
  },
  {
    id: 'TKT-2026-0311',
    title: 'Delay in Processing Prime Minister Housing Scheme Grant',
    category: 'housing',
    description: 'Application for housing subsidy under Pradhan Mantri Awas Yojana is pending verification for 3 months. Requesting status update on bank clearance.',
    priority: 'LOW',
    anonymous: false,
    gps: '23.0225, 72.5714',
    address: 'Near Mother Dairy Booth, Sector 12',
    landmark: 'Mother Dairy Booth',
    district: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '380015',
    status: 'CLOSED',
    assignedDepartment: 'Housing Development Board',
    assignedOfficer: 'Bharat Patel (Inspector)',
    createdDate: '2026-06-15T09:00:00Z',
    updatedDate: '2026-06-18T10:12:00Z',
    attachments: [],
    history: [
      { status: 'PENDING', date: '2026-06-15T09:00:00Z', comment: 'Complaint submitted by Rajesh Kumar.' },
      { status: 'ASSIGNED', date: '2026-06-15T12:00:00Z', comment: 'Assigned to Housing Subsidy Verification Team.' },
      { status: 'IN_PROGRESS', date: '2026-06-16T08:00:00Z', comment: 'Verification of income certificates in progress.' },
      { status: 'RESOLVED', date: '2026-06-17T11:00:00Z', comment: 'Verification completed. Subsidy fund released to beneficiary account.' },
      { status: 'CLOSED', date: '2026-06-18T10:12:00Z', comment: 'Citizen satisfied. Ticket closed.' }
    ],
    citizenId: 'usr-1',
    citizenName: 'Rajesh Kumar',
    feedbackId: 'fb-2'
  },
  {
    id: 'TKT-2026-0788',
    title: 'Encroachment on Government Land Near River Bank',
    category: 'land',
    description: 'Unauthorised construction is being done on government-owned land near the river bank. Multiple structures built without permits and causing environmental damage.',
    priority: 'HIGH',
    anonymous: false,
    gps: '17.3850, 78.4867',
    address: 'River Bank Road, Near Bypass Highway',
    landmark: 'Old Stone Bridge',
    district: 'Hyderabad',
    state: 'Telangana',
    pincode: '500001',
    status: 'ASSIGNED',
    assignedDepartment: 'Land Revenue & Survey Department',
    assignedOfficer: 'Vijay Reddy (District Survey Officer)',
    createdDate: '2026-07-10T07:45:00Z',
    updatedDate: '2026-07-11T12:00:00Z',
    attachments: [],
    history: [
      { status: 'PENDING', date: '2026-07-10T07:45:00Z', comment: 'Complaint registered.' },
      { status: 'ASSIGNED', date: '2026-07-11T12:00:00Z', comment: 'Assigned to Land Survey Officer for on-site verification.' }
    ],
    citizenId: 'usr-2',
    citizenName: 'Meena Reddy'
  },
  {
    id: 'TKT-2026-0456',
    title: 'Drinking Water Supply Disruption for 10 Days',
    category: 'village',
    description: 'The village water supply through the panchayat pipe network has been disrupted for the past 10 days. Residents are forced to buy water at high cost.',
    priority: 'CRITICAL',
    anonymous: false,
    gps: '15.3647, 75.1240',
    address: 'Ward 5, Panchayat Colony',
    landmark: 'Near Primary Health Centre',
    district: 'Hubli',
    state: 'Karnataka',
    pincode: '580028',
    status: 'PENDING',
    assignedDepartment: 'Village Development Department',
    assignedOfficer: 'Pending Assignment',
    createdDate: '2026-07-14T06:00:00Z',
    updatedDate: '2026-07-14T06:00:00Z',
    attachments: [],
    history: [
      { status: 'PENDING', date: '2026-07-14T06:00:00Z', comment: 'Urgent complaint registered for water supply disruption.' }
    ],
    citizenId: 'usr-3',
    citizenName: 'Suresh Patil'
  }
];

const INITIAL_FEEDBACK = [
  {
    id: 'fb-1',
    complaintId: 'TKT-2026-0524',
    complaintTitle: 'Boundary Wall Repair at Government Primary School',
    rating: 5,
    reviewText: 'Excellent service! They resolved the primary school wall collapse issue completely and even painted the wall. The children can play safely now.',
    suggestion: 'Please perform annual wall stability checks for old school blocks.',
    recommend: true,
    createdDate: '2026-07-13T10:00:00Z',
    citizenName: 'Anonymous Citizen'
  },
  {
    id: 'fb-2',
    complaintId: 'TKT-2026-0311',
    complaintTitle: 'Delay in Processing Prime Minister Housing Scheme Grant',
    rating: 4,
    reviewText: 'The subsidy fund was released within a day of registering the complaint. Highly appreciate the quick resolution.',
    suggestion: 'The initial application approval process should be faster.',
    recommend: true,
    createdDate: '2026-06-18T10:12:00Z',
    citizenName: 'Rajesh Kumar'
  }
];

export const initMockDb = () => {
  if (!localStorage.getItem('portal_complaints')) {
    localStorage.setItem('portal_complaints', JSON.stringify(INITIAL_COMPLAINTS));
  }
  if (!localStorage.getItem('portal_feedback')) {
    localStorage.setItem('portal_feedback', JSON.stringify(INITIAL_FEEDBACK));
  }
};

export const getComplaintsFromStorage = () => {
  initMockDb();
  return JSON.parse(localStorage.getItem('portal_complaints') || '[]');
};

export const saveComplaintsToStorage = (complaints) => {
  localStorage.setItem('portal_complaints', JSON.stringify(complaints));
};

export const getFeedbackFromStorage = () => {
  initMockDb();
  return JSON.parse(localStorage.getItem('portal_feedback') || '[]');
};

export const saveFeedbackToStorage = (feedbacks) => {
  localStorage.setItem('portal_feedback', JSON.stringify(feedbacks));
};
