import { motion } from "framer-motion";

// 背景装饰组件 - 星辰和植物线稿
const BackgroundDecoration = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* 米白色纹理背景 */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 30%, rgba(180, 170, 150, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(200, 180, 160, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(160, 150, 140, 0.1) 0%, transparent 70%)
          `,
        }}
      />
      
      {/* 手绘风星辰 */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          <svg
            width={4 + Math.random() * 4}
            height={4 + Math.random() * 4}
            viewBox="0 0 10 10"
            className="text-amber-400/50"
          >
            <path
              d="M5 0 L6 4 L10 5 L6 6 L5 10 L4 6 L0 5 L4 4 Z"
              fill="currentColor"
            />
          </svg>
        </motion.div>
      ))}
      
      {/* 中草药/植物线稿装饰 */}
      {[...Array(6)].map((_, i) => (
        <motion.svg
          key={`plant-${i}`}
          className="absolute text-stone-400/30"
          style={{
            left: `${10 + (i % 3) * 40}%`,
            top: i < 3 ? '5%' : '85%',
            width: 60 + Math.random() * 40,
            height: 60 + Math.random() * 40,
          }}
          viewBox="0 0 100 100"
          initial={{ opacity: 0.15, rotate: -10 + Math.random() * 20 }}
          animate={{ 
            opacity: [0.15, 0.3, 0.15],
            rotate: [-10 + Math.random() * 20, 10 + Math.random() * 10, -10 + Math.random() * 20]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* 简单植物线稿 */}
          <path
            d="M50 90 Q50 50 50 20"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          {/* 叶子 */}
          <path d="M50 60 Q30 50 25 40 Q35 45 50 55" fill="currentColor" opacity="0.5" />
          <path d="M50 50 Q70 40 75 30 Q65 35 50 45" fill="currentColor" opacity="0.5" />
          <path d="M50 35 Q35 25 30 15 Q40 22 50 30" fill="currentColor" opacity="0.5" />
          <path d="M50 40 Q65 30 70 20 Q60 28 50 35" fill="currentColor" opacity="0.5" />
        </motion.svg>
      ))}
      
      {/* 角落装饰 */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-amber-200/20 to-transparent rounded-br-full" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-stone-300/20 to-transparent rounded-tl-full" />
    </div>
  );
};

export default BackgroundDecoration;
