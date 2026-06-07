import React from "react";
import { motion } from "motion/react";
import { PdfPresentationViewer, PdfFullDocViewer } from "./components/PdfViewers";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink, 
  Code, 
  Briefcase, 
  User, 
  ChevronRight,
  Anchor,
  Compass,
  Ship,
  Wind,
  Languages,
  Users,
  Zap,
  Wrench,
  CloudRain,
  Upload,
  File,
  X,
  Trash2,
  Paperclip,
  Play,
  Film,
  BookOpen,
  Download,
  FileText,
  Plus
} from "lucide-react";

// --- Types ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string[];
}

interface Skill {
  name: string;
  icon: React.ReactNode;
  level: number; // 1-5
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "2026 南台灣旅遊企劃",
    description: "一份詳盡的清明連假旅遊企劃，涵蓋高雄、嘉義、台南三地的景點規劃、每日行程與三餐預算分配。",
    tags: ["企劃總覽", "行程規劃", "預算控管"],
    link: "#",
    image: "https://picsum.photos/seed/travel-plan/800/600"
  }
];

const EXPERIENCES: Experience[] = [
  {
    role: "自主學習與技術探索",
    company: "熱血開發者",
    period: "2023 - 至今",
    description: [
      "深入研究 React 與現代前端開發流程。",
      "開發多個個人專案，包括旅遊企劃工具與數據視覺化儀表板。",
      "積極參與開源社區討論，並持續學習 AI 應用整合。"
    ]
  },
  {
    role: "專案規劃與執行",
    company: "學術專題研究",
    period: "2021 - 2023",
    description: [
      "負責團隊專案的架構設計與進度管理。",
      "成功策劃並執行多場技術分享會，提升成員間的知識交流。",
      "優化團隊工作流程，將開發效率提升 20%。"
    ]
  }
];

const SKILLS: { category: string; items: Skill[] }[] = [
  {
    category: "航海專業",
    items: [
      { name: "航海學", icon: <Compass className="w-4 h-4" />, level: 5 },
      { name: "船舶操縱", icon: <Ship className="w-4 h-4" />, level: 4 },
      { name: "航海氣象", icon: <Wind className="w-4 h-4" />, level: 4 },
      { name: "海事法規", icon: <Anchor className="w-4 h-4" />, level: 4 }
    ]
  },
  {
    category: "核心能力",
    items: [
      { name: "英語能力", icon: <Languages className="w-4 h-4" />, level: 4 },
      { name: "團隊合作", icon: <Users className="w-4 h-4" />, level: 5 },
      { name: "危機處理", icon: <Zap className="w-4 h-4" />, level: 4 },
      { name: "設備維護", icon: <Wrench className="w-4 h-4" />, level: 3 }
    ]
  }
];

// --- Components ---

const SectionHeading = ({ children, icon: Icon, subtitle, className, onAddAction }: { children: React.ReactNode; icon: any; subtitle?: string; className?: string; onAddAction?: () => void }) => (
  <div className={`mb-12 flex items-end justify-between ${className || ''}`}>
    <div>
      <div className="flex items-center gap-2 mb-2 text-[#6B5E46] uppercase tracking-[0.2em] text-xs font-semibold">
        <Icon className="w-4 h-4" />
        <span>{subtitle}</span>
      </div>
      <h2 className="text-4xl md:text-5xl font-bold font-medium tracking-tight text-[#4A3F35]">
        {children}
      </h2>
    </div>
    {onAddAction && (
      <button onClick={onAddAction} className="w-10 h-10 rounded-full border border-[#D2C5AF] flex items-center justify-center text-[#4A3F35] hover:bg-[#4A3F35]/10 transition-colors">
        <Plus className="w-5 h-5" />
      </button>
    )}
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = React.useState<"home" | "upload">("home");
  const [files, setFiles] = React.useState<{ name: string; size: string; date: string }[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);
  const [activeVideo, setActiveVideo] = React.useState<"youtube" | "hailuo" | "local">("youtube");
  const [activePdf, setActivePdf] = React.useState<"manus" | "gamma" | "notebook" | "meals">("manus");
  
  const handleGenericAction = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      if ((e.target as HTMLInputElement).files?.length) {
        alert('作品已成功上傳與更新！');
      }
    };
    input.click();
  };

  const [profilePic, setProfilePic] = React.useState<string>(`${import.meta.env.BASE_URL}S125673498.jpg`);
  const profilePicInputRef = React.useRef<HTMLInputElement>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setProfilePic(url);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement> | React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    let uploadedFiles: FileList | null = null;
    if ('files' in e.target && e.target.files) {
      uploadedFiles = e.target.files;
    } else if ('dataTransfer' in e && e.dataTransfer.files) {
      uploadedFiles = e.dataTransfer.files;
    }

    if (uploadedFiles) {
      const newFiles = Array.from(uploadedFiles).map(f => ({
        name: f.name,
        size: (f.size / 1024).toFixed(1) + " KB",
        date: new Date().toLocaleDateString()
      }));
      setFiles(prev => [...newFiles, ...prev]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen selection:bg-[#4A3F35] selection:text-[#FAF4E5] bg-[#FAF4E5]">
      {/* Header / Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FAF4E5]/90 backdrop-blur-md border-b border-[#D2C5AF]">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button 
            onClick={() => setActiveTab("home")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-[#4A3F35] font-mono font-medium hover:opacity-70 transition-opacity"
          >
            ZHENYU.DEV
          </motion.button>
          <div className="flex items-center gap-4 md:gap-8">
            {[
              {id: "home", label: "個人網站"}, 
              {id: "upload", label: "AI 作業"}
            ].map((item, i) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`text-sm uppercase tracking-widest transition-all px-5 py-2.5 rounded-full font-bold ${activeTab === item.id ? 'bg-[#4A3F35] text-[#FAF4E5] shadow-lg scale-105' : 'text-[#6B5E46] hover:bg-[#4A3F35]/10 hover:text-[#4A3F35]'}`}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {activeTab === "home" ? (
          <>
            {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 border-b border-[#D2C5AF]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group cursor-pointer"
              onClick={() => profilePicInputRef.current?.click()}
            >
              <div className="absolute -inset-1 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img 
                src={profilePic} 
                alt="吳鎮瑜" 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-[#D2C5AF] object-cover relative"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 inset-y-0 m-auto w-32 h-32 md:w-48 md:h-48 rounded-full bg-[#4A3F35]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm z-10">
                <div className="flex flex-col items-center justify-center text-[#4A3F35]/90">
                  <Upload className="w-5 h-5 mb-1 opacity-80" />
                  <span className="text-xs tracking-wider">更換頭像</span>
                </div>
              </div>
              <input 
                type="file" 
                ref={profilePicInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </motion.div>
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <span className="bg-[#4A3F35]/10 text-[#4A3F35]/70 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-[#4A3F35]/10">
                  個人網站開發中
                </span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-medium tracking-tighter text-[#4A3F35] mb-6"
              >
                吳鎮瑜的個人網站
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-[#6B5E46] max-w-xl font-medium leading-relaxed"
              >
                摩羯座 ｜ A型 ｜ 2006-01-13 <br />
                就讀於國立高雄科技大學 (NKUST)
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-6 mt-8"
              >
                <button onClick={() => {
                  setActiveTab("upload");
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }} className="flex items-center gap-2 text-[#4A3F35] border-2 border-[#4A3F35] bg-transparent backdrop-blur-sm px-6 py-3 rounded-full hover:bg-[#4A3F35] hover:text-[#FAF4E5] transition-all group font-bold shadow-sm hover:shadow-md">
                  查看 AI 作業 <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex items-center gap-4">
                  <a href="mailto:a110182124@nkust.edu.tw" className="text-[#6B5E46] hover:text-[#4A3F35] transition-colors"><Mail className="w-5 h-5" /></a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* About & Experience */}
      <section id="about" className="py-24 px-6 border-b border-[#D2C5AF]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <SectionHeading icon={User} subtitle="背景故事">關於我</SectionHeading>
            <div className="space-y-6 text-[#6B5E46] font-medium leading-relaxed text-lg">
              <p>
                我叫吳鎮瑜，目前就讀於航運技術系航海科，對海事與航運領域深感興趣，期許未來能投入海上工作。
              </p>
              <p>
                求學期間修習航海學、船舶操縱及氣象等專業課程，培養扎實的理論基礎與實務能力，並透過實習與分組合作累積經驗。我的個性沉穩負責、做事細心，面對問題能冷靜思考並積極解決，也重視團隊合作與紀律。
              </p>
              <p>
                未來希望持續精進專業技能與英語能力，逐步朝成為優秀航海人員邁進，為航運產業貢獻所長。
              </p>
              <div className="pt-4 grid grid-cols-2 gap-8 text-sm">
                <div>
                  <h4 className="text-[#4A3F35] font-mono uppercase tracking-widest mb-2 border-b border-[#D2C5AF] pb-2">個人背景</h4>
                  <p>航運技術系航海科</p>
                  <p className="text-[#4A3F35]/40 mt-1">摩羯座 | A型</p>
                </div>
                <div>
                  <h4 className="text-[#4A3F35] font-mono uppercase tracking-widest mb-2 border-b border-[#D2C5AF] pb-2">專業興趣</h4>
                  <p>航海學, 船舶操縱, 氣象</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading icon={Briefcase} subtitle="時光軸" onAddAction={handleGenericAction}>職涯經驗</SectionHeading>
            <div className="space-y-12">
              {EXPERIENCES.map((exp, i) => (
                <motion.div 
                  key={exp.company}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-[#D2C5AF] hover:border-[#4A3F35]/40 transition-colors group"
                >
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-[#8B7E66] group-hover:bg-[#4A3F35] transition-colors" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-[#4A3F35] font-medium">{exp.role}</h3>
                      <p className="text-sm text-[#4A3F35]/50">{exp.company}</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B5E46]">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((item, j) => (
                      <li key={j} className="text-[#6B5E46] text-sm font-medium leading-relaxed flex gap-2">
                        <span className="text-[#4A3F35]/20">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 border-b border-[#D2C5AF] bg-[#EFE8D6]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={Code} subtitle="技術規格" onAddAction={handleGenericAction}>專業技術能力</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {SKILLS.map((category, i) => (
              <div key={category.category} className="space-y-8">
                <h3 className="text-[#4A3F35] font-mono uppercase tracking-widest text-sm border-b border-[#D2C5AF] pb-4">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {category.items.map((skill, j) => (
                    <motion.div 
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: (i * 4 + j) * 0.05 }}
                      className="p-4 rounded-xl border border-[#D2C5AF] bg-[#4A3F35]/5 hover:border-[#4A3F35]/20 transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-[#4A3F35]/10 text-[#4A3F35] group-hover:bg-[#4A3F35] group-hover:text-[#FAF4E5] transition-all">
                          {skill.icon}
                        </div>
                        <span className="text-sm font-medium text-[#4A3F35]">{skill.name}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div 
                              key={i} 
                              className={`h-1.5 w-4 rounded-full ${i <= skill.level ? 'bg-[#4A3F35]' : 'bg-[#4A3F35]/10'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-mono text-[#4A3F35]/40">{skill.level}/5</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#D2C5AF] px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-[#6B5E46] font-mono">
            © 2026 ZHENYU.DEV — 傾心打造
          </div>
          <div className="flex items-center gap-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B5E46]">系統運行正常</span>
          </div>
        </div>
      </footer>
          </>
        ) : (
          /* Upload Page */
          <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            <SectionHeading icon={Upload} subtitle="AI ASSIGNMENTS" onAddAction={handleGenericAction}>AI 作業展示</SectionHeading>
            
            <div className="max-w-4xl mx-auto space-y-16">
              {/* Video Section */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D2C5AF] pb-4 gap-4">
                  <h3 className="text-xl font-medium text-[#4A3F35] flex items-center gap-3">
                    <Film className="w-5 h-5 text-[#6B5E46]" />
                    <span>AI 成果影片區</span>
                  </h3>
                  <div className="flex bg-[#4A3F35]/5 rounded-full p-1 border border-[#4A3F35]/10 shrink-0 overflow-x-auto max-w-full">
                    <button 
                      onClick={() => setActiveVideo("youtube")}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 shrink-0 ${activeVideo === "youtube" ? "bg-[#4A3F35] text-[#FAF4E5] font-semibold" : "text-[#6B5E46] hover:text-[#4A3F35]"}`}
                    >
                      連假規劃 (YouTube)
                    </button>
                    <button 
                      onClick={() => setActiveVideo("hailuo")}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 shrink-0 ${activeVideo === "hailuo" ? "bg-[#4A3F35] text-[#FAF4E5] font-semibold" : "text-[#6B5E46] hover:text-[#4A3F35]"}`}
                    >
                      掃墓爬山 (AI 生成)
                    </button>
                    <button 
                      onClick={() => setActiveVideo("local")}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 shrink-0 ${activeVideo === "local" ? "bg-[#4A3F35] text-[#FAF4E5] font-semibold" : "text-[#6B5E46] hover:text-[#4A3F35]"}`}
                    >
                      航海模擬 (本機)
                    </button>
                  </div>
                </div>

                <motion.div 
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative group rounded-3xl overflow-hidden border border-[#D2C5AF] bg-[#FAF4E5] aspect-video flex items-center justify-center shadow-2xl"
                >
                  {activeVideo === "youtube" && (
                    <iframe 
                      src="https://www.youtube.com/embed/93ViSf3tazQ"
                      title="AI 連假作業成果影片"
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                  {activeVideo === "hailuo" && (
                    <video 
                      controls 
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    >
                      <source src={`${import.meta.env.BASE_URL}Hailuo_Video_掃墓祭祖日掃墓完去爬山_505785777208287235.mp4`} type="video/mp4" />
                      您的瀏覽器不支援影片播放。
                    </video>
                  )}
                  {activeVideo === "local" && (
                    <video 
                      controls 
                      autoPlay
                      muted
                      loop
                      className="w-full h-full object-cover"
                    >
                      <source src={`${import.meta.env.BASE_URL}ai_video.mp4`} type="video/mp4" />
                      您的瀏覽器不支援影片播放。
                    </video>
                  )}
                </motion.div>
                <div className="text-xs text-[#6B5E46] text-center space-y-1">
                  <p className="italic">
                    {activeVideo === "youtube" && "* 提示：此為清明連假完整 AI 規劃說明教學 YouTube 實拍影片。"}
                    {activeVideo === "hailuo" && "* 提示：此為 Hailuo AI 一鍵生成『掃墓祭祖日，掃墓完去爬山』主題之精緻寫實畫面。"}
                    {activeVideo === "local" && "* 提示：此為本機航海操船動態模擬實景，用於海事操船成果展示。"}
                  </p>
                </div>
              </div>

              {/* 3D Toy model Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-[#4A3F35] flex items-center gap-3 border-b border-[#D2C5AF] pb-4">
                  <Play className="w-5 h-5 text-[#6B5E46]" />
                  <span>3D 公仔展示 (Tripo3D)</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 p-6 rounded-2xl border border-[#D2C5AF] bg-[#4A3F35]/5 flex flex-col justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium text-[#4A3F35] mb-2">3D 生成實境平台 (Tripo3D)</p>
                      <p className="text-xs text-[#6B5E46] leading-relaxed font-medium mb-4">
                        此為採用 Tripo3D AI 所生成的海洋巡航特色公仔模型。提供全景 360 度任意旋轉、縮放與光影效果。您可以點擊下方連結跳轉至官方工作坊進行全螢幕沈浸式渲染互動。
                      </p>
                    </div>
                    <a 
                      href="https://studio.tripo3d.ai/3d-model/486745a5-53eb-433a-b4ba-87e9e656769e?invite_code=9ZN8H0" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-[#4A3F35] hover:text-blue-400 transition-colors underline decoration-border underline-offset-4 font-mono text-xs truncate"
                    >
                      前往互動模型工作坊 →
                    </a>
                  </motion.div>

                  <div className="rounded-2xl border border-[#D2C5AF] bg-[#EFE8D6] flex items-center justify-center p-6 text-center">
                    <div>
                      <div className="w-12 h-12 rounded-full bg-[#4A3F35]/10 flex items-center justify-center mx-auto mb-3 text-[#4A3F35]">
                        <Anchor className="w-6 h-6 animate-pulse" />
                      </div>
                      <span className="text-xs font-mono text-[#6B5E46] uppercase block">航海公仔</span>
                      <span className="text-xs text-[#4A3F35]/50 block mt-1">互動模型網頁已發佈</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Presentation Slide deck Section */}
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#D2C5AF] pb-4 gap-4">
                  <h3 className="text-xl font-medium text-[#4A3F35] flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-[#6B5E46]" />
                    <span>作業簡報區 (AI 企劃與行程)</span>
                  </h3>
                  <div className="flex bg-[#4A3F35]/5 rounded-full p-1 border border-[#4A3F35]/10 shrink-0 overflow-x-auto max-w-full">
                    <button 
                      onClick={() => setActivePdf("manus")}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 shrink-0 ${activePdf === "manus" ? "bg-[#4A3F35] text-[#FAF4E5] font-semibold" : "text-[#6B5E46] hover:text-[#4A3F35]"}`}
                    >
                      Manus AI 企劃
                    </button>
                    <button 
                      onClick={() => setActivePdf("gamma")}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 shrink-0 ${activePdf === "gamma" ? "bg-[#4A3F35] text-[#FAF4E5] font-semibold" : "text-[#6B5E46] hover:text-[#4A3F35]"}`}
                    >
                      Gamma AI 簡報
                    </button>
                    <button 
                      onClick={() => setActivePdf("notebook")}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 shrink-0 ${activePdf === "notebook" ? "bg-[#4A3F35] text-[#FAF4E5] font-semibold" : "text-[#6B5E46] hover:text-[#4A3F35]"}`}
                    >
                      NotebookLM 脈絡
                    </button>
                    <button 
                      onClick={() => setActivePdf("meals")}
                      className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300 shrink-0 ${activePdf === "meals" ? "bg-[#4A3F35] text-[#FAF4E5] font-semibold" : "text-[#6B5E46] hover:text-[#4A3F35]"}`}
                    >
                      每日行程規劃
                    </button>
                  </div>
                </div>

                {activePdf !== "meals" ? (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
                    <div className="md:col-span-2 space-y-4">
                      <motion.div 
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#D2C5AF] bg-[#4A3F35]/60 shadow-xl"
                      >
                        {activePdf === "manus" && (
                          <PdfPresentationViewer url={`${import.meta.env.BASE_URL}manus連假簡報.pdf`} />
                        )}
                        {activePdf === "gamma" && (
                          <PdfPresentationViewer url={`${import.meta.env.BASE_URL}gamma連假簡報 (2).pdf`} />
                        )}
                        {activePdf === "notebook" && (
                          <PdfPresentationViewer url={`${import.meta.env.BASE_URL}notebookLM連假簡報.pdf`} />
                        )}
                      </motion.div>
                    </div>

                    <div className="flex flex-col justify-between border border-[#D2C5AF] bg-[#EFE8D6] rounded-2xl p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono bg-[#4A3F35]/10 text-[#4A3F35]/80 px-2 py-0.5 rounded tracking-wider uppercase border border-[#4A3F35]/5">
                            {activePdf === "manus" && "Manus AI 生成"}
                            {activePdf === "gamma" && "Gamma AI 視覺"}
                            {activePdf === "notebook" && "NotebookLM 分析"}
                          </span>
                        </div>
                        <h4 className="text-[#4A3F35] text-base font-semibold">
                          {activePdf === "manus" && "Manus AI 智慧連假規劃"}
                          {activePdf === "gamma" && "Gamma 視覺藝術連假簡報"}
                          {activePdf === "notebook" && "NotebookLM 資訊脈絡簡報"}
                        </h4>
                        <p className="text-xs text-[#6B5E46] leading-relaxed font-medium">
                          {activePdf === "manus" && "本份簡報由先進 Manus AI 自主規劃生成，深度排比南台灣之海陸名勝。運用結構化表格排理每日行程，體現高效率與高精確度之 AI 行程美學。"}
                          {activePdf === "gamma" && "使用 Gamma 視覺生成平台設計，風格簡約現代、色調和諧。聚焦於嘉義景點、阿里山之行與阿里山森鐵的人文魅力，是令人心曠神怡的視覺名片。"}
                          {activePdf === "notebook" && "運用 Google NotebookLM 深度理解多源行程材料，提煉出行程的精簡核心與最優決策路線。具有極高的專業報告結構與閱讀舒適感。"}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-[#4A3F35]/5 mt-6 space-y-3">
                        <a 
                          href={
                            activePdf === "manus" ? `${import.meta.env.BASE_URL}manus連假簡報.pdf` :
                            activePdf === "gamma" ? `${import.meta.env.BASE_URL}gamma連假簡報 (2).pdf` :
                            `${import.meta.env.BASE_URL}notebookLM連假簡報.pdf`
                          } 
                          target="_blank" 
                          rel="noreferrer"
                          className="w-full justify-center flex items-center gap-1 bg-[#4A3F35]/5 text-[#4A3F35] py-2 rounded-xl text-xs hover:bg-[#4A3F35]/10 hover:text-[#4A3F35] border border-[#4A3F35]/10 transition-colors font-mono"
                        >
                          下載簡報檔案 <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full rounded-2xl overflow-hidden border border-[#D2C5AF] bg-[#EFE8D6] shadow-xl"
                  >
                    <div className="p-6 border-b border-[#D2C5AF] text-center">
                      <span className="text-[10px] font-mono bg-[#4A3F35]/10 text-[#4A3F35]/80 px-2 py-0.5 rounded tracking-wider uppercase border border-[#4A3F35]/5 mb-3 inline-block">
                        作者精細撰寫
                      </span>
                      <h4 className="text-[#4A3F35] text-xl font-medium mb-2">
                        旅程每日精細預算調度
                      </h4>
                      <p className="text-sm text-[#6B5E46] leading-relaxed font-medium max-w-2xl mx-auto">
                        由作者親手研發之四天三夜每日實地行程與極限三餐分攤表。全盤涵蓋高速、森鐵與地方歷史老店，整合實用、便利與高性價比的三重維度。
                      </p>
                    </div>
                    <PdfFullDocViewer url={`${import.meta.env.BASE_URL}連假計劃書.pdf`} />
                  </motion.div>
                )}
              </div>


            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
