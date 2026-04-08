// Traivio demo data — 50 realistic South African corporate travel records
// Oct 2024 – Mar 2025

export const demoRecords = [
  // ── OCT 2024 – Air ──────────────────────────────────────────────────────────
  { id:1, travelDate:'2024-10-03', bookingDate:'2024-09-18', travelerName:'Sarah Johnson', travelerEmail:'sarah.johnson@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'South African Airways', bookingRef:'SAA-2024-0001', ticketNumber:'SA083456789', classOfTravel:'Economy', category:'Air', totalCost:4200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Michael Peters', marketRate:3800, fraudFlag:false, notes:'' },
  { id:2, travelDate:'2024-10-07', bookingDate:'2024-09-10', travelerName:'Michael Peters', travelerEmail:'michael.peters@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Johannesburg', originCode:'JNB', destination:'London', destinationCode:'LHR', vendor:'British Airways', bookingRef:'BA-2024-0012', ticketNumber:'BA0923847561', classOfTravel:'Business', category:'Air', totalCost:28000, currency:'ZAR', policyStatus:'Violation', approvedBy:'', marketRate:21000, fraudFlag:false, notes:'Business class not approved at this level' },
  { id:3, travelDate:'2024-10-10', bookingDate:'2024-09-25', travelerName:'Lebo Khumalo', travelerEmail:'lebo.khumalo@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'FlySafair', bookingRef:'FSA-2024-0033', ticketNumber:'FS034728391', classOfTravel:'Economy', category:'Air', totalCost:3500, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Priya Naidoo', marketRate:3400, fraudFlag:false, notes:'' },
  { id:4, travelDate:'2024-10-15', bookingDate:'2024-09-28', travelerName:'Priya Naidoo', travelerEmail:'priya.naidoo@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Johannesburg', originCode:'JNB', destination:'Dubai', destinationCode:'DXB', vendor:'Emirates', bookingRef:'EK-2024-0041', ticketNumber:'EK0829374651', classOfTravel:'Economy', category:'Air', totalCost:12400, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Lebo Khumalo', marketRate:11800, fraudFlag:false, notes:'' },
  { id:5, travelDate:'2024-10-18', bookingDate:'2024-10-03', travelerName:'James van der Merwe', travelerEmail:'james.vdm@acmecorp.com', department:'Marketing', costCentre:'CC-MKT-003', origin:'Cape Town', originCode:'CPT', destination:'Johannesburg', destinationCode:'JNB', vendor:'South African Airways', bookingRef:'SAA-2024-0055', ticketNumber:'SA093847261', classOfTravel:'Economy', category:'Air', totalCost:4100, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Zanele Mokoena', marketRate:3800, fraudFlag:false, notes:'' },
  { id:6, travelDate:'2024-10-22', bookingDate:'2024-10-05', travelerName:'Zanele Mokoena', travelerEmail:'zanele.mokoena@acmecorp.com', department:'Marketing', costCentre:'CC-MKT-003', origin:'Johannesburg', originCode:'JNB', destination:'New York', destinationCode:'NYC', vendor:'South African Airways', bookingRef:'SAA-2024-0067', ticketNumber:'SA072839461', classOfTravel:'Economy', category:'Air', totalCost:22800, currency:'ZAR', policyStatus:'Compliant', approvedBy:'James van der Merwe', marketRate:21500, fraudFlag:false, notes:'' },
  { id:7, travelDate:'2024-10-25', bookingDate:'2024-10-12', travelerName:'Craig Dlamini', travelerEmail:'craig.dlamini@acmecorp.com', department:'Operations', costCentre:'CC-OPS-004', origin:'Durban', originCode:'DUR', destination:'Johannesburg', destinationCode:'JNB', vendor:'Airlink', bookingRef:'ALK-2024-0021', ticketNumber:'LK039274651', classOfTravel:'Economy', category:'Air', totalCost:2900, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Nomsa Sithole', marketRate:2600, fraudFlag:false, notes:'' },
  // ── OCT 2024 – Hotel ────────────────────────────────────────────────────────
  { id:8, travelDate:'2024-10-08', bookingDate:'2024-09-10', travelerName:'Michael Peters', travelerEmail:'michael.peters@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'London', originCode:'LHR', destination:'London', destinationCode:'LHR', vendor:'Marriott', bookingRef:'MR-2024-1001', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:5600, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Andrew Fischer', marketRate:5200, fraudFlag:false, notes:'3 nights Marriott London' },
  { id:9, travelDate:'2024-10-23', bookingDate:'2024-10-05', travelerName:'Zanele Mokoena', travelerEmail:'zanele.mokoena@acmecorp.com', department:'Marketing', costCentre:'CC-MKT-003', origin:'New York', originCode:'NYC', destination:'New York', destinationCode:'NYC', vendor:'Marriott', bookingRef:'MR-2024-1012', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:6200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'James van der Merwe', marketRate:5800, fraudFlag:false, notes:'2 nights Marriott NYC' },
  // ── OCT 2024 – Car ──────────────────────────────────────────────────────────
  { id:10, travelDate:'2024-10-04', bookingDate:'2024-09-18', travelerName:'Sarah Johnson', travelerEmail:'sarah.johnson@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Cape Town', originCode:'CPT', destination:'Cape Town', destinationCode:'CPT', vendor:'Avis', bookingRef:'AV-2024-3001', ticketNumber:'', classOfTravel:'Standard', category:'Car', totalCost:2200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Michael Peters', marketRate:1900, fraudFlag:false, notes:'2 days car rental Cape Town' },
  { id:11, travelDate:'2024-10-16', bookingDate:'2024-09-28', travelerName:'Priya Naidoo', travelerEmail:'priya.naidoo@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Durban', originCode:'DUR', destination:'Durban', destinationCode:'DUR', vendor:'Budget', bookingRef:'BG-2024-3042', ticketNumber:'', classOfTravel:'Standard', category:'Car', totalCost:1200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Lebo Khumalo', marketRate:1100, fraudFlag:false, notes:'1 day car rental Durban' },
  { id:12, travelDate:'2024-10-24', bookingDate:'2024-10-05', travelerName:'Zanele Mokoena', travelerEmail:'zanele.mokoena@acmecorp.com', department:'Marketing', costCentre:'CC-MKT-003', origin:'New York', originCode:'NYC', destination:'New York', destinationCode:'NYC', vendor:'Hertz', bookingRef:'HZ-2024-3089', ticketNumber:'', classOfTravel:'Standard', category:'Car', totalCost:2300, currency:'ZAR', policyStatus:'Violation', approvedBy:'', marketRate:2100, fraudFlag:true, notes:'No travel approval found for this rental' },
  // ── NOV 2024 – Air ──────────────────────────────────────────────────────────
  { id:13, travelDate:'2024-11-01', bookingDate:'2024-10-18', travelerName:'Nomsa Sithole', travelerEmail:'nomsa.sithole@acmecorp.com', department:'Operations', costCentre:'CC-OPS-004', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'FlySafair', bookingRef:'FSA-2024-0112', ticketNumber:'FS038291746', classOfTravel:'Economy', category:'Air', totalCost:3800, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Craig Dlamini', marketRate:3500, fraudFlag:false, notes:'' },
  { id:14, travelDate:'2024-11-05', bookingDate:'2024-10-15', travelerName:'Andrew Fischer', travelerEmail:'andrew.fischer@acmecorp.com', department:'Executive', costCentre:'CC-EXEC-005', origin:'Johannesburg', originCode:'JNB', destination:'London', destinationCode:'LHR', vendor:'British Airways', bookingRef:'BA-2024-0142', ticketNumber:'BA0938475610', classOfTravel:'Business', category:'Air', totalCost:32000, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Board', marketRate:30000, fraudFlag:false, notes:'Executive travel — business class approved' },
  { id:15, travelDate:'2024-11-08', bookingDate:'2024-10-25', travelerName:'Thabo Radebe', travelerEmail:'thabo.radebe@acmecorp.com', department:'Executive', costCentre:'CC-EXEC-005', origin:'Cape Town', originCode:'CPT', destination:'Durban', destinationCode:'DUR', vendor:'Airlink', bookingRef:'ALK-2024-0044', ticketNumber:'LK047382916', classOfTravel:'Economy', category:'Air', totalCost:2600, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Andrew Fischer', marketRate:2400, fraudFlag:false, notes:'' },
  { id:16, travelDate:'2024-11-12', bookingDate:'2024-10-28', travelerName:'Lisa Botha', travelerEmail:'lisa.botha@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Johannesburg', originCode:'JNB', destination:'Singapore', destinationCode:'SIN', vendor:'Singapore Airlines', bookingRef:'SQ-2024-0201', ticketNumber:'SQ082937461', classOfTravel:'Economy', category:'Air', totalCost:18900, currency:'ZAR', policyStatus:'Violation', approvedBy:'', marketRate:17200, fraudFlag:false, notes:'Non-preferred carrier — SAA preferred on this route' },
  { id:17, travelDate:'2024-11-15', bookingDate:'2024-11-01', travelerName:'Ravi Patel', travelerEmail:'ravi.patel@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'South African Airways', bookingRef:'SAA-2024-0178', ticketNumber:'SA083927461', classOfTravel:'Economy', category:'Air', totalCost:4500, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Lebo Khumalo', marketRate:3900, fraudFlag:false, notes:'' },
  { id:18, travelDate:'2024-11-20', bookingDate:'2024-10-28', travelerName:'Sarah Johnson', travelerEmail:'sarah.johnson@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Johannesburg', originCode:'JNB', destination:'London', destinationCode:'LHR', vendor:'British Airways', bookingRef:'BA-2024-0156', ticketNumber:'BA0938274651', classOfTravel:'Business', category:'Air', totalCost:26000, currency:'ZAR', policyStatus:'Violation', approvedBy:'', marketRate:20500, fraudFlag:false, notes:'Business class not approved for this level' },
  { id:19, travelDate:'2024-11-25', bookingDate:'2024-11-10', travelerName:'Michael Peters', travelerEmail:'michael.peters@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Johannesburg', originCode:'JNB', destination:'Dubai', destinationCode:'DXB', vendor:'Emirates', bookingRef:'EK-2024-0218', ticketNumber:'EK0829475610', classOfTravel:'Economy', category:'Air', totalCost:13200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Andrew Fischer', marketRate:12000, fraudFlag:false, notes:'' },
  // ── NOV 2024 – Hotel ────────────────────────────────────────────────────────
  { id:20, travelDate:'2024-11-06', bookingDate:'2024-10-15', travelerName:'Andrew Fischer', travelerEmail:'andrew.fischer@acmecorp.com', department:'Executive', costCentre:'CC-EXEC-005', origin:'London', originCode:'LHR', destination:'London', destinationCode:'LHR', vendor:'Radisson Blu', bookingRef:'RB-2024-2001', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:5900, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Board', marketRate:5400, fraudFlag:false, notes:'4 nights Radisson Blu London' },
  { id:21, travelDate:'2024-11-26', bookingDate:'2024-11-10', travelerName:'Michael Peters', travelerEmail:'michael.peters@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Dubai', originCode:'DXB', destination:'Dubai', destinationCode:'DXB', vendor:'Marriott', bookingRef:'MR-2024-1089', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:4400, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Andrew Fischer', marketRate:4100, fraudFlag:false, notes:'2 nights Marriott Dubai' },
  // ── NOV 2024 – Car ──────────────────────────────────────────────────────────
  { id:22, travelDate:'2024-11-09', bookingDate:'2024-10-25', travelerName:'Michael Peters', travelerEmail:'michael.peters@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'London', originCode:'LHR', destination:'London', destinationCode:'LHR', vendor:'Hertz', bookingRef:'HZ-2024-3102', ticketNumber:'', classOfTravel:'Standard', category:'Car', totalCost:2400, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Andrew Fischer', marketRate:2200, fraudFlag:false, notes:'2 days car rental London' },
  // ── DEC 2024 – Air ──────────────────────────────────────────────────────────
  { id:23, travelDate:'2024-12-02', bookingDate:'2024-11-15', travelerName:'Lebo Khumalo', travelerEmail:'lebo.khumalo@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Cape Town', originCode:'CPT', destination:'London', destinationCode:'LHR', vendor:'British Airways', bookingRef:'BA-2024-0267', ticketNumber:'BA0928374651', classOfTravel:'Economy', category:'Air', totalCost:21400, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Priya Naidoo', marketRate:19800, fraudFlag:false, notes:'' },
  { id:24, travelDate:'2024-12-05', bookingDate:'2024-11-20', travelerName:'Priya Naidoo', travelerEmail:'priya.naidoo@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Johannesburg', originCode:'JNB', destination:'New York', destinationCode:'NYC', vendor:'Delta', bookingRef:'DL-2024-0301', ticketNumber:'DL0829374651', classOfTravel:'Economy', category:'Air', totalCost:23100, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Lebo Khumalo', marketRate:22000, fraudFlag:false, notes:'' },
  { id:25, travelDate:'2024-12-10', bookingDate:'2024-11-28', travelerName:'James van der Merwe', travelerEmail:'james.vdm@acmecorp.com', department:'Marketing', costCentre:'CC-MKT-003', origin:'Johannesburg', originCode:'JNB', destination:'Port Elizabeth', destinationCode:'PLZ', vendor:'FlySafair', bookingRef:'FSA-2024-0198', ticketNumber:'FS039284716', classOfTravel:'Economy', category:'Air', totalCost:1800, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Zanele Mokoena', marketRate:1700, fraudFlag:false, notes:'' },
  { id:26, travelDate:'2024-12-15', bookingDate:'2024-12-02', travelerName:'Zanele Mokoena', travelerEmail:'zanele.mokoena@acmecorp.com', department:'Marketing', costCentre:'CC-MKT-003', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'South African Airways', bookingRef:'SAA-2024-0234', ticketNumber:'SA083726491', classOfTravel:'Economy', category:'Air', totalCost:4400, currency:'ZAR', policyStatus:'Compliant', approvedBy:'James van der Merwe', marketRate:4100, fraudFlag:false, notes:'' },
  { id:27, travelDate:'2024-12-18', bookingDate:'2024-12-17', travelerName:'Thabo Radebe', travelerEmail:'thabo.radebe@acmecorp.com', department:'Executive', costCentre:'CC-EXEC-005', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'South African Airways', bookingRef:'SAA-2024-0245', ticketNumber:'SA093827461', classOfTravel:'Economy', category:'Air', totalCost:5600, currency:'ZAR', policyStatus:'Violation', approvedBy:'', marketRate:3900, fraudFlag:false, notes:'Same-day booking — premium fare, policy requires 7-day advance' },
  { id:28, travelDate:'2024-12-19', bookingDate:'2024-12-05', travelerName:'Craig Dlamini', travelerEmail:'craig.dlamini@acmecorp.com', department:'Operations', costCentre:'CC-OPS-004', origin:'Johannesburg', originCode:'JNB', destination:'Dubai', destinationCode:'DXB', vendor:'Emirates', bookingRef:'EK-2024-0312', ticketNumber:'EK0832947561', classOfTravel:'Economy', category:'Air', totalCost:12800, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Nomsa Sithole', marketRate:11900, fraudFlag:false, notes:'' },
  // ── DEC 2024 – Hotel ────────────────────────────────────────────────────────
  { id:29, travelDate:'2024-12-03', bookingDate:'2024-11-15', travelerName:'Lebo Khumalo', travelerEmail:'lebo.khumalo@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'London', originCode:'LHR', destination:'London', destinationCode:'LHR', vendor:'Radisson Blu', bookingRef:'RB-2024-2034', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:5400, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Priya Naidoo', marketRate:5000, fraudFlag:false, notes:'3 nights Radisson Blu London' },
  { id:30, travelDate:'2024-12-06', bookingDate:'2024-11-20', travelerName:'Priya Naidoo', travelerEmail:'priya.naidoo@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'New York', originCode:'NYC', destination:'New York', destinationCode:'NYC', vendor:'Marriott', bookingRef:'MR-2024-1156', ticketNumber:'', classOfTravel:'Suite', category:'Hotel', totalCost:8200, currency:'ZAR', policyStatus:'Violation', approvedBy:'', marketRate:6000, fraudFlag:false, notes:'Suite booked instead of standard room — policy violation' },
  { id:31, travelDate:'2024-12-19', bookingDate:'2024-12-05', travelerName:'Craig Dlamini', travelerEmail:'craig.dlamini@acmecorp.com', department:'Operations', costCentre:'CC-OPS-004', origin:'Dubai', originCode:'DXB', destination:'Dubai', destinationCode:'DXB', vendor:'Marriott', bookingRef:'MR-2024-1178', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:4200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Nomsa Sithole', marketRate:3900, fraudFlag:false, notes:'2 nights Dubai Marriott' },
  // ── DEC 2024 – Car ──────────────────────────────────────────────────────────
  { id:32, travelDate:'2024-12-03', bookingDate:'2024-11-15', travelerName:'Lebo Khumalo', travelerEmail:'lebo.khumalo@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'London', originCode:'LHR', destination:'London', destinationCode:'LHR', vendor:'Budget', bookingRef:'BG-2024-3201', ticketNumber:'', classOfTravel:'Standard', category:'Car', totalCost:2100, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Priya Naidoo', marketRate:1900, fraudFlag:false, notes:'3 days car rental London' },
  // ── JAN 2025 – Air ──────────────────────────────────────────────────────────
  { id:33, travelDate:'2025-01-08', bookingDate:'2024-12-20', travelerName:'Nomsa Sithole', travelerEmail:'nomsa.sithole@acmecorp.com', department:'Operations', costCentre:'CC-OPS-004', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'FlySafair', bookingRef:'FSA-2025-0012', ticketNumber:'FS039274815', classOfTravel:'Economy', category:'Air', totalCost:3700, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Craig Dlamini', marketRate:3400, fraudFlag:false, notes:'' },
  { id:34, travelDate:'2025-01-12', bookingDate:'2024-12-18', travelerName:'Andrew Fischer', travelerEmail:'andrew.fischer@acmecorp.com', department:'Executive', costCentre:'CC-EXEC-005', origin:'Cape Town', originCode:'CPT', destination:'London', destinationCode:'LHR', vendor:'British Airways', bookingRef:'BA-2025-0023', ticketNumber:'BA0938271456', classOfTravel:'Business', category:'Air', totalCost:31500, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Board', marketRate:29500, fraudFlag:false, notes:'Executive travel — business class approved' },
  { id:35, travelDate:'2025-01-15', bookingDate:'2025-01-14', travelerName:'Thabo Radebe', travelerEmail:'thabo.radebe@acmecorp.com', department:'Executive', costCentre:'CC-EXEC-005', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'South African Airways', bookingRef:'SAA-2025-0018', ticketNumber:'SA0938274651', classOfTravel:'Economy', category:'Air', totalCost:5800, currency:'ZAR', policyStatus:'Violation', approvedBy:'', marketRate:3900, fraudFlag:false, notes:'Last-minute booking (day before) — premium fare charged' },
  { id:36, travelDate:'2025-01-20', bookingDate:'2025-01-06', travelerName:'Lisa Botha', travelerEmail:'lisa.botha@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Johannesburg', originCode:'JNB', destination:'New York', destinationCode:'NYC', vendor:'South African Airways', bookingRef:'SAA-2025-0031', ticketNumber:'SA092837461', classOfTravel:'Economy', category:'Air', totalCost:24500, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Michael Peters', marketRate:22800, fraudFlag:false, notes:'' },
  { id:37, travelDate:'2025-01-24', bookingDate:'2025-01-10', travelerName:'Ravi Patel', travelerEmail:'ravi.patel@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Durban', originCode:'DUR', destination:'Johannesburg', destinationCode:'JNB', vendor:'Airlink', bookingRef:'ALK-2025-0009', ticketNumber:'LK038927451', classOfTravel:'Economy', category:'Air', totalCost:3100, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Lebo Khumalo', marketRate:2900, fraudFlag:false, notes:'' },
  // ── JAN 2025 – Hotel ────────────────────────────────────────────────────────
  { id:38, travelDate:'2025-01-13', bookingDate:'2024-12-18', travelerName:'Andrew Fischer', travelerEmail:'andrew.fischer@acmecorp.com', department:'Executive', costCentre:'CC-EXEC-005', origin:'London', originCode:'LHR', destination:'London', destinationCode:'LHR', vendor:'Radisson Blu', bookingRef:'RB-2025-2001', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:5900, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Board', marketRate:5400, fraudFlag:false, notes:'4 nights Radisson Blu London' },
  { id:39, travelDate:'2025-01-16', bookingDate:'2025-01-14', travelerName:'Thabo Radebe', travelerEmail:'thabo.radebe@acmecorp.com', department:'Executive', costCentre:'CC-EXEC-005', origin:'Cape Town', originCode:'CPT', destination:'Cape Town', destinationCode:'CPT', vendor:'City Lodge', bookingRef:'CL-2025-2089', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:2200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Andrew Fischer', marketRate:2000, fraudFlag:false, notes:'1 night City Lodge Cape Town' },
  { id:40, travelDate:'2025-01-09', bookingDate:'2024-12-20', travelerName:'Nomsa Sithole', travelerEmail:'nomsa.sithole@acmecorp.com', department:'Operations', costCentre:'CC-OPS-004', origin:'Cape Town', originCode:'CPT', destination:'Cape Town', destinationCode:'CPT', vendor:'Protea Hotels', bookingRef:'PH-2025-2012', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:3100, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Craig Dlamini', marketRate:2900, fraudFlag:false, notes:'2 nights Protea Hotels Cape Town' },
  { id:41, travelDate:'2025-01-21', bookingDate:'2025-01-06', travelerName:'Lisa Botha', travelerEmail:'lisa.botha@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'New York', originCode:'NYC', destination:'New York', destinationCode:'NYC', vendor:'Marriott', bookingRef:'MR-2025-1003', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:6500, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Michael Peters', marketRate:6000, fraudFlag:false, notes:'3 nights Marriott New York' },
  { id:42, travelDate:'2025-01-25', bookingDate:'2025-01-10', travelerName:'Ravi Patel', travelerEmail:'ravi.patel@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Durban', originCode:'DUR', destination:'Durban', destinationCode:'DUR', vendor:'City Lodge', bookingRef:'CL-2025-2101', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:1900, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Lebo Khumalo', marketRate:1800, fraudFlag:false, notes:'1 night City Lodge Durban' },
  // ── JAN 2025 – Car ──────────────────────────────────────────────────────────
  { id:43, travelDate:'2025-01-09', bookingDate:'2024-12-20', travelerName:'Nomsa Sithole', travelerEmail:'nomsa.sithole@acmecorp.com', department:'Operations', costCentre:'CC-OPS-004', origin:'Cape Town', originCode:'CPT', destination:'Cape Town', destinationCode:'CPT', vendor:'Avis', bookingRef:'AV-2025-3001', ticketNumber:'', classOfTravel:'Standard', category:'Car', totalCost:1800, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Craig Dlamini', marketRate:1600, fraudFlag:false, notes:'2 days car rental Cape Town' },
  { id:44, travelDate:'2025-01-25', bookingDate:'2025-01-10', travelerName:'Ravi Patel', travelerEmail:'ravi.patel@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Durban', originCode:'DUR', destination:'Durban', destinationCode:'DUR', vendor:'Budget', bookingRef:'BG-2025-3018', ticketNumber:'', classOfTravel:'Standard', category:'Car', totalCost:900, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Lebo Khumalo', marketRate:850, fraudFlag:false, notes:'1 day car rental Durban' },
  // ── FEB 2025 – Air ──────────────────────────────────────────────────────────
  { id:45, travelDate:'2025-02-03', bookingDate:'2025-01-20', travelerName:'Sarah Johnson', travelerEmail:'sarah.johnson@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Johannesburg', originCode:'JNB', destination:'Singapore', destinationCode:'SIN', vendor:'South African Airways', bookingRef:'SAA-2025-0078', ticketNumber:'SA082937451', classOfTravel:'Economy', category:'Air', totalCost:19200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Michael Peters', marketRate:18200, fraudFlag:false, notes:'' },
  { id:46, travelDate:'2025-02-07', bookingDate:'2025-02-06', travelerName:'Michael Peters', travelerEmail:'michael.peters@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'FlySafair', bookingRef:'FSA-2025-0089', ticketNumber:'FS039827461', classOfTravel:'Economy', category:'Air', totalCost:4800, currency:'ZAR', policyStatus:'Violation', approvedBy:'', marketRate:3500, fraudFlag:false, notes:'Day-before booking — missed advance booking policy' },
  { id:47, travelDate:'2025-02-10', bookingDate:'2025-01-28', travelerName:'Lebo Khumalo', travelerEmail:'lebo.khumalo@acmecorp.com', department:'Engineering', costCentre:'CC-ENG-002', origin:'Johannesburg', originCode:'JNB', destination:'Dubai', destinationCode:'DXB', vendor:'Emirates', bookingRef:'EK-2025-0112', ticketNumber:'EK0832947561', classOfTravel:'Economy', category:'Air', totalCost:13500, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Priya Naidoo', marketRate:12400, fraudFlag:false, notes:'' },
  // ── MAR 2025 – Air ──────────────────────────────────────────────────────────
  { id:48, travelDate:'2025-03-05', bookingDate:'2025-02-18', travelerName:'James van der Merwe', travelerEmail:'james.vdm@acmecorp.com', department:'Marketing', costCentre:'CC-MKT-003', origin:'Cape Town', originCode:'CPT', destination:'Johannesburg', destinationCode:'JNB', vendor:'South African Airways', bookingRef:'SAA-2025-0091', ticketNumber:'SA092837651', classOfTravel:'Economy', category:'Air', totalCost:4200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Zanele Mokoena', marketRate:3900, fraudFlag:false, notes:'' },
  { id:49, travelDate:'2025-03-10', bookingDate:'2025-02-20', travelerName:'Sarah Johnson', travelerEmail:'sarah.johnson@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Johannesburg', originCode:'JNB', destination:'Cape Town', destinationCode:'CPT', vendor:'South African Airways', bookingRef:'SAA-2025-0095', ticketNumber:'SA083456989', classOfTravel:'Economy', category:'Air', totalCost:4200, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Michael Peters', marketRate:3800, fraudFlag:true, notes:'Possible duplicate — same route/amount as SAA-2024-0001 (Oct 2024)' },
  // ── MAR 2025 – Hotel ────────────────────────────────────────────────────────
  { id:50, travelDate:'2025-03-15', bookingDate:'2025-01-20', travelerName:'Sarah Johnson', travelerEmail:'sarah.johnson@acmecorp.com', department:'Sales', costCentre:'CC-SALES-001', origin:'Singapore', originCode:'SIN', destination:'Singapore', destinationCode:'SIN', vendor:'Marriott', bookingRef:'MR-2025-1089', ticketNumber:'', classOfTravel:'Standard', category:'Hotel', totalCost:4800, currency:'ZAR', policyStatus:'Compliant', approvedBy:'Michael Peters', marketRate:4400, fraudFlag:false, notes:'2 nights Marriott Singapore' },
]

// ── helpers ────────────────────────────────────────────────────────────────────
function monthLabel(yyyymm) {
  const [y, m] = yyyymm.split('-')
  return new Date(+y, +m - 1).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' })
}

// ── computeStats ───────────────────────────────────────────────────────────────
export function computeStats(records) {
  if (!records?.length) return null

  const totalSpend     = records.reduce((s, r) => s + (r.totalCost || 0), 0)
  const totalTrips     = records.length
  const avgCostPerTrip = totalSpend / totalTrips

  // date range
  const dates = records.map(r => r.travelDate).filter(Boolean).sort()
  const minDate = dates[0]
  const maxDate = dates[dates.length - 1]
  const fmt = d => new Date(d).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' })
  const dateRange = minDate ? `${fmt(minDate)} – ${fmt(maxDate)}` : ''

  // by category
  const byCategory = {}
  records.forEach(r => { byCategory[r.category] = (byCategory[r.category] || 0) + r.totalCost })

  // by department
  const byDepartment = {}
  records.forEach(r => { byDepartment[r.department] = (byDepartment[r.department] || 0) + r.totalCost })

  // by vendor
  const byVendor = {}
  records.forEach(r => { byVendor[r.vendor] = (byVendor[r.vendor] || 0) + r.totalCost })

  // monthly spend
  const byMonth = {}
  records.forEach(r => {
    const m = r.travelDate?.slice(0, 7)
    if (m) byMonth[m] = (byMonth[m] || 0) + r.totalCost
  })
  const monthlySpend = Object.entries(byMonth)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([m, amount]) => ({ month: monthLabel(m), key: m, amount: Math.round(amount) }))

  // monthly trips count (used in PDF)
  const monthlyTrips = {}
  records.forEach(r => {
    const m = r.travelDate?.slice(0, 7)
    if (m) monthlyTrips[m] = (monthlyTrips[m] || 0) + 1
  })

  // top routes (Air only)
  const routeMap = {}
  records.filter(r => r.category === 'Air').forEach(r => {
    const key = `${r.originCode}→${r.destinationCode}`
    if (!routeMap[key]) routeMap[key] = { route: key, count: 0, spend: 0 }
    routeMap[key].count++
    routeMap[key].spend += r.totalCost
  })
  const topRoutes = Object.values(routeMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  // top travelers
  const travMap = {}
  records.forEach(r => {
    if (!travMap[r.travelerName]) travMap[r.travelerName] = { name: r.travelerName, department: r.department, amount: 0, trips: 0 }
    travMap[r.travelerName].amount += r.totalCost
    travMap[r.travelerName].trips++
  })
  const topTravelers = Object.values(travMap)
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5)

  // compliance
  const violations     = records.filter(r => r.policyStatus === 'Violation')
  const compliant      = records.filter(r => r.policyStatus === 'Compliant')
  const complianceRate = Math.round((compliant.length / totalTrips) * 100)
  const violationCount = violations.length

  // fraud
  const fraudFlags     = records.filter(r => r.fraudFlag)
  const fraudFlagCount = fraudFlags.length

  // fare discrepancies (>15% over market)
  const fareDiscrepancies = records.filter(r => r.marketRate && r.totalCost > r.marketRate * 1.15)
  const potentialSavings  = fareDiscrepancies.reduce((s, r) => s + (r.totalCost - r.marketRate), 0)

  // chart arrays
  const categoryBreakdown = Object.entries(byCategory)
    .map(([name, value]) => ({ name, value: Math.round(value) }))
    .sort((a, b) => b.value - a.value)

  const departmentBreakdown = Object.entries(byDepartment)
    .map(([dept, amount]) => ({ dept, amount: Math.round(amount) }))
    .sort((a, b) => b.amount - a.amount)

  // unique counts
  const uniqueTravelers = new Set(records.map(r => r.travelerName)).size
  const uniqueVendors   = new Set(records.map(r => r.vendor)).size

  return {
    totalSpend, totalTrips, avgCostPerTrip, dateRange,
    complianceRate, violationCount, fraudFlagCount,
    violations, fraudFlags, fareDiscrepancies, potentialSavings,
    byCategory, byDepartment, byVendor, byMonth, monthlyTrips,
    monthlySpend, categoryBreakdown, departmentBreakdown,
    topRoutes, topTravelers,
    uniqueTravelers, uniqueVendors,
    records,
  }
}

export const demoStats = computeStats(demoRecords)
