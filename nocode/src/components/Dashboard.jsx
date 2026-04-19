
import { motion } from "framer-motion";
import { Activity, Footprints, Sparkles } from "lucide-react";

// 数据面板组件
const Dashboard = ({ sleepData, sleepHistory }) => {
  // 计算气血盈亏百分比
  const calculateEnergyLevel = () => {
    if (!sleepData) return 0;
    const totalHours = sleepData.duration?.totalMinutes / 60 || 0;
    // 以8小时为100%
    const percentage = Math.min((totalHours / 8) * 100, 100);
    return Math.round(percentage);
  };

  const energyLevel = calculateEnergyLevel();

  // 获取进度条颜色
  const getProgressColor = (level) => {
    if (level < 40) return "from-rose-500/60 to-rose-400/40";
    if (level < 70) return "from-amber-500/60 to-amber-400/40";
    return "from-emerald-500/60 to-emerald-400/40";
  };

  // 生成最近7天的数据（如果没有历史数据则生成模拟数据）
  const generateWeekData = () => {
    if (sleepHistory && sleepHistory.length > 0) {
      // 取最近7天
      return sleepHistory.slice(-7).map((record) => ({
        ...record,
        hasData: true,
      }));
    }
    
    // 生成空数据
    return Array(7).fill(null).map((_, i) => ({
      day: i,
      hasData: false,
      state: "empty",
    }));
  };

  const weekData = generateWeekData();
  const weekDays = ["一", "二", "三", "四", "五", "六", "日"];

  // 根据睡眠时长确定状态
  const getDayState = (hours) => {
    if (!hours || hours < 6) return { type: "exhausted", icon: "•", color: "text-stone-600" };
    if (hours < 7) return { type: "recovering", icon: "◦", color: "text-amber-600/60" };
    return { type: "good", icon: "✦", color: "text-emerald-500/70" };
  };

  return (
    <motion.div
      className="w-full max-w-sm mx-auto space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* 气血盈亏条 */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-stone-300/50 shadow-lg shadow-stone-200/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-rose-500/80" />
            <span className="text-stone-600 text-sm tracking-wider">气血盈亏</span>
          </div>
          <span className="text-stone-700 text-lg font-light">{energyLevel}%</span>
        </div>
        
        {/* 进度条 */}
        <div className="relative h-3 bg-stone-200/70 rounded-full overflow-hidden">
          <motion.div
            className={`absolute inset-y-0 left-0 rounded-full bg-gradient-to-r ${getProgressColor(energyLevel)}`}
            initial={{ width: 0 }}
            animate={{ width: `${energyLevel}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          {/* 纹理效果 */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 5px)`
          }} />
        </div>
        
        {/* 刻度标记 */}
        <div className="flex justify-between mt-2 px-1">
          <span className="text-xs text-stone-400">亏</span>
          <span className="text-xs text-stone-400">平</span>
          <span className="text-xs text-stone-400">盈</span>
        </div>
      </div>

      {/* 归藏历 */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl p-5 border border-stone-300/50 shadow-lg shadow-stone-200/30">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Footprints className="w-4 h-4 text-amber-600/80" />
            <span className="text-stone-600 text-sm tracking-wider">归藏历 · 近七日</span>
          </div>
          <Sparkles className="w-3 h-3 text-amber-500/70" />
        </div>
        
        {/* 七日记录 */}
        <div className="flex justify-between items-center">
          {weekData.map((day, index) => {
            const dayLabel = weekDays[index];
            const dayState = day.hasData 
              ? getDayState(day.duration?.totalMinutes / 60)
              : { type: "empty", icon: "·", color: "text-stone-300" };
            
            return (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* 状态标记 */}
                <motion.div
                  className={`w-10 h-10 rounded-full bg-stone-100/80 border border-stone-300/30 flex items-center justify-center ${dayState.color} text-lg`}
                  whileHover={{ scale: 1.1 }}
                  animate={dayState.type === "good" ? {
                    scale: [1, 1.1, 1],
                    opacity: [0.7, 1, 0.7]
                  } : {}}
                  transition={dayState.type === "good" ? {
                    duration: 2,
                    repeat: Infinity
                  } : {}}
                >
                  {dayState.icon}
                </motion.div>
                {/* 星期标签 */}
                <span className="text-xs text-stone-500">周{dayLabel}</span>
              </motion.div>
            );
          })}
        </div>
        
        {/* 图例说明 */}
        <div className="mt-4 pt-3 border-t border-stone-300/30 flex justify-center space-x-6 text-xs text-stone-500">
          <span className="flex items-center space-x-1">
            <span className="text-stone-400">•</span>
            <span>不足</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="text-amber-600/60">◦</span>
            <span>修复</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="text-emerald-500/70">✦</span>
            <span>充盈</span>
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

