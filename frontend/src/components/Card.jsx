
export const Card = ({
  children,
  className = '',
  hoverEffect = true,
  onClick,
  ...props
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white/95 backdrop-blur-md rounded-3xl border border-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6
        ${hoverEffect ? 'hover:shadow-[0_8px_30px_rgb(11,30,71,0.08)] hover:-translate-y-1 transition-all duration-300' : 'transition-all duration-300'}
        ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  colorClass = 'bg-primary/10 text-primary',
  trend = null,
  onClick,
  className = ''
}) => {
  return (
    <Card onClick={onClick} className={`flex items-center justify-between ${className}`}>
      <div className="space-y-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span>
        <h3 className="text-2xl font-bold text-gray-950">{value}</h3>
        {trend && (
          <p className="text-xs text-gray-500">
            <span className={trend.type === 'positive' ? 'text-green-600 font-medium' : 'text-red-500 font-medium'}>
              {trend.value}
            </span>{' '}
            {trend.text}
          </p>
        )}
      </div>
      <div className={`p-3.5 rounded-xl ${colorClass}`}>
        <Icon className="w-6 h-6" />
      </div>
    </Card>
  );
};
