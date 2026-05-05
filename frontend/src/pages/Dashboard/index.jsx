import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../api/axios';
import { 
  BookOpen, 
  Target, 
  Flame, 
  ChevronRight, 
  Sparkles, 
  TrendingUp, 
  CheckCircle2,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await api.get('/analytics');
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
    </div>
  );

  if (!data) return <div className="text-center py-20">Error loading dashboard data.</div>;

  return (
    <div className="space-y-10 pb-20 pt-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h1 className="text-4xl font-bold text-dark mb-2">Good Morning, {user?.username || 'Learner'}</h1>
          <p className="text-muted font-medium">You've mastered {data.masteredThisWeek} new concepts this week. Keep the flow.</p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
           <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-lg">🎓</span>
           </div>
           <div>
              <div className="text-xs font-bold text-muted uppercase tracking-wider">Level 14 Polyglot</div>
              <div className="text-sm font-bold text-dark">2,450 Total XP</div>
           </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          icon={<BookOpen className="text-primary" size={20} />}
          label="Total Studied"
          value={data.totalStudied.toLocaleString()}
          subtext="Cards reviewed this month"
          trend="+12% vs last week"
          iconBg="bg-pink-50"
        />
        <StatCard 
          icon={<Target className="text-accent" size={20} />}
          label="Accuracy %"
          value={`${data.accuracy}%`}
          subtext="Precision score"
          progress={data.accuracy}
          iconBg="bg-accent/10"
        />
        <StatCard 
          icon={<Flame className="text-orange-500" size={20} />}
          label="Current Streak"
          value={data.streak}
          subtext={`Personal best: 24 days`}
          extraIcon="🔥"
          iconBg="bg-orange-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Study Progression */}
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
           <div className="flex justify-between items-center mb-10">
              <h3 className="text-xl font-bold text-dark">Study Progression</h3>
              <div className="flex gap-2 bg-secondary/50 p-1 rounded-full">
                 <button className="px-4 py-1.5 rounded-full text-xs font-bold bg-primary text-white shadow-sm">Daily</button>
                 <button className="px-4 py-1.5 rounded-full text-xs font-bold text-muted hover:text-dark">Weekly</button>
              </div>
           </div>
           <div className="flex items-end justify-between h-64 gap-2">
              {data.progression.map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4">
                   <div 
                     className={`w-full rounded-t-xl transition-all duration-500 ${i === data.progression.length - 1 ? 'bg-primary' : 'bg-secondary'}`}
                     style={{ height: `${(item.count / 100) * 100}%` }}
                   ></div>
                   <span className="text-xs font-bold text-muted uppercase tracking-tighter">{item.day}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Performance by Subject */}
        <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm flex flex-col">
           <h3 className="text-xl font-bold text-dark mb-8">Performance by Subject</h3>
           <div className="flex-1 space-y-8">
              {data.subjectPerformance.map((subject, i) => (
                 <div key={i}>
                    <div className="flex justify-between text-sm font-bold text-dark mb-3">
                       <span>{subject.name}</span>
                       <span className="text-muted">{subject.accuracy}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                       <div 
                         className={`h-full rounded-full ${i === 0 ? 'bg-accent' : i === 1 ? 'bg-primary' : 'bg-green-400'}`}
                         style={{ width: `${subject.accuracy}%` }}
                       ></div>
                    </div>
                 </div>
              ))}
           </div>
           <button className="mt-10 w-full py-4 rounded-xl border border-gray-100 text-sm font-bold text-muted hover:bg-gray-50 transition-colors">
              View All Subjects
           </button>
        </div>
      </div>

      {/* Daily Activity Heatmap */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm overflow-hidden">
         <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-dark">Daily Activity</h3>
            <div className="flex items-center gap-2 text-xs font-bold text-muted uppercase tracking-wider">
               <span>Less</span>
               <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-sm bg-secondary"></div>
                  <div className="w-3 h-3 rounded-sm bg-primary/40"></div>
                  <div className="w-3 h-3 rounded-sm bg-primary/70"></div>
                  <div className="w-3 h-3 rounded-sm bg-primary"></div>
               </div>
               <span>More</span>
            </div>
         </div>
         <div className="overflow-x-auto pb-4">
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[800px]">
               {/* Simplified Heatmap Logic */}
               {Array.from({ length: 52 * 7 }).map((_, i) => {
                  const intensity = Math.random();
                  let bgColor = 'bg-secondary';
                  if (intensity > 0.8) bgColor = 'bg-primary';
                  else if (intensity > 0.6) bgColor = 'bg-primary/70';
                  else if (intensity > 0.4) bgColor = 'bg-primary/40';
                  
                  return <div key={i} className={`w-4 h-4 rounded-sm ${bgColor}`}></div>
               })}
            </div>
         </div>
         <p className="mt-6 text-xs italic text-muted font-medium">Activity heatmap showing study frequency over the last 6 months.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Study Buddy Insight */}
        <div className="bg-secondary/40 rounded-[2.5rem] p-10 border border-secondary/60 relative overflow-hidden">
           <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles size={18} />
           </div>
            <h3 className="text-xl font-bold text-dark mb-6">AI Study Buddy Insight</h3>
            <p className="text-lg text-gray-600 leading-relaxed font-medium mb-10 italic">
               "You tend to struggle with 'Recursive Algorithms' after 9 PM. We recommend moving this deck to your morning sessions for 25% better retention."
            </p>
            <div className="flex items-center gap-6">
               <button className="bg-accent text-white px-8 py-3 rounded-full font-bold shadow-lg hover:opacity-90 transition-all">
                  Apply Schedule
               </button>
               <button className="text-sm font-bold text-muted hover:text-dark">Learn More</button>
            </div>
         </div>

         {/* Next Up for Review */}
         <div className="bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-8">Next Up for Review</h3>
            <div className="space-y-4">
               {data.nextReviewDecks?.length > 0 ? data.nextReviewDecks.map((deck, i) => (
                  <Link 
                    key={deck._id} 
                    to={`/study/${deck._id}`}
                    className="flex items-center justify-between p-5 rounded-2xl border border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer group"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-muted group-hover:text-accent transition-colors">
                           <TrendingUp size={16} />
                        </div>
                        <div>
                           <div className="text-sm font-bold text-dark">{deck.title}</div>
                           <div className="text-xs font-medium text-muted">{deck.dueCount} cards • Due Today</div>
                        </div>
                     </div>
                     <ChevronRight size={18} className="text-gray-300 group-hover:text-dark transition-colors" />
                  </Link>
               )) : (
                  <div className="text-center py-10 text-muted font-medium border border-dashed border-gray-100 rounded-2xl">
                     No decks due for review. Take a break!
                  </div>
               )}
            </div>
         </div>
      </div>
    </div>
  );
};

function StatCard({ icon, label, value, subtext, trend, progress, extraIcon, iconBg }) {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center`}>
          {icon}
        </div>
        {trend && (
          <div className="bg-green-50 text-green-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            {trend}
          </div>
        )}
      </div>
      <div className="text-xs font-bold text-muted uppercase tracking-widest mb-1">{label}</div>
      <div className="flex items-center gap-2 mb-4">
         <span className="text-4xl font-bold text-dark tracking-tighter">{value}</span>
         {extraIcon && <span className="text-3xl">{extraIcon}</span>}
      </div>
      <p className="text-xs font-semibold text-muted tracking-tight">{subtext}</p>
      
      {progress !== undefined && (
        <div className="mt-6 h-1 w-full bg-gray-50 rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
