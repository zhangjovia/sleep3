
import { motion } from "framer-motion";

// 手绘风宠伴化身组件
const PetAvatar = ({ state }) => {
  // 状态A: 透支状态 - 毛发不蓬松，精神不振
  const renderExhaustedState = () => (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 暗淡的背景氛围 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-b from-stone-800/30 to-stone-900/50 blur-2xl"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* 蜷缩的小动物 - 手绘风SVG */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-48 h-48 mx-auto"
        initial={{ y: 0 }}
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 身体 - 软塌塌的 */}
        <motion.ellipse
          cx="100"
          cy="130"
          rx="55"
          ry="40"
          fill="#8B7355"
          stroke="#5D4E37"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ filter: "url(#pencil)" }}
        />
        
        {/* 头部 */}
        <motion.circle
          cx="100"
          cy="85"
          r="35"
          fill="#A0826D"
          stroke="#5D4E37"
          strokeWidth="2"
        />
        
        {/* 耷拉的耳朵 */}
        <motion.ellipse
          cx="65"
          cy="85"
          rx="12"
          ry="20"
          fill="#8B7355"
          stroke="#5D4E37"
          strokeWidth="2"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.ellipse
          cx="135"
          cy="85"
          rx="12"
          ry="20"
          fill="#8B7355"
          stroke="#5D4E37"
          strokeWidth="2"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* 闭着的眼睛 - 疲惫 */}
        <path d="M85 80 Q90 85 95 80" stroke="#5D4E37" strokeWidth="2" fill="none" />
        <path d="M105 80 Q110 85 115 80" stroke="#5D4E37" strokeWidth="2" fill="none" />
        
        {/* 无精打采的尾巴 */}
        <motion.path
          d="M150 130 Q170 140 165 150"
          stroke="#8B7355"
          strokeWidth="8"
          strokeLinecap="round"
          fill="none"
          animate={{ d: ["M150 130 Q170 140 165 150", "M150 130 Q168 142 163 152", "M150 130 Q170 140 165 150"] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* 滤镜效果 */}
        <defs>
          <filter id="pencil">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="2" />
          </filter>
        </defs>
      </motion.svg>
    </motion.div>
  );

  // 状态B: 蓄养状态 - 被被子包裹，呼吸起伏
  const renderRestoringState = () => (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 温暖的光晕氛围 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-900/20 via-orange-900/10 to-stone-900/30 blur-3xl"
        animate={{ 
          scale: [1, 1.05, 1],
          opacity: [0.4, 0.6, 0.4] 
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* 微光粒子 */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-amber-200/40"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, -30, -10],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
          }}
        />
      ))}
      
      {/* 呼吸起伏的被子包裹小动物 */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-56 h-56 mx-auto"
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 被子 - 厚实的包裹感 */}
        <motion.path
          d="M40 140 Q100 180 160 140 Q170 100 160 80 Q100 60 40 80 Q30 100 40 140"
          fill="#D4A574"
          stroke="#B8956A"
          strokeWidth="3"
          strokeLinecap="round"
          animate={{ d: [
            "M40 140 Q100 180 160 140 Q170 100 160 80 Q100 60 40 80 Q30 100 40 140",
            "M38 142 Q100 185 162 142 Q172 100 162 78 Q100 55 38 78 Q28 100 38 142",
            "M40 140 Q100 180 160 140 Q170 100 160 80 Q100 60 40 80 Q30 100 40 140"
          ]}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* 被子纹理线条 - 手绘感 */}
        <motion.path
          d="M60 100 Q100 120 140 100"
          stroke="#B8956A"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <motion.path
          d="M55 120 Q100 140 145 120"
          stroke="#B8956A"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        
        {/* 露出来的小脸 */}
        <motion.ellipse
          cx="100"
          cy="95"
          rx="25"
          ry="22"
          fill="#E8D4C4"
          stroke="#C4A88C"
          strokeWidth="2"
        />
        
        {/* 满足的闭眼睛 */}
        <motion.path
          d="M90 92 Q95 96 100 92"
          stroke="#8B7355"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <motion.path
          d="M100 92 Q105 96 110 92"
          stroke="#8B7355"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* 微笑 */}
        <motion.path
          d="M95 105 Q100 110 105 105"
          stroke="#8B7355"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* 腮红 */}
        <motion.ellipse cx="85" cy="100" rx="4" ry="3" fill="#E8A5A5" opacity="0.6" />
        <motion.ellipse cx="115" cy="100" rx="4" ry="3" fill="#E8A5A5" opacity="0.6" />
        
        {/* 被子褶皱 */}
        <path d="M45 110 Q50 130 45 150" stroke="#B8956A" strokeWidth="1.5" fill="none" opacity="0.5" />
        <path d="M155 110 Q150 130 155 150" stroke="#B8956A" strokeWidth="1.5" fill="none" opacity="0.5" />
      </motion.svg>
      
      {/* 漂浮的气血光点 */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-gradient-to-br from-amber-300/50 to-orange-400/30"
            style={{
              left: Math.cos((i * 120 * Math.PI) / 180) * 80,
              top: Math.sin((i * 120 * Math.PI) / 180) * 80,
            }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );

  // 状态C: 充盈状态 - 精神饱满，生机盎然
  const renderEnergeticState = () => (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 明亮温暖的光晕 */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-700/30 via-yellow-800/20 to-stone-900/20 blur-3xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5] 
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* 生机勃勃的花草装饰 */}
      {[...Array(6)].map((_, i) => (
        <motion.svg
          key={i}
          className="absolute w-8 h-8"
          style={{
            left: `${10 + (i % 3) * 35}%`,
            top: i < 3 ? '5%' : '75%',
          }}
          viewBox="0 0 30 30"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
        >
          <motion.path
            d="M15 25 Q15 15 15 5"
            stroke="#7D9B76"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
          <motion.path
            d="M15 15 Q10 10 8 12 M15 12 Q20 8 22 10 M15 8 Q12 3 10 5"
            stroke="#A8C686"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          <motion.circle cx="15" cy="5" r="3" fill="#E8B4B8" />
        </motion.svg>
      ))}
      
      {/* 活力满满的小动物 */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-52 h-52 mx-auto"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* 蓬松的身体 */}
        <motion.ellipse
          cx="100"
          cy="125"
          rx="50"
          ry="45"
          fill="#C4A484"
          stroke="#A0826D"
          strokeWidth="2"
        />
        
        {/* 蓬松的毛发纹理 */}
        {[...Array(8)].map((_, i) => (
          <motion.path
            key={i}
            d={`M${60 + i * 10} 95 Q${65 + i * 10} 85 ${70 + i * 10} 95`}
            stroke="#A0826D"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            opacity="0.6"
          />
        ))}
        
        {/* 头部 */}
        <motion.circle
          cx="100"
          cy="80"
          r="38"
          fill="#D4B896"
          stroke="#A0826D"
          strokeWidth="2"
        />
        
        {/* 蓬松的耳朵 */}
        <motion.ellipse
          cx="60"
          cy="70"
          rx="18"
          ry="25"
          fill="#C4A484"
          stroke="#A0826D"
          strokeWidth="2"
          animate={{ rotate: [-3, 3, -3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.ellipse
          cx="140"
          cy="70"
          rx="18"
          ry="25"
          fill="#C4A484"
          stroke="#A0826D"
          strokeWidth="2"
          animate={{ rotate: [3, -3, 3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        
        {/* 明亮有神的眼睛 */}
        <motion.ellipse cx="85" cy="75" rx="6" ry="8" fill="#5D4E37" />
        <motion.ellipse cx="115" cy="75" rx="6" ry="8" fill="#5D4E37" />
        <motion.circle cx="87" cy="73" r="2" fill="white" />
        <motion.circle cx="117" cy="73" r="2" fill="white" />
        
        {/* 开心的嘴巴 */}
        <motion.path
          d="M90 90 Q100 100 110 90"
          stroke="#5D4E37"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* 开心腮红 */}
        <motion.ellipse cx="75" cy="85" rx="5" ry="4" fill="#E8A5A5" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite" />
        </motion.ellipse>
        <motion.ellipse cx="125" cy="85" rx="5" ry="4" fill="#E8A5A5" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.9;0.7" dur="2s" repeatCount="indefinite" />
        </motion.ellipse>
        
        {/* 摇摆的尾巴 */}
        <motion.path
          d="M145 120 Q170 110 175 90"
          stroke="#C4A484"
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          animate={{ d: [
            "M145 120 Q170 110 175 90",
            "M145 120 Q175 100 180 85",
            "M145 120 Q165 115 170 95",
            "M145 120 Q170 110 175 90"
          ]}}
          transition={{ duration: 0.8, repeat: Infinity }}
        />
      </motion.svg>
      
      {/* 开心的星星装饰 */}
      {[...Array(4)].map((_, i) => (
        <motion.svg
          key={i}
          className="absolute w-4 h-4"
          style={{
            right: `${15 + i * 20}%`,
            top: `${20 + (i % 2) * 50}%`,
          }}
          viewBox="0 0 20 20"
          animate={{ 
            scale: [0.8, 1.2, 0.8],
            opacity: [0.4, 1, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
        >
          <path
            d="M10 2 L12 8 L18 8 L13 12 L15 18 L10 14 L5 18 L7 12 L2 8 L8 8 Z"
            fill="#F4D03F"
            opacity="0.8"
          />
        </motion.svg>
      ))}
    </motion.div>
  );

  // 根据状态渲染对应组件
  const renderPet = () => {
    switch (state) {
      case "exhausted":
        return renderExhaustedState();
      case "restoring":
        return renderRestoringState();
      case "energetic":
        return renderEnergeticState();
      default:
        return renderRestoringState();
    }
  };

  // 中医谏言
  const wisdomText = {
    exhausted: "《黄帝内经》云：'故阴虚则生内热。' 熬夜暗耗阴血，切勿以透支为常。",
    restoring: "《类经》言：'阳入于阴则寐。' 虚火初降，气血正归藏休养。此时困倦，乃身体正本清源之象，宜顺应安睡。",
    energetic: "《素问》曰：'阴平阳秘，精神乃治。' 气血充盈，五脏安和，此乃养生之正道。",
  };

  const stateLabels = {
    exhausted: "透支状态",
    restoring: "蓄养状态",
    energetic: "充盈状态",
  };

  const stateColors = {
    exhausted: "text-stone-500",
    restoring: "text-amber-600",
    energetic: "text-emerald-600",
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* 状态标签 */}
      <motion.div
        className={`text-sm font-medium tracking-widest ${stateColors[state]}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {stateLabels[state]}
      </motion.div>
      
      {/* 宠伴化身 */}
      <div className="relative">
        {renderPet()}
      </div>
      
      {/* 中医谏言卡片 */}
      <motion.div
        className="max-w-xs mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-stone-300/50 shadow-lg shadow-stone-200/30">
          <p className="text-stone-600 text-sm leading-relaxed text-center font-light tracking-wide">
            {wisdomText[state]}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default PetAvatar;

