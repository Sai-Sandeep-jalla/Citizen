/**
 * @file Stepper.jsx
 * @description Stepper component for guiding users through multi-step forms or processes.
 */

import { Fragment } from 'react';
import { Check, AlertCircle, Clock, Send, Hammer, CheckCircle2, Lock } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

const STEPS = [
  { status: 'PENDING', label: 'Pending', icon: Clock, desc: 'Grievance Registered' },
  { status: 'ASSIGNED', label: 'Assigned', icon: Send, desc: 'Assigned to Dept/Officer' },
  { status: 'IN_PROGRESS', label: 'In Progress', icon: Hammer, desc: 'Work under execution' },
  { status: 'RESOLVED', label: 'Resolved', icon: CheckCircle2, desc: 'Grievance resolved' },
  { status: 'CLOSED', label: 'Closed', icon: Lock, desc: 'Feedback submitted' }
];

export const Stepper = ({ currentStatus }) => {
  const { t } = useLanguage();

  const translateLabel = (step) => {
    const statusKeyMap = {
      'PENDING': 'pending',
      'ASSIGNED': 'assigned',
      'IN_PROGRESS': 'inProgress',
      'RESOLVED': 'resolved',
      'CLOSED': 'closed',
      'REJECTED': 'rejected'
    };
    return t(statusKeyMap[step.status]) || step.label;
  };

  const translateDesc = (step) => {
    const descKeyMap = {
      'PENDING': 'grievanceRegistered',
      'ASSIGNED': 'assignedToOfficer',
      'IN_PROGRESS': 'workUnderExecution',
      'RESOLVED': 'grievanceResolvedDesc',
      'CLOSED': 'feedbackSubmitted',
      'REJECTED': 'rejectedByDept'
    };
    return t(descKeyMap[step.status]) || step.desc;
  };

  // If rejected, replace final step or modify steps
  let activeSteps = [...STEPS];
  if (currentStatus === 'REJECTED') {
    activeSteps = [
      { status: 'PENDING', label: 'Pending', icon: Clock, desc: 'Grievance Registered' },
      { status: 'REJECTED', label: 'Rejected', icon: AlertCircle, desc: 'Rejected by Dept' }
    ];
  }

  // Find current step index
  const currentIndex = activeSteps.findIndex(s => s.status === currentStatus);
  // Fallback if closed is matching resolved
  const displayIndex = currentIndex === -1 && currentStatus === 'CLOSED' ? 4 : currentIndex;

  return (
    <div className="w-full py-6">
      {/* Mobile view: vertical list */}
      <div className="md:hidden flex flex-col space-y-4">
        {activeSteps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = currentStatus === 'CLOSED' || index < displayIndex;
          const isActive = index === displayIndex;
          
          return (
            <div key={step.status} className="flex items-start space-x-3">
              <div className="flex flex-col items-center">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isCompleted ? 'bg-primary border-primary text-white' : ''}
                  ${isActive ? 'border-primary text-primary bg-lightgreen font-bold scale-110 pulse-ring-green' : ''}
                  ${!isCompleted && !isActive ? 'border-gray-200 text-gray-400 bg-white' : ''}
                  ${step.status === 'REJECTED' ? 'bg-red-500 border-red-500 text-white' : ''}
                `}>
                  {isCompleted && step.status !== 'REJECTED' ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                {index < activeSteps.length - 1 && (
                  <div className={`w-0.5 h-10 my-1 ${isCompleted ? 'bg-primary' : 'bg-gray-100'}`}></div>
                )}
              </div>
              <div className="pt-0.5">
                <p className={`text-sm font-semibold ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                  {translateLabel(step)}
                </p>
                <p className="text-xs text-gray-500">{translateDesc(step)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop view: horizontal line */}
      <div className="hidden md:block">
        <div className="flex items-center w-full">
          {activeSteps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentStatus === 'CLOSED' || index < displayIndex;
            const isActive = index === displayIndex;
            
            return (
              <Fragment key={step.status}>
                {/* Step Node */}
                <div className="flex flex-col items-center flex-1 relative">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10
                    ${isCompleted ? 'bg-primary border-primary text-white' : ''}
                    ${isActive ? 'border-primary text-primary bg-lightgreen font-bold scale-110 pulse-ring-green' : ''}
                    ${!isCompleted && !isActive ? 'border-gray-200 text-gray-400 bg-white' : ''}
                    ${step.status === 'REJECTED' ? 'bg-red-500 border-red-500 text-white' : ''}
                  `}>
                    {isCompleted && step.status !== 'REJECTED' ? (
                      <Check className="w-5 h-5 stroke-[3]" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  
                  {/* Labels */}
                  <div className="text-center mt-3 absolute -bottom-14 w-32">
                    <p className={`text-xs font-semibold ${isActive ? 'text-primary font-bold' : 'text-gray-700'}`}>
                      {translateLabel(step)}
                    </p>
                    <p className="text-[10px] text-gray-400 leading-tight mt-0.5">{translateDesc(step)}</p>
                  </div>
                </div>

                {/* Connector Line */}
                {index < activeSteps.length - 1 && (
                  <div className="flex-auto h-0.5 relative mx-2">
                    <div className="absolute inset-0 bg-gray-100 rounded"></div>
                    <div 
                      className="absolute inset-y-0 left-0 bg-primary rounded transition-all duration-500"
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    ></div>
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
        {/* Extra spacer for the absolute positioned step descriptions */}
        <div className="h-14"></div>
      </div>
    </div>
  );
};

