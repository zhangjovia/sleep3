
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import PetAvatar from "../components/PetAvatar";
import SleepInput from "../components/SleepInput";
import Dashboard from "../components/Dashboard";
import BackgroundDecoration from "../components/BackgroundDecoration";

const Index = () => {
  // 睡眠数据状态
  const [sleepData, setSleepData] = useState({
    bedTime: "23:00",
    wakeTime: "07:00",
    duration: { hours: 8, minutes: 0, totalMinutes: 480 },
  });
  
  // 睡眠历史记录
  const [sleepHistory, setSleepHistory] = useState([]);
  
  // 宠伴状态
  const [petState, setPetState] = useState("restoring");

  // 从 LocalStorage 加载数据
  useEffect(() => {
    const savedData = localStorage.getItem("guicang_sleep_data");
    const savedHistory = localStorage.getItem("guicang_sleep_history");
    
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setSleepData(parsed);
      } catch (e) {
        console.error("Failed to parse sleep data:", e);
      }
    }
    
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setSleepHistory(parsed);
      } catch (e) {
        console.error("Failed to parse sleep history:", e);
      }
    }
  }, []);

  // 计算睡眠时长
  const calculateDuration = (bedTime, wakeTime) => {
    const [bedHour, bedMin] = bedTime.split(":").map(Number);
    const [wakeHour, wakeMin] = wakeTime.split(":").map(Number);
    
    let bedMinutes = bedHour * 60 + bedMin;
    let wakeMinutes = wakeHour * 60 + wakeMin;
    
    if (wakeMinutes < bedMinutes) {
      wakeMinutes += 24 * 60;
    }
    
    const durationMinutes = wakeMinutes - bedMinutes;
    const hours = Math.floor(durationMinutes / 60);
    const minutes = durationMinutes % 60;
    
    return { hours, minutes, totalMinutes: durationMinutes };
  };

  // 处理睡眠数据变化
  const handleSleepDataChange = (newData) => {
    const duration = calculateDuration(newData.bedTime, newData.wakeTime);
    const updatedData = {
      ...newData,
      duration,
    };
    
    setSleepData(updatedData);
    localStorage.setItem("guicang_sleep_data", JSON.stringify(updatedData));
    
    // 确定宠伴状态
    const totalHours = duration.totalMinutes / 60;
    if (totalHours < 6) {
      setPetState("exhausted");
    } else if (totalHours >= 6 && totalHours < 7) {
      setPetState("restoring");
    } else {
      setPetState("energetic");
    }
  };

  // 保存今日记录到历史
  const saveTodayRecord = () => {
    const today = new Date().toISOString().split("T")[0];
    const newRecord = {
      date: today,
      bedTime: sleepData.bedTime,
      wakeTime: sleepData.wakeTime,
      duration: sleepData.duration,
      state: petState,
    };
    
    const updatedHistory = [...sleepHistory.filter(h => h.date !== today), newRecord];
    // 只保留最近30天
    const trimmedHistory = updatedHistory.slice(-30);
    
    setSleepHistory(trimmedHistory);
    localStorage.setItem("guicang_sleep_history", JSON.stringify(trimmedHistory));
  };

  // 初始化计算
  useEffect(() => {
    handleSleepDataChange({
      bedTime: sleepData.bedTime,
      wakeTime: sleepData.wakeTime,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E8] text-stone-700 relative overflow-x-hidden">
      {/* 背景装饰 */}
      <BackgroundDecoration />
      
      {/* 主内容区域 */}
      <div className="relative z-10 max-w-md mx-auto px-6 py-8 min-h-screen flex flex-col">
        {/* 头部标题 */}
        <motion.header
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-600/70" />
            <h1 className="text-2xl font-light tracking-widest text-stone-800">
              归藏小筑
            </h1>
            <Sparkles className="w-5 h-5 text-amber-600/70" />
          </div>
          <p className="text-stone-500 text-sm tracking-wider font-light">
            Nurture & Rest
          </p>
          <p className="text-stone-600 text-xs mt-2 tracking-wide">
            阴平阳秘，精神乃治
          </p>
        </motion.header>

        {/* 核心可视化区域 - 宠伴化身 */}
        <section className="flex-1 flex items-center justify-center py-6">
          <PetAvatar state={petState} />
        </section>

        {/* 输入模块 */}
        <section className="py-4">
          <SleepInput 
            onSleepDataChange={handleSleepDataChange}
            initialData={sleepData}
          />
        </section>

        {/* 数据面板 */}
        <section className="py-4">
          <Dashboard 
            sleepData={sleepData}
            sleepHistory={sleepHistory}
          />
        </section>

        {/* 保存按钮 */}
        <motion.section
          className="py-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={saveTodayRecord}
            className="w-full bg-gradient-to-r from-amber-600/80 to-orange-600/70 hover:from-amber-600/90 hover:to-orange-600/80 text-white py-4 rounded-2xl border border-amber-700/30 transition-all duration-300 tracking-widest text-sm font-light active:scale-95 shadow-lg shadow-amber-900/10"
          >
            记录今日睡眠
          </button>
        </motion.section>

        {/* 底部说明 */}
        <footer className="text-center py-4 text-stone-500 text-xs tracking-wider">
          <p>顺应天时 · 养护气血 · 安身立命</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;

