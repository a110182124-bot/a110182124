import React from "react";
import { motion } from "motion/react";
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
  Play
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

const SectionHeading = ({ children, icon: Icon, subtitle, className }: { children: React.ReactNode; icon: any; subtitle?: string; className?: string }) => (
  <div className={`mb-12 ${className}`}>
    <div className="flex items-center gap-2 mb-2 text-muted uppercase tracking-[0.2em] text-xs font-semibold">
      <Icon className="w-4 h-4" />
      <span>{subtitle}</span>
    </div>
    <h2 className="text-3xl md:text-4xl font-light tracking-tight text-white">
      {children}
    </h2>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = React.useState<"home" | "upload">("home");
  const [files, setFiles] = React.useState<{ name: string; size: string; date: string }[]>([]);
  const [isDragging, setIsDragging] = React.useState(false);

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
    <div className="min-h-screen selection:bg-white selection:text-black bg-black">
      {/* Header / Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.button 
            onClick={() => setActiveTab("home")}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-white font-mono font-medium hover:opacity-70 transition-opacity"
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
                className={`text-xs uppercase tracking-widest transition-colors ${activeTab === item.id ? 'text-white' : 'text-muted hover:text-white'}`}
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
      <header className="pt-32 pb-20 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <img 
                src="template_preview.png" 
                alt="吳鎮瑜" 
                className="w-32 h-32 md:w-48 md:h-48 rounded-full border border-border object-cover relative"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-4"
              >
                <span className="bg-white/10 text-white/70 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest border border-white/10">
                  個人網站開發中
                </span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-6"
              >
                吳鎮瑜的個人網站
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg text-muted max-w-xl font-light leading-relaxed"
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
                <a href="#work" className="flex items-center gap-2 text-white border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all group">
                  查看作品 <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                <div className="flex items-center gap-4">
                  <a href="mailto:A110182124@nkust.edu.tw" className="text-muted hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
                  <a href="#" className="text-muted hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </header>

      {/* Projects Section */}
      <section id="work" className="py-24 px-6 border-b border-border bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={Briefcase} subtitle="作品集">連假規劃</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                id={`project-${i}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border mb-4 bg-zinc-900">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                    <a href={project.link} className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                      查看專案 <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-white mb-2 group-hover:text-white/80 transition-colors">{project.title}</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest font-mono text-white/40 border border-white/10 px-2 py-0.5 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About & Experience */}
      <section id="about" className="py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <SectionHeading icon={User} subtitle="背景故事">關於我</SectionHeading>
            <div className="space-y-6 text-muted font-light leading-relaxed text-lg">
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
                  <h4 className="text-white font-mono uppercase tracking-widest mb-2 border-b border-border pb-2">個人背景</h4>
                  <p>航運技術系航海科</p>
                  <p className="text-white/40 mt-1">摩羯座 | A型</p>
                </div>
                <div>
                  <h4 className="text-white font-mono uppercase tracking-widest mb-2 border-b border-border pb-2">專業興趣</h4>
                  <p>航海學, 船舶操縱, 氣象</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading icon={Briefcase} subtitle="時光軸">職涯經驗</SectionHeading>
            <div className="space-y-12">
              {EXPERIENCES.map((exp, i) => (
                <motion.div 
                  key={exp.company}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-8 border-l border-border hover:border-white/40 transition-colors group"
                >
                  <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-muted group-hover:bg-white transition-colors" />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-white font-medium">{exp.role}</h3>
                      <p className="text-sm text-white/50">{exp.company}</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-muted">{exp.period}</span>
                  </div>
                  <ul className="space-y-2">
                    {exp.description.map((item, j) => (
                      <li key={j} className="text-muted text-sm font-light leading-relaxed flex gap-2">
                        <span className="text-white/20">•</span>
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
      <section id="skills" className="py-24 px-6 border-b border-border bg-[#0d0d0d]">
        <div className="max-w-6xl mx-auto">
          <SectionHeading icon={Code} subtitle="技術規格">專業技術能力</SectionHeading>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {SKILLS.map((category, i) => (
              <div key={category.category} className="space-y-8">
                <h3 className="text-white font-mono uppercase tracking-widest text-sm border-b border-border pb-4">
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
                      className="p-4 rounded-xl border border-border bg-white/5 hover:border-white/20 transition-all group"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 rounded-lg bg-white/10 text-white group-hover:bg-white group-hover:text-black transition-all">
                          {skill.icon}
                        </div>
                        <span className="text-sm font-medium text-white">{skill.name}</span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <div 
                              key={i} 
                              className={`h-1.5 w-4 rounded-full ${i <= skill.level ? 'bg-white' : 'bg-white/10'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs font-mono text-white/40">{skill.level}/5</span>
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
      <footer className="py-12 border-t border-border px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-sm text-muted font-mono">
            © 2026 ZHENYU.DEV — 傾心打造
          </div>
          <div className="flex items-center gap-6">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-muted">系統運行正常</span>
          </div>
        </div>
      </footer>
          </>
        ) : (
          /* Upload Page */
          <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
            <SectionHeading icon={Upload} subtitle="AI ASSIGNMENTS">AI 連假影片</SectionHeading>
            
            <div className="max-w-4xl mx-auto">
              <div>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative group rounded-3xl overflow-hidden border border-border bg-black aspect-video flex items-center justify-center"
                >
                  <video 
                    controls 
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover"
                  >
                    <source src="ai_video.mp4" type="video/mp4" />
                    您的瀏覽器不支援影片播放。
                  </video>
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4">
                      <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                    <p className="text-white text-sm font-medium">觀看 AI 生成影片</p>
                  </div>
                </motion.div>

                <div className="mt-12 space-y-4">
                  <h4 className="text-white font-mono text-xs uppercase tracking-widest border-b border-border pb-4 flex items-center justify-between">
                    <span>3D 公仔展示</span>
                    <span className="text-muted font-light">模型預覽</span>
                  </h4>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-2xl border border-border bg-white/5 break-all"
                  >
                    <p className="text-sm text-muted mb-2">3D 模型網址：</p>
                    <a 
                      href="https://studio.tripo3d.ai/3d-model/486745a5-53eb-433a-b4ba-87e9e656769e?invite_code=9ZN8H0" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-400 transition-colors underline decoration-border underline-offset-4"
                    >
                      https://studio.tripo3d.ai/3d-model/486745a5-53eb-433a-b4ba-87e9e656769e?invite_code=9ZN8H0
                    </a>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
