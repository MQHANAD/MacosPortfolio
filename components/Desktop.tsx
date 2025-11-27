import Menubar from "./Menubar";
import Dock from "./Dock";
import Window from "./Window";
import AppIcon from "./AppIcon";
import FinderApp from "./apps/Finder";
import { portfolioData } from "../data/portfolio";
import LiquidEther from "../components/wallpaper";
import {
  Globe,
} from "lucide-react";
import { Terminal, TypingAnimation, AnimatedSpan } from "./terminal";
import MailApp from "./apps/Mail";
import SnakeGame from "./apps/SnakeGame";

export default function Desktop() {

  return (
    <div className="h-screen bg-[#060010] w-screen overflow-hidden bg-cover bg-center relative select-none font-sans">
      <Menubar />
      <LiquidEther
        colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />

      {/* Desktop Icons Area */}
      <div className="absolute top-10 right-4 hidden md:flex flex-col gap-4 items-end p-4">
        <AppIcon
          id="finder"
          name="Finder"
          icon="https://upload.wikimedia.org/wikipedia/commons/c/c9/Finder_Icon_macOS_Big_Sur.png"
        />
        {/* Add more desktop icons if needed */}
      </div>

      {/* Windows */}
      <Window id="finder" title="Finder">
        <FinderApp />
      </Window>

      <Window id="safari" title="Safari - Projects">
        <div className="h-full flex flex-col bg-white">
          {/* Safari Toolbar */}
          <div className="bg-gray-100 border-b border-gray-200 p-2 flex items-center gap-4">
            <div className="flex gap-2 text-gray-400">
              {/* Using text for arrows to keep it simple */}
              <span className="cursor-not-allowed">{"<"}</span>
              <span className="cursor-not-allowed">{">"}</span>
            </div>
            <div className="flex-1 bg-white border border-gray-300 rounded px-3 py-1 text-sm text-center text-gray-700 flex items-center justify-center gap-1 shadow-sm">
              <span className="text-gray-400 text-xs">🔒</span>{" "}
              muhannad.site/projects
            </div>
            <div className="w-8"></div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioData.projects.map((project, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
                >
                  <div className="h-40 bg-gray-200 relative overflow-hidden group">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-1">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-3 flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded border border-gray-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-500 text-sm font-medium hover:underline mt-auto flex items-center gap-1"
                    >
                      View Project <Globe size={12} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Window>

      <Window id="terminal" title="Terminal - Skills">
        <Terminal className="w-full h-full bg-[#1e1e1e] border-none rounded-none">
          <TypingAnimation className="text-green-400">
            (base) Muhannad@Muhannads-MacBook % skills install
          </TypingAnimation>
          <AnimatedSpan delay={4500} className="text-cyan-300">
            {portfolioData.skills.map((skill) => (
              <span key={skill}>
                <AnimatedSpan className="text-green-500">
                  ✔ {skill}.
                </AnimatedSpan>
              </span>
            ))}

            <TypingAnimation className="text-green-400 mt-2">
              (base) Muhannad@Muhannads-MacBook %
            </TypingAnimation>
          </AnimatedSpan>

        </Terminal>
      </Window>

      <Window id="mail" title="Mail">
        <MailApp />
      </Window>

      <Window id="snake" title="Snake Game">
        <SnakeGame />
      </Window>

      <Dock />
    </div>
  );
}
