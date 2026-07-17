import { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Dropdown, TextArea } from '../components/FormControls';
import { Loader } from '../components/Loader';
import { Modal } from '../components/Modal';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Star, CheckCircle2, Award, Heart } from 'lucide-react';

export const Feedback = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const [loading, setLoading] = useState(true);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState('');
  
  // Rating states
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [recommend, setRecommend] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [suggestion, setSuggestion] = useState('');

  // Submit states
  const [submitLoading, setSubmitLoading] = useState(false);
  const [thankYouOpen, setThankYouOpen] = useState(false);

  const loadData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      // Load complaints and filter by Resolved / Closed for this user
      const fullList = await api.getComplaints({ citizenId: user.id });
      // Resolved complaints which DO NOT have a feedbackId yet
      const feedbackEligible = fullList.filter(
        c => c.status === 'RESOLVED' && !c.feedbackId
      );
      setResolvedComplaints(feedbackEligible);

      // Load all previous feedbacks
      const fbList = await api.getFeedback();
      // Filter feedbacks submitted by this user (or name for dummy matching)
      const userFbs = fbList.filter(f => f.citizenName === user.name || f.citizenName === 'Anonymous Citizen');
      setFeedbacks(userFbs);
    } catch {
      toast.error('Failed to load feedback resources.');
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 0);
    return () => clearTimeout(timer);
  }, [loadData]);

  const handleStarClick = (selectedStar) => {
    setRating(selectedStar);
  };

  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!selectedComplaintId) {
      toast.error('Please select a resolved complaint ticket.');
      return;
    }
    if (rating === 0) {
      toast.error('Please provide a star rating.');
      return;
    }

    setSubmitLoading(true);
    try {
      const selectedComp = resolvedComplaints.find(c => c.id === selectedComplaintId);
      
      const feedbackPayload = {
        complaintId: selectedComplaintId,
        complaintTitle: selectedComp.title,
        rating,
        reviewText,
        suggestion,
        recommend,
        citizenName: selectedComp.anonymous ? 'Anonymous Citizen' : user.name
      };

      await api.submitFeedback(feedbackPayload);
      setThankYouOpen(true);
      toast.success('Thank you for your valuable feedback!');
    } catch {
      toast.error('Failed to submit feedback.');
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleThankYouClose = () => {
    setThankYouOpen(false);
    setSelectedComplaintId('');
    setRating(0);
    setReviewText('');
    setSuggestion('');
    setRecommend(true);
    loadData();
  };

  // Stats calculators
  const averageRating = feedbacks.length
    ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
    : '0.0';

  if (loading) return <Loader message="Analyzing user satisfaction metrics..." />;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 m-0">{t('feedback')}</h1>
        <p className="text-xs text-gray-500 mt-1">
          Share your resolution experience. Feedback is only enabled for tickets resolved by department officers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Columns: Feedback Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card hoverEffect={false}>
            {resolvedComplaints.length === 0 ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-12 h-12 rounded-full bg-yellow-50 text-yellow-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-sm font-bold text-gray-700">No Resolved Complaints Available</h3>
                <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                  You can submit feedback once your active tickets have been reviewed and marked as RESOLVED by the executive department.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-5">
                <h3 className="text-xs font-bold text-primary uppercase tracking-wider border-b border-gray-100 pb-1.5">
                  Share Your Experience
                </h3>

                {/* Complaint Selector */}
                <Dropdown
                  label="Select Resolved Complaint"
                  options={resolvedComplaints.map(c => ({ value: c.id, label: `${c.id} - ${c.title}` }))}
                  value={selectedComplaintId}
                  onChange={(e) => setSelectedComplaintId(e.target.value)}
                  emptyOption="Select Complaint Ticket"
                  required
                />

                {/* Star rating selector */}
                <div className="space-y-1.5">
                  <label className="block text-sm font-semibold text-gray-700">How would you rate the resolution?</label>
                  <div className="flex items-center space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform duration-100 active:scale-95 focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            (hoverRating || rating) >= star
                              ? 'text-yellow-400 fill-yellow-400 scale-105'
                              : 'text-gray-200 dark:text-gray-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-gray-400 ml-2">
                      {rating > 0 ? `${rating} of 5 Stars` : 'Rate stars'}
                    </span>
                  </div>
                </div>

                <TextArea
                  label="Describe resolution quality"
                  placeholder="Tell us what you liked or what could be improved regarding the officer's work..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows={3}
                  required
                />

                <TextArea
                  label="Any suggestions for our Citizen Portal?"
                  placeholder="Suggestions to improve the complaint registration process..."
                  value={suggestion}
                  onChange={(e) => setSuggestion(e.target.value)}
                  rows={2}
                />

                {/* Recommend Toggle */}
                <div className="flex items-center space-x-2 bg-gray-50/50 p-3 rounded-lg border border-gray-150">
                  <input
                    type="checkbox"
                    id="recommend"
                    checked={recommend}
                    onChange={(e) => setRecommend(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary h-4.5 w-4.5 cursor-pointer"
                  />
                  <label htmlFor="recommend" className="text-xs font-bold text-gray-750 cursor-pointer select-none">
                    Would you recommend this grievance tracking portal to other citizens?
                  </label>
                </div>

                <div className="flex justify-end pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={submitLoading}
                    icon={Award}
                  >
                    Submit Feedback
                  </Button>
                </div>

              </form>
            )}
          </Card>

          {/* Feedback History stream */}
          <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider">Your Submitted Feedbacks</h3>
            <div className="space-y-4 divide-y divide-gray-100 dark:divide-gray-700">
              {feedbacks.length === 0 ? (
                <p className="text-xs text-gray-400 py-4 text-center">No feedback submitted yet.</p>
              ) : (
                feedbacks.map((fb, idx) => (
                  <div key={fb.id} className={`pt-4 ${idx === 0 ? 'pt-0' : ''} space-y-2`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-xs font-bold text-gray-800 dark:text-white truncate max-w-sm">{fb.complaintTitle}</h4>
                        <span className="text-[10px] text-gray-400">Ref: {fb.complaintId}</span>
                      </div>
                      <div className="flex items-center space-x-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed bg-gray-50/50 p-2.5 rounded-lg">
                      {fb.reviewText}
                    </p>
                    {fb.suggestion && (
                      <p className="text-[11px] text-gray-400">
                        <span className="font-semibold text-gray-500">Suggestion:</span> {fb.suggestion}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Column: Scorecard metrics */}
        <div className="space-y-6">
          <Card hoverEffect={false} className="text-center py-6 space-y-3.5">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Performance Index</h3>
            
            <div className="py-4">
              <span className="text-5xl font-extrabold text-primary">{averageRating}</span>
              <span className="text-lg text-gray-400 font-medium">/ 5.0</span>
            </div>
            
            <div className="flex justify-center space-x-1.5">
              {Array.from({ length: 5 }).map((_, i) => {
                const isFull = i < Math.floor(parseFloat(averageRating));
                return (
                  <Star 
                    key={i} 
                    className={`w-6 h-6 ${isFull ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 dark:text-gray-700'}`} 
                  />
                );
              })}
            </div>

            <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
              This score indicates the satisfaction rate of citizens based on recent officers resolution speed, politeness, and quality.
            </p>
          </Card>

          <Card hoverEffect={false} className="bg-lightgreen/30 border-primary/20 space-y-4">
            <div className="flex items-center space-x-2 border-b border-primary/10 pb-2">
              <Heart className="w-5 h-5 text-primary fill-primary/15" />
              <h4 className="text-xs font-bold text-primary dark:text-lightgreen uppercase tracking-wider">Why Feedbacks Matters?</h4>
            </div>
            <p className="text-xs text-gray-750 dark:text-gray-300 leading-relaxed">
              Every feedback goes directly to our Quality Assurance cell. Tickets that receive rating 1 or 2 stars are automatically reassigned for audit checks by district nodal executives.
            </p>
          </Card>
        </div>

      </div>

      {/* Thank You Animation Modal */}
      <Modal
        isOpen={thankYouOpen}
        onClose={handleThankYouClose}
        title="Feedback Submitted Successfully"
        size="sm"
      >
        <div className="text-center py-6 space-y-4">
          <motion.div
            initial={{ scale: 0.3, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-sm"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-gray-900">Thank You for Your Review!</h4>
            <p className="text-xs text-gray-500">
              Your feedback has been logged in our department quality database. This case is now marked as CLOSED.
            </p>
          </div>

          <Button
            variant="primary"
            onClick={handleThankYouClose}
            className="w-full mt-2"
          >
            Done
          </Button>
        </div>
      </Modal>

    </div>
  );
};
export default Feedback;
