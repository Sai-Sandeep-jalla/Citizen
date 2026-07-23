import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Calendar,
  Clock,
  Briefcase,
  LogOut,
  Crown,
  Search,
  ChevronDown,
  X,
  Check,
  Landmark
} from 'lucide-react';
import { DISTRICTS, DEPARTMENTS, STATES } from '../data/mockData';
import adminLogo from '../assets/admin_logo.png';

export default function Header({ 
  selectedState = 'AP',
  setSelectedState,
  selectedDistrict, 
  setSelectedDistrict, 
  activeDepartment, 
  setActiveDepartment,
  currentAdmin,
  complaints,
  onLogout
}) {
  const [districtDropdownOpen, setDistrictDropdownOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState('');
  const districtRef = useRef(null);
  const searchInputRef = useRef(null);

  const [stateDropdownOpen, setStateDropdownOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState('');
  const stateRef = useRef(null);
  const stateSearchInputRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (districtRef.current && !districtRef.current.contains(event.target)) {
        setDistrictDropdownOpen(false);
      }
      if (stateRef.current && !stateRef.current.contains(event.target)) {
        setStateDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (districtDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [districtDropdownOpen]);

  useEffect(() => {
    if (stateDropdownOpen && stateSearchInputRef.current) {
      stateSearchInputRef.current.focus();
    }
  }, [stateDropdownOpen]);

  const availableDistricts = selectedState === 'ALL' 
    ? DISTRICTS 
    : DISTRICTS.filter(d => d.id === 'ALL' || d.stateId === selectedState);

  const filteredDistricts = availableDistricts.filter(d => 
    d.name.toLowerCase().includes(districtSearch.toLowerCase())
  );

  const filteredStates = STATES.filter(s => 
    s.name.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const selectedDistrictName = DISTRICTS.find(d => d.id === selectedDistrict)?.name || 'All Districts';
  const selectedStateName = STATES.find(s => s.id === selectedState)?.name || 'Andhra Pradesh';

  const filteredList = complaints.filter(c => {
    const matchDistrict = selectedDistrict === 'ALL' || c.district === selectedDistrict;
    const matchDept = activeDepartment === 'ALL' || c.department === activeDepartment;
    return matchDistrict && matchDept;
  });

  const todayCount = filteredList.filter(c => c.registeredToday).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-blue-100 shadow-sm shrink-0">
      {/* Top Admin Ribbon */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white px-4 py-1.5 text-xs flex flex-wrap justify-between items-center border-b border-orange-500/50">
        <div className="flex items-center space-x-3">
          <span className="bg-orange-500 text-white font-black px-2 py-0.5 rounded text-[10px] uppercase tracking-wider shadow-xs flex items-center space-x-1">
            <Crown className="w-3 h-3 inline" />
            <span>ADMIN PORTAL</span>
          </span>
          <span className="font-semibold text-blue-100 hidden sm:inline">
            Central Administrative Control & Department Escalation Dashboard
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          
          <div className="h-3 w-px bg-blue-800 hidden sm:block"></div>
          
          <div className="flex items-center space-x-1.5 text-emerald-300 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Central Admin Monitor Active</span>
          </div>
        </div>
      </div>

      {/* Main Admin Navigation Header */}
      <div className="px-4 lg:px-6 py-3 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white">
        
        {/* Brand Logo & Scope */}
        <div className="flex items-center space-x-3.5">
          <img 
            src={adminLogo} 
            alt="Admin Portal Emblem Logo" 
            className="w-11 h-11 rounded-xl object-cover shadow-md border-2 border-orange-400"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="font-black text-lg md:text-xl text-blue-950 tracking-tight">
                Admin Portal
              </h1>
            </div>
          </div>
        </div>

        {/* Dynamic Controls: District Region & Admin Badge */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Today Registered Highlight Widget */}
          <div className="hidden lg:flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-950 px-3 py-1.5 rounded-lg text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>Today: <strong className="text-orange-600 font-bold">{todayCount}</strong> Registered</span>
          </div>

          {/* Searchable State Region Context Dropdown */}
          <div className="relative" ref={stateRef}>
            <button
              type="button"
              onClick={() => setStateDropdownOpen(prev => !prev)}
              className="flex items-center space-x-2 bg-slate-50 border-2 border-blue-200 hover:border-orange-500 rounded-xl px-3 py-1.5 shadow-xs transition-all text-left focus:outline-none"
            >
              <Landmark className="w-4 h-4 text-orange-500 shrink-0" />
              <div className="flex flex-col pr-1">
                <span className="text-[9px] font-bold text-blue-800 uppercase tracking-wider leading-none">
                  State
                </span>
                <span className="text-xs font-extrabold text-blue-950 truncate max-w-[120px] sm:max-w-[150px] leading-tight">
                  {selectedStateName}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${stateDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {stateDropdownOpen && (
              <div className="absolute right-0 sm:left-0 mt-1.5 w-60 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Search Header */}
                <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center space-x-2">
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                  <input
                    ref={stateSearchInputRef}
                    type="text"
                    value={stateSearch}
                    onChange={(e) => setStateSearch(e.target.value)}
                    placeholder="Search state..."
                    className="w-full text-xs bg-transparent focus:outline-none font-medium text-slate-800 placeholder:text-slate-400"
                  />
                  {stateSearch && (
                    <button
                      onClick={() => setStateSearch('')}
                      className="text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* State Options List */}
                <div className="max-h-60 overflow-y-auto p-1 divide-y divide-slate-50">
                  {filteredStates.length > 0 ? (
                    filteredStates.map((st) => {
                      const isSelected = selectedState === st.id;
                      return (
                        <button
                          key={st.id}
                          type="button"
                          onClick={() => {
                            if (setSelectedState) setSelectedState(st.id);
                            setSelectedDistrict('ALL');
                            setStateDropdownOpen(false);
                            setStateSearch('');
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                            isSelected
                              ? 'bg-blue-50 text-blue-900 font-bold'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-blue-950'
                          }`}
                        >
                          <span className="truncate">{st.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-orange-500 ml-2 shrink-0" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-3 py-4 text-center text-xs text-slate-400 font-medium">
                      No state found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Searchable District Context Dropdown */}
          <div className="relative" ref={districtRef}>
            <button
              type="button"
              onClick={() => setDistrictDropdownOpen(prev => !prev)}
              className="flex items-center space-x-2 bg-slate-50 border-2 border-blue-200 hover:border-orange-500 rounded-xl px-3 py-1.5 shadow-xs transition-all text-left focus:outline-none"
            >
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <div className="flex flex-col pr-1">
                <span className="text-[9px] font-bold text-blue-800 uppercase tracking-wider leading-none">
                  District
                </span>
                <span className="text-xs font-extrabold text-blue-950 truncate max-w-[130px] sm:max-w-[170px] leading-tight">
                  {selectedDistrictName}
                </span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-slate-500 transition-transform ${districtDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {districtDropdownOpen && (
              <div className="absolute right-0 sm:left-0 mt-1.5 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
                {/* Search Header */}
                <div className="p-2 border-b border-slate-100 bg-slate-50 flex items-center space-x-2">
                  <Search className="w-3.5 h-3.5 text-slate-400 shrink-0 ml-1" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={districtSearch}
                    onChange={(e) => setDistrictSearch(e.target.value)}
                    placeholder="Search district..."
                    className="w-full text-xs bg-transparent focus:outline-none font-medium text-slate-800 placeholder:text-slate-400"
                  />
                  {districtSearch && (
                    <button
                      onClick={() => setDistrictSearch('')}
                      className="text-slate-400 hover:text-slate-600 p-0.5"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* District Options List */}
                <div className="max-h-60 overflow-y-auto p-1 divide-y divide-slate-50">
                  {filteredDistricts.length > 0 ? (
                    filteredDistricts.map((dist) => {
                      const isSelected = selectedDistrict === dist.id;
                      return (
                        <button
                          key={dist.id}
                          type="button"
                          onClick={() => {
                            setSelectedDistrict(dist.id);
                            setDistrictDropdownOpen(false);
                            setDistrictSearch('');
                          }}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors text-left ${
                            isSelected
                              ? 'bg-blue-50 text-blue-900 font-bold'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-blue-950'
                          }`}
                        >
                          <span className="truncate">{dist.name}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-orange-500 ml-2 shrink-0" />}
                        </button>
                      );
                    })
                  ) : (
                    <div className="px-3 py-4 text-center text-xs text-slate-400 font-medium">
                      No district found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Department Filter Dropdown */}
          <div className="flex items-center space-x-2 bg-slate-50 border-2 border-blue-200 focus-within:border-orange-500 rounded-xl px-3 py-1 shadow-xs transition-all">
            <Briefcase className="w-4 h-4 text-orange-500 shrink-0" />
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-blue-800 uppercase tracking-wider leading-none">
                Department
              </span>
              <select 
                value={activeDepartment}
                onChange={(e) => setActiveDepartment(e.target.value)}
                className="bg-transparent text-xs font-extrabold text-blue-950 focus:outline-none cursor-pointer pr-1"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Admin Profile & Logout */}
          <div className="flex items-center space-x-2 bg-white border border-slate-200 rounded-xl p-1 pr-1.5 shadow-xs">
            <img 
              src={currentAdmin.avatarUrl} 
              alt={currentAdmin.name} 
              className="w-8 h-8 rounded-lg object-cover border border-blue-400 shadow-xs"
            />
            <div className="hidden sm:block text-left pr-2">
              <div className="text-xs font-bold text-blue-950 leading-tight">
                {currentAdmin.name}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                {currentAdmin.badgeId}
              </div>
            </div>

            <button 
              onClick={onLogout}
              className="bg-slate-100 hover:bg-orange-50 text-slate-600 hover:text-orange-600 border border-slate-200 hover:border-orange-300 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
              title="Sign Out of Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5 text-orange-500" />
              <span className="hidden md:inline">Logout</span>
            </button>
          </div>

        </div>

      </div>
    </header>
  );
}
