import React from "react";
import { useDesktop } from "../context/DesktopContext";
import Menubar from "./Menubar";
import Dock from "./Dock";
import Window from "./Window";
import AppIcon from "./AppIcon";
import FinderApp from "./apps/Finder";
import { portfolioData } from "../data/portfolio";
import LiquidEther from "../components/wallpaper";
import {
  Mail,
  Globe,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";

export default function Desktop() {
  const { windows } = useDesktop();

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
      <div className="absolute top-10 right-4 flex flex-col gap-4 items-end p-4">
        <AppIcon
          id="finder"
          name="Macintosh HD"
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
        <div className="h-full bg-[#1e1e1e] text-white p-4 font-mono text-sm overflow-auto">
          <div className="mb-2 text-green-400">
            ➜ ~ <span className="text-blue-400">neofetch</span>
          </div>
          <div className="flex flex-col md:flex-row gap-8 mt-4">
            {/* ASCII Art - Simplified */}
            <div className="hidden md:block text-yellow-400 whitespace-pre select-text"></div>
            <div className="flex-1">
              <div className="mb-4">
                <span className="text-green-400">muhannad</span>@
                <span className="text-green-400">macbook-pro</span>
                <div className="border-b border-white/20 my-1 w-full max-w-md"></div>
              </div>
              <div className="grid grid-cols-[100px_1fr] gap-y-1">
                <span className="text-green-400">OS</span>{" "}
                <span>macOS Big Sur 11.0</span>
                <span className="text-green-400">Host</span>{" "}
                <span>MacBook Pro (16-inch, 2021)</span>
                <span className="text-green-400">Kernel</span>{" "}
                <span>20.1.0</span>
                <span className="text-green-400">Uptime</span>{" "}
                <span>24 days, 10:42</span>
                <span className="text-green-400">Shell</span>{" "}
                <span>zsh 5.8</span>
                <span className="text-green-400">Resolution</span>{" "}
                <span>3072x1920</span>
              </div>

              <div className="mt-6 mb-2 text-green-400">
                ➜ ~ <span className="text-blue-400">ls ./skills</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {portfolioData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-cyan-300 hover:text-white cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 animate-pulse">
                ➜ ~{" "}
                <span className="w-2 h-4 bg-gray-500 inline-block align-middle"></span>
              </div>
            </div>
          </div>
        </div>
      </Window>

      <Window id="mail" title="Mail">
        <div className="h-full flex bg-white">
          {/* Sidebar */}
          <div className="w-48 bg-gray-100 border-r border-gray-200 hidden sm:flex flex-col">
            <div className="p-2 text-gray-500 font-semibold text-xs uppercase mt-2">
              Mailboxes
            </div>
            <div className="px-4 py-1 bg-blue-500 text-white text-sm rounded mx-2 flex justify-between">
              <span>Inbox</span>
              <span>1</span>
            </div>
            <div className="px-4 py-1 text-gray-700 text-sm mx-2 flex justify-between hover:bg-gray-200 rounded cursor-pointer">
              <span>Sent</span>
            </div>
            <div className="px-4 py-1 text-gray-700 text-sm mx-2 flex justify-between hover:bg-gray-200 rounded cursor-pointer">
              <span>Drafts</span>
            </div>
          </div>

          {/* Email List */}
          <div className="w-64 border-r border-gray-200 flex flex-col bg-white overflow-y-auto">
            <div className="p-3 border-b border-gray-100 bg-blue-50/50 cursor-pointer">
              <div className="flex justify-between mb-1">
                <span className="font-bold text-sm text-gray-900">
                  Muhannad
                </span>
                <span className="text-xs text-gray-400">Now</span>
              </div>
              <div className="text-xs font-medium text-gray-700 mb-1">
                Let's Connect!
              </div>
              <div className="text-xs text-gray-500 line-clamp-2">
                Hi there! I'm always open to discussing new projects...
              </div>
            </div>
          </div>

          {/* Email Content */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Let's Connect!
              </h2>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={portfolioData.personal.profileImage}
                  className="w-10 h-10 rounded-full object-cover"
                  alt="Avatar"
                />
                <div>
                  <div className="font-bold text-sm">Muhannad Alduraywish</div>
                  <div className="text-xs text-gray-500">
                    To: You &lt;visitor@portfolio.com&gt;
                  </div>
                </div>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-gray-700">
              <p>Hi there,</p>
              <p>
                Feel free to reach out to me for any questions or opportunities.
                I am always open to discussing new projects, creative ideas or
                opportunities to be part of your vision.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-gray-400" />
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {portfolioData.personal.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-gray-400" />
                  <a
                    href={`tel:${portfolioData.personal.phone}`}
                    className="text-blue-600 hover:underline"
                  >
                    {portfolioData.personal.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-gray-400" />
                  <span>{portfolioData.personal.location}</span>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <a
                  href={portfolioData.personal.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Github size={20} className="text-gray-700" />
                </a>
                <a
                  href={portfolioData.personal.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Linkedin size={20} className="text-gray-700" />
                </a>
                <a
                  href={portfolioData.personal.social.x}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                >
                  <Twitter size={20} className="text-gray-700" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Window>

      <Dock />
    </div>
  );
}
