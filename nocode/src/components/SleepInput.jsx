
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Clock } from "lucide-react";

// 睡眠输入组件
const SleepInput = ({ onSleepDataChange, initialData }) => {
  const [bedTime, setBedTime] = useState(initialData?.bedTime || "23:00");
  const [wakeTime, setWakeTime] = useState(initialData?.wakeTime || "07:00");

  // 当时间改变时通知父组件
  useEffect(() => {
    onSleepDataChange({ bedTime, wakeTime });
  }, [bedTime, wakeTime, onSleepDataChange]);

  // 生成时间选项（每30分钟一个选项）
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute of [0, 30]) {
        const timeString = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        options.push(timeString);
      }
    }
    return options;
  };

  const timeOptions = generateTimeOptions();

  // 计算睡眠时长
  const calculateSleepDuration = () => {
    const [bedHour, bedMin] = bedTime.split(":").map(Number);
    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number);
    
    let bedMinutes = bedHour * 60 + bedMin;
    let wakeMinutes = wakeHour * 60 + wakeMin;
    
    // 如果起床时间小于入睡时间，说明跨天了
    if (wakeMinutes < bedMinutes) {
      wakeMinutes += 24 * 60;
    }
    
    const durationMinutes = wakeMinutes - bedMinutes;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    return { hours, minutes, totalMinutes: durationMinutes };
  };

  const sleepDuration = calculateSleepDuration();

  // 获取睡眠时长对应的描述
  const getSleepQualityLabel = () => {
    const totalHours = sleepDuration.totalMinutes / 60;
    if (totalHours < 6) return { text: "尚需休养", color: "text-rose-300" };
    if (totalHours < 7) return { text: "渐入佳境", color: "text-amber-300" };
    if (totalHours < 9) return { text: "气血调和", color: "text-emerald-300" };
    return { text: "养神充足", color: "text-sky-300" };
  };

  const qualityLabel = getSleepQualityLabel();

  return (
    <motion.div
      className="w-full max-w-sm mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 border border-stone-300/50 shadow-xl shadow-stone-200/50">
        {/* 标题 */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          <Clock className="w-4 h-4 text-amber-600/80" />
          <span className="text-stone-600 text-sm tracking-widest">记录睡眠</span>
        </div>

        {/* 时间选择区域 */}
        <div className="space-y-5">
          {/* 入睡时间 */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-stone-500 text-xs ml-1">
              <Moon className="w-3 h-3" />
              <span>昨晚入睡</span>
            </div>
            <div className="relative">
              <select
                value={bedTime}
                onChange={(e) => setBedTime(e.target.value)}
                className="w-full appearance-none bg-stone-100/80 hover:bg-stone-100 transition-colors rounded-2xl px-5 py-4 text-stone-700 text-lg font-light tracking-wide border border-stone-300/50 focus:border-amber-500/50 focus:outline-none cursor-pointer"
              >
                {timeOptions.map((time) => (
                  <option key={`bed-${time}`} value={time} className="bg-stone-50">
                    {time}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 分隔装饰 */}
          <div className="flex items-center justify-center py-2">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-400/50 to-transparent" />
            <div className="mx-3 text-stone-400 text-xs">~</div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-400/50 to-transparent" />
          </div>

          {/* 起床时间 */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-stone-500 text-xs ml-1">
              <Sun className="w-3 h-3" />
              <span>今晨醒来</span>
            </div>
            <div className="relative">
              <select
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full appearance-none bg-stone-100/80 hover:bg-stone-100 transition-colors rounded-2xl px-5 py-4 text-stone-700 text-lg font-light tracking-wide border border-stone-300/50 focus:border-amber-500/50 focus:outline-none cursor-pointer"
              >
                {timeOptions.map((time) => (
                  <option key={`wake-${time}`} value={time} className="bg-stone-50">
                    {time}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* 睡眠时长显示 */}
        <motion.div
          className="mt-6 pt-5 border-t border-stone-300/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <span className="text-stone-500 text-xs tracking-wider">睡眠时长</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-light text-stone-800">
                {sleepDuration.hours}
              </span>
              <span className="text-stone-500 text-sm">小时</span>
              <span className="text-2xl font-light text-stone-800 ml-1">
                {sleepDuration.minutes}
              </span>
              <span className="text-stone-500 text-sm">分钟</span>
            </div>
          </div>
          
          {/* 质量标签 */}
          <div className="mt-3 flex justify-end">
            <span className={`text-xs bg-stone-100/80 px-3 py-1 rounded-full border border-stone-300/30 ${qualityLabel.color}`}>
              {qualityLabel.text}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SleepInput;

