import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import { Input, TextArea, Dropdown } from '../components/FormControls';
import { Button } from '../components/Button';
import { FileUpload } from '../components/FileUpload';
import { Card } from '../components/Card';
import { Modal } from '../components/Modal';
import { COMPLAINT_CATEGORIES, INDIAN_STATES, STATES_AND_DISTRICTS } from '../constants';
import toast from 'react-hot-toast';
import { Navigation, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ComplaintRegistration = () => {
  const { user } = useAuth();
  const { t: translate } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [attachments, setAttachments] = useState([]);
  
  // Success popup modal
  const [successOpen, setSuccessOpen] = useState(false);
  const [generatedTicketId, setGeneratedTicketId] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      anonymous: false,
      priority: 'MEDIUM',
      gps: '',
      state: user?.state || '',
      district: user?.district || '',
      pincode: user?.pincode || ''
    }
  });

  const watchedState = watch('state');
  const anonymousToggle = watch('anonymous');

  const districts = watchedState ? STATES_AND_DISTRICTS[watchedState] || [] : [];

  const handleFetchGps = () => {
    setGpsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          setValue('gps', `${lat}, ${lng}`);
          toast.success('GPS coordinates fetched successfully!');
          setGpsLoading(false);
        },
        (error) => {
          // Fallback to random dummy coordinate near Delhi/national center
          console.warn('Geolocation error, falling back to mock GPS: ', error);
          const mockLat = (28.6139 + (Math.random() - 0.5) * 0.05).toFixed(6);
          const mockLng = (77.2090 + (Math.random() - 0.5) * 0.05).toFixed(6);
          setValue('gps', `${mockLat}, ${mockLng}`);
          toast.success('Could not access device location. Using mock location coordinates.');
          setGpsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000 }
      );
    } else {
      toast.error('Geolocation is not supported by your browser.');
      setGpsLoading(false);
    }
  };

  const handleAttachmentsChange = (uploadedFiles) => {
    setAttachments(uploadedFiles);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const complaintData = {
        title: data.title,
        category: data.category,
        description: data.description,
        priority: data.priority,
        anonymous: data.anonymous,
        gps: data.gps,
        address: data.address,
        landmark: data.landmark,
        district: data.district,
        state: data.state,
        pincode: data.pincode,
        // Mocking attachments array by filename
        attachments: attachments.map(f => ({
          name: f.name,
          type: f.type,
          url: f.type.startsWith('image/') 
            ? URL.createObjectURL(f) 
            : 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'
        }))
      };

      const result = await api.createComplaint(complaintData, user);
      setGeneratedTicketId(result.id);
      setSuccessOpen(true);
      toast.success('Complaint registered successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to submit complaint.');
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setSuccessOpen(false);
    reset();
    setAttachments([]);
    navigate('/complaint/history');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 m-0">
          {translate('registerComplaint')}
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Submit your grievance. Our team will review the issue and allocate it to the concerned department officer.
        </p>
      </div>

      <Card hoverEffect={false}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Section 1: Complaint Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primary dark:text-lightgreen uppercase tracking-wider border-b border-gray-100 pb-1">
              Grievance Details
            </h3>

            <Input
              label={translate('complaintTitle')}
              name="title"
              placeholder="Summary of the issue (e.g. Water leak in street 4)"
              error={errors.title}
              {...register('title', { 
                required: 'Complaint title is required',
                minLength: { value: 10, message: 'Title must be at least 10 characters long' }
              })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Dropdown
                label={translate('complaintCategory')}
                name="category"
                options={COMPLAINT_CATEGORIES.map(c => ({ value: c.id, label: translate(c.id) || c.label }))}
                emptyOption="Select Category"
                error={errors.category}
                {...register('category', { required: 'Category is required' })}
              />

              <Dropdown
                label="Priority Level"
                name="priority"
                options={[
                  { value: 'LOW', label: 'Low (General Inquiry/Minor repair)' },
                  { value: 'MEDIUM', label: 'Medium (Standard maintenance)' },
                  { value: 'HIGH', label: 'High (Immediate attention required)' },
                  { value: 'CRITICAL', label: 'Critical (Safety hazards/Total outage)' }
                ]}
                error={errors.priority}
                {...register('priority', { required: 'Priority is required' })}
              />
            </div>

            <TextArea
              label={translate('complaintDesc')}
              name="description"
              placeholder="Provide a detailed description of the grievance (dates, times, context, impact)..."
              error={errors.description}
              {...register('description', { 
                required: 'Description is required',
                minLength: { value: 30, message: 'Please describe the issue in at least 30 characters' }
              })}
            />
          </div>

          {/* Section 2: Location Details */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primary dark:text-lightgreen uppercase tracking-wider border-b border-gray-100 pb-1">
              Location details
            </h3>

            {/* GPS coordinates fetch row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
              <div className="sm:col-span-2">
                <Input
                  label="GPS Coordinates (Coordinates)"
                  name="gps"
                  placeholder="Latitude, Longitude (optional)"
                  error={errors.gps}
                  {...register('gps')}
                />
              </div>
              <Button
                variant="outline"
                onClick={handleFetchGps}
                isLoading={gpsLoading}
                icon={Navigation}
                className="w-full h-[38px] border-dashed border-primary text-primary font-semibold text-xs hover:bg-lightgreen/20"
              >
                Fetch Geolocation
              </Button>
            </div>

            <Input
              label={translate('address')}
              name="address"
              placeholder="House no, Street name, Sector/Block"
              error={errors.address}
              {...register('address', { required: 'Address is required' })}
            />

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <Input
                  label={translate('landmark')}
                  name="landmark"
                  placeholder="Near park, temple, shop, etc."
                  error={errors.landmark}
                  {...register('landmark')}
                />
              </div>
              <Dropdown
                label={translate('state')}
                name="state"
                options={INDIAN_STATES.map(s => ({ value: s, label: s }))}
                emptyOption="Select State"
                error={errors.state}
                {...register('state', { required: 'State is required' })}
              />
              <Dropdown
                label={translate('district')}
                name="district"
                options={districts.map(d => ({ value: d, label: d }))}
                emptyOption="Select District"
                disabled={!watchedState}
                error={errors.district}
                {...register('district', { required: 'District is required' })}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <Input
                  label={translate('pincode')}
                  name="pincode"
                  placeholder="6 digits"
                  error={errors.pincode}
                  {...register('pincode', { 
                    required: 'Pincode is required',
                    pattern: { value: /^[0-9]{6}$/, message: 'Must be 6 digits' }
                  })}
                />
              </div>
            </div>
          </div>

          {/* Section 3: File Uploads */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-primary dark:text-lightgreen uppercase tracking-wider border-b border-gray-100 pb-1">
              Supporting documents
            </h3>
            
            <FileUpload
              onChange={handleAttachmentsChange}
              label="Upload Images, Videos, or Documents (Max 10MB)"
            />
          </div>

          {/* Anonymous toggle option */}
          <div className="bg-lightgreen/30 dark:bg-gray-700/50 p-4 rounded-xl border border-primary/10 flex items-start space-x-3">
            <input
              type="checkbox"
              id="anonymous"
              className="mt-1 rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5 cursor-pointer"
              {...register('anonymous')}
            />
            <div className="flex-1">
              <label htmlFor="anonymous" className="block text-sm font-bold text-gray-800 dark:text-gray-250 cursor-pointer">
                {translate('anonymousLabel')}
              </label>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                {translate('anonymousDesc')}
              </p>
            </div>
            {anonymousToggle && (
              <ShieldAlert className="w-5 h-5 text-accent animate-pulse" />
            )}
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => {
                reset();
                setAttachments([]);
              }}
              disabled={loading}
            >
              {translate('reset')}
            </Button>
            
            <Button
              variant="primary"
              type="submit"
              isLoading={loading}
            >
              Submit Grievance / शिकायत सबमिट करें
            </Button>
          </div>

        </form>
      </Card>

      {/* Success Modal Popup */}
      <Modal
        isOpen={successOpen}
        onClose={handleSuccessClose}
        title="Grievance Registered Successfully"
        size="md"
        closeOnOverlayClick={false}
      >
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          
          <div className="space-y-1.5">
            <h4 className="text-lg font-bold text-gray-900">Your Complaint Has Been Registered</h4>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Please copy the generated Ticket ID below. You can use it to track live resolution progress.
            </p>
          </div>

          <div className="bg-lightgreen border border-primary/20 p-3.5 rounded-xl font-mono text-lg font-bold text-primary max-w-xs mx-auto shadow-inner select-all">
            {generatedTicketId}
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={handleSuccessClose}
            >
              Go to History
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setSuccessOpen(false);
                reset();
                setAttachments([]);
                navigate(`/complaint/track?ticketId=${generatedTicketId}`);
              }}
            >
              Track Live Progress
            </Button>
          </div>
        </div>
      </Modal>

    </div>
  );
};
export default ComplaintRegistration;
